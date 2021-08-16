import { updateQueue } from './component'
export function addEvent (dom, eventType, handler) {
  // debugger
  let store // 这个对象上存放着事件处理函数
  if (dom.store) {
    store = dom.store
  } else {
    dom.store = {}
    store = dom.store
  }
  store[eventType] = handler//store.onclick = handler
  console.log('创建store', store)
  if (!document[eventType]) {
    console.log('给document绑定事件')
    // 多个元素有相同事件时,只给document绑一次
    // document.addEventListener(`eventType`,dispatchEvent)
    document[eventType] = dispatchEvent
  }
}
function dispatchEvent (event) {
  let { target, type } = event
  let eventType = `on${type}`//onclick
  updateQueue.isBatchingUpdate = true//切换为合成事件模式
  let syntheticEvent = createSyntheticEvent(event)//创建合成事件对象
  // 模拟事件冒泡的过程,从target一层一层向上找相同的事件
  while (target) {
    let { store } = target//上面在dom中存的
    let handler = store && store[eventType]//事件处理函数上面在dom中存的
    console.log('执行handler',handler)
    handler && handler.call(target, syntheticEvent)
    target = target.parentNode
  }
  updateQueue.isBatchingUpdate = false
  updateQueue.batchUpdate()
}
function createSyntheticEvent (event) {
  // 此处可以做一些浏览器适配,处理事件名
  let syntheticEvent = {}
  for (let key in event) {
    syntheticEvent[key] = event[key]
  }
  return syntheticEvent
}
