import Component from './component'
function createElement (type, config, children) {
  let ref
  let key
  if (config) {
    ref = config.ref
    key = config.key
    delete config.ref
    delete config.key
  }
  let props = { ...config }
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2)
  } else {
    props.children = children
  }
  return {
    type,
    props,
    ref,
    key
  }
}
function createRef () {
  return { current: null }
}
const React = {
  createElement,
  Component,
  createRef
}
export default React
