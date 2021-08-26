import REACT_TEXT from './types'
import { addEvent } from './event'
function render (vdom, container) {
  let newDom = createDom(vdom)// 获取真实dom
  container.appendChild(newDom)
  if (newDom.componentDidMount) newDom.componentDidMount()
}
function createDom (vdom) {
  // if (typeof vdom === 'number' || typeof vdom === 'string') {
  //   return document.createTextNode(vdom)
  // }
  let { type, props, ref } = vdom
  let dom
  // 创建对应type的dom活textNode
  if (type === REACT_TEXT || typeof vdom == 'string') {
    dom = document.createTextNode(props.content)
  } else
    if (typeof type === 'function') {
      if (type.isReactComponent) {
        return mountClassComponent(vdom)
      } else {
        return mountFunctionComponent(vdom)
      }
    } else {
      dom = document.createElement(type)
    }
  // 给创建的dom添加属性
  if (props) {
    updateProps(dom, {}, props)
    // 处理children
    if (typeof props.children === 'object' && props.children.type) {
      // 只有一个子元素
      render(props.children, dom)
    } else if (Array.isArray(props.children)) {
      // 多个子元素
      reconcileChildren(props.children, dom)
    } else if (typeof props.children === 'string' || typeof props.children === 'number') {
      render(props.children, dom)
    }
  }
  vdom.dom = dom //vdom和真实dom建立联系
  if (ref) ref.current = dom
  return dom
}
function mountFunctionComponent (vdom) {
  let { type, props } = vdom
  let renderDom = type(props)
  vdom.oldRenderVdom = renderDom//将函数组件vdom与渲染的vdom建立联系
  return createDom(renderDom)
}
function mountClassComponent (vdom) {
  // debugger
  let { type, props, ref } = vdom
  let classInstance = new type(props)
  if (type.contextType) {
    // 挂载时取context
    classInstance.context = type.contextType.Provider_value
  }
  if (classInstance.componentWillMount) classInstance.componentWillMount()
  if (ref) ref.current = classInstance
  vdom.classInstance = classInstance
  let renderDom = classInstance.render()
  classInstance.oldRenderVdom = vdom.oldRenderVdom = renderDom// 将类组件vdom与渲染的vdom建立联系,并将实例与vdom建立联系
  let dom = createDom(renderDom)
  if (classInstance.componentDidMount) {
    // 如果有componentDidMount钩子,将它挂到真实dom上
    dom.componentDidMount = classInstance.componentDidMount.bind(classInstance)
  }
  return dom
}
function reconcileChildren (children, parentDom) {
  for (let i = 0; i < children.length; i++) {
    render(children[i], parentDom)
  }
}
function updateProps (dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') {
      continue
    } else if (key === 'style') {
      for (let attr in newProps[key]) {
        dom.style[attr] = newProps[key][attr]
      }
    } else if (key.startsWith('on')) {
      // dom[key.toLocaleLowerCase()] = newProps[key]
      addEvent(dom, key.toLocaleLowerCase(), newProps[key])
    } else {
      dom[key] = newProps[key]
    }
  }

}
export function findDom (vdom) {
  let { type } = vdom
  let dom
  if (typeof type === 'function') {
    dom = findDom(vdom.oldRenderVdom)
  } else {
    dom = vdom.dom
  }
  return dom
}
const ReactDOM = {
  render
}
// 简易版本,替换dom
// export function compareTwoVdom (parentDom, oldVdom, newVdom) {
//   // 查到旧的真实dom,创建新的真实dom,替换
//   let oldDom = findDom(oldVdom)
//   let newDom = createDom(newVdom)
//   parentDom.replaceChild(newDom, oldDom)
// }
// dom-diff版比较dom
export function compareTwoVdom (parentDom, oldVdom, newVdom, nextDom) {
  if (!oldVdom && !newVdom) {
    // 新老vDOM都是null,就忽略渲染
  } else if (oldVdom && !newVdom) {
    // 销毁dom时
    let currentDom = findDom(oldVdom)
    currentDom.parentNode.removeChild(currentDom)
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillMount) {
      // 如果是类组件并且有卸载钩子,则执行
      oldVdom.classInstance.componentWillMount()
    }
  } else if (!oldVdom && newVdom) {
    // dom新创建时
    let newDom = createDom(newVdom)
    if (nextDom) {
      parentDom.insertBefore(newDom, nextDom)
    } else {
      parentDom.appendChild(newDom)//后面没有dom,则放置在父dom的尾部
    }
    if (newDom.componentDidMount) newDom.componentDidMount()
  } else if (oldVdom && newVdom && (oldVdom.type !== newVdom.type)) {
    // 新老dom都有值,但是换了type,则销毁重建
    let oldDom = findDom(oldVdom)
    let newDom = createDom(newVdom)
    oldDom.parentNode.replaceChild(newDom, oldDom)
    if (newDom.componentDidMount) newDom.componentDidMount()
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillMount) {
      // 如果是类组件并且有卸载钩子,则执行
      oldVdom.classInstance.componentWillMount()
    }
  } else {
    // 新老dom相同,直接复用
    updateElement(oldVdom, newVdom)
  }
}
function updateElement (oldVdom, newVdom) {
  if (typeof oldVdom.type === 'string') {
    // 如果是原生dom,直接复用老的dom属性,再更新属性
    let currentDom = newVdom.dom = findDom(oldVdom)
    updateProps(currentDom, oldVdom.props, newVdom.props)
    // 更新好自身dom属性后,更新子节点
    updateChildren(currentDom, oldVdom.props.children, newVdom.props.children)
  } else if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {
    // 如果是文本更新
    let currentDom = newVdom.dom = findDom(oldVdom)
    if (oldVdom.props.content !== newVdom.props.content) {
      currentDom.textContent = newVdom.props.content
    }
  } else if (typeof oldVdom.type === 'function') {
    // 如果是更新组建
    if (oldVdom.type.isReactComponent) {
      // 类组件
      updateClassComponent(oldVdom, newVdom)
    } else {
      // 函数组件
      updateFunctionComponent(oldVdom, newVdom)
    }
  }
}
function updateClassComponent (oldVdom, newVdom) {
  // 直接去触发类组件实例中的更新方法emitUpdate
  let classInstance = newVdom.classInstance = oldVdom.classInstance
  newVdom.oldRenderVdom = oldVdom.oldRenderVdom
  if (classInstance.componentWillReceiveProps) classInstance.componentWillReceiveProps()
  classInstance.updater.emitUpdate(newVdom.props)
}
function updateFunctionComponent (oldVdom, newVdom) {
  let parentDom = findDom(oldVdom).parentNode
  let { type, props } = newVdom
  let renderVdom = type(props)
  newVdom.oldRenderVdom = renderVdom
  compareTwoVdom(parentDom, oldVdom.oldRenderVdom, renderVdom)
}
function updateChildren (parentDom, oldChildren, newChildren) {
  // 将两个children都变成数组,方便比较
  oldChildren = Array.isArray(oldChildren) ? oldChildren : [oldChildren]
  newChildren = Array.isArray(newChildren) ? newChildren : [newChildren]
  let maxLength = Math.max(oldChildren.length, newChildren.length)
  for (var i = 0; i < maxLength; i++) {
    // 查找插入位置
    let nextVNode = oldChildren.find((item, index) => index > i && item && findDom(item))
    let nextDom = nextVNode && findDom(nextVNode)
    compareTwoVdom(parentDom, oldChildren[i], newChildren[i], nextDom)
  }
}

let hookState = [] // 所有hook中的state
let hookIndex = 0 // hook的索引
let shcedUpdate // 调度更新方法,更新时清空index,并调compareTwoVdom
export function useState (initialState) {
  hookState[hookIndex] = hookState[hookIndex] || initialState
  let currentIndex = hookIndex//取index存在闭包中
  function setState (newState) {
    // 赋值并调度更新方法
    hookState[currentIndex] = newState
    shcedUpdate()
  }
  return [hookState[hookIndex++], setState]
}
export function useReducer (reducer, initialState) {
  hookState[hookIndex] = hookState[hookIndex] || initialState
  let currentIndex = hookIndex//取index存在闭包中
  function dispatch (action) {
    // 赋值并调度更新方法
    hookState[currentIndex] = reducer(hookState[hookIndex], action)
    shcedUpdate()
  }
  return [hookState[hookIndex++], dispatch]
}

export default ReactDOM
