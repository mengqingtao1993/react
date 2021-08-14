// import REACT_TEXT from './types'
function render (vdom, container) {
  let newDom = createDom(vdom)// 获取真实dom
  container.appendChild(newDom)
}
function createDom (vdom) {
  console.log(vdom)
  if (typeof vdom === 'number' || typeof vdom === 'string') {
    return document.createTextNode(vdom)
  }
  let { type, props } = vdom
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
  // vdom.dom = dom
  return dom
}
function mountFunctionComponent (vdom) {
  let { type, props } = vdom
  let renderDom = type(props)
  return createDom(renderDom)
}
function mountClassComponent (vdom) {
  let { type, props } = vdom
  let renderDom = new type(props)
  return createDom(renderDom.render())
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
      dom[key.toLocaleLowerCase()] = newProps[key]
    } else {
      dom[key] = newProps[key]
    }
  }

}
const ReactDOM = {
  render
}
export default ReactDOM