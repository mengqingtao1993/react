// import wrapToVdom from './utils'
import Component from './component'
function createElement (type, config, children) {
  let props = { ...config }
  if (arguments.length > 3) {
    // props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom)
    props.children = Array.prototype.slice.call(arguments, 2)
  } else {
    // props.children = wrapToVdom(children)
    props.children = children
  }
  return {
    type,
    props
  }
}
const React = {
  createElement,
  Component
}
export default React
