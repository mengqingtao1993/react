import Component from './component'
import wrapToVdom from './utils'
function createElement (type, config, children) {
  let ref
  let key
  if (config) {
    ref = config.ref
    key = config.key
    // delete config.ref
    delete config.key
  }
  let props = { ...config }
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom)
    // props.children = Array.prototype.slice.call(arguments, 2)
  } else {
    props.children = wrapToVdom(children)
    // props.children = children
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
function forwardRef (functionComponent) {
  return class extends Component {
    render () {
      return functionComponent(this.props, this.props.ref)
    }
  }
}
const React = {
  createElement,
  Component,
  createRef,
  forwardRef
}
export default React
