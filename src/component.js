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
  emitUpdate () {
    // 此处会加判断,如果是异步就先不更新,如果是同步就立即调用
    this.updateComponent() // 更新组件
  }
  updateComponent () {
    if (this.penddingState.length > 0) {
      shouldUpdate(this.classInstance, this.getState())//传入组件实例和新的状态
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
function shouldUpdate (classInstance,newState) {
  // 真正去修改实例状态
  classInstance.state = newState
  // 然后调用实例的updateComponent方法进行更新
  classInstance.forceUpdate()
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
  forceUpdate(){
    console.log('更新')
  }
}