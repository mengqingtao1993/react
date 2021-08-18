import { findDom, compareTwoVdom } from './react-dom'
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance//保存component实例
    this.penddingState = []//保存需要更新的队列
    this.callbacks = [] // 保存回调函数队列
  }
  addState (partialState, callback) {
    this.penddingState.push(partialState)
    if (typeof callback === 'function') {
      this.callbacks.push(callback)
    }
    this.emitUpdate()// 触发更新
  }
  emitUpdate (nextProps) {
    this.nextProps = nextProps
    // 如果是批量更新模式,则将更新函数装入updates
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updaters.push(this)
    } else {
      this.updateComponent() // 更新组件
    }
  }
  updateComponent () {
    let { nextProps } = this
    if (this.penddingState.length > 0) {
      shouldUpdate(this.classInstance, nextProps, this.getState())//传入组件实例和新的状态
    }
  }

  getState () {
    let { classInstance, penddingState } = this
    let { state } = classInstance// 获取老状态
    // 合并执行setState
    penddingState.forEach(newState => {
      if (typeof newState === 'function') {
        newState = newState()
      }
      state = { ...state, ...newState }
    })
    return state
  }
}
function shouldUpdate (classInstance, nextProps, nextState) {
  let willUpdate = true // 默认更新视图
  if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, nextState)) {
    // 如果有这个钩子,并且返回false,则不更新视图
    willUpdate = false
  }
  if (willUpdate && classInstance.componentWillUpdate) {
    // 如果需要更新,并且有componentWillUpdate钩子,则执行这个钩子
    classInstance.componentWillUpdate()
  }
  // 无论是否更新视图,都要将数据更新了
  // 真正去修改实例状态
  classInstance.state = nextState
  if (nextProps) classInstance.props = nextProps
  if (willUpdate) {
    // 然后调用实例的updateComponent方法进行更新
    classInstance.forceUpdate()
  }
}

export default class Component {
  static isReactComponent = true// 类组件标识
  constructor(props) {
    this.props = props
    this.state = {}
    this.updater = new Updater(this)
  }
  setState (partialState, callback) {
    this.updater.addState(partialState, callback)
  }
  forceUpdate () {
    // debugger
    let oldRenderVdom = this.oldRenderVdom //创建dom元素时,将vdom挂载到实例上
    let oldDom = findDom(oldRenderVdom) // 找到vdom对应的真实dom
    let newRenderVdom = this.render() //类组件中实例方法,此时vdom已经更新,返回最新的vdom
    compareTwoVdom(oldDom.parentNode, oldRenderVdom, newRenderVdom)//对比dom差异
    this.oldRenderVdom = newRenderVdom//更新oldVdom
    if (this.componentDidUpdate) {
      this.componentDidUpdate(this.props, this.state)
    }
  }
}
export let updateQueue = {
  isBatchingUpdate: false,// 是否开始批量更新
  updaters: [],// 批量更新队列
  batchUpdate () {
    for (let updater of updateQueue.updaters) {
      //updater是Updater类的实例
      updater.updateComponent()
    }
    updateQueue.isBatchingUpdate = false
    updateQueue.updaters.length = 0
  }
}
