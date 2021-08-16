// import REACT_TEXT from './types'
import { addEvent } from './event'
function render (vdom, container) {
  let newDom = createDom(vdom)// 获取真实dom
  container.appendChild(newDom)
}
function createDom (vdom) {
  if (typeof vdom === 'number' || typeof vdom === 'string') {
    return document.createTextNode(vdom)
  }
  let { type, props, ref } = vdom
  let dom
  // 创建对应type的dom活textNode
  // if (type === REACT_TEXT || typeof vdom == 'string') {
  //   dom = document.createTextNode(props.content)
  // } else 
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
  let { type, props } = vdom
  let classInstance = new type(props)
  let renderDom = classInstance.render()
  classInstance.oldRenderVdom = vdom.oldRenderVdom = renderDom// 将类组件vdom与渲染的vdom建立联系,并将实例与vdom建立联系
  return createDom(renderDom)
}
function reconcileChildren (children, parentDom) {
  for (let i = 0; i < children.length; i++) {
    render(children[i], parentDom)
  }
}
function updateProps (dom, oldProps, newProps) {
  console.log("newProps", newProps)
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
export function compareTwoVdom (parentDom, oldVdom, newVdom) {
  // 查到旧的真实dom,创建新的真实dom,替换
  let oldDom = findDom(oldVdom)
  let newDom = createDom(newVdom)
  parentDom.replaceChild(newDom, oldDom)
}
export default ReactDOM