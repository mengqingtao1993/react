import REACT_TEXT from './types'
// 将普通类型的children包装成vdom
export default function wrapToVdom (ele) {
  if (typeof ele === 'string' || typeof ele === 'number') {
    return { type: REACT_TEXT, props: { content: ele } }
  } else {
    return ele
  }
}

