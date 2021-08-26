import React from 'react'
import ReactDOM from 'react-dom'
/**
 * 
 * @param {state} props 
 */
// class Clock extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { date: new Date() }
//   }
//   tick () {
//     this.setState({ date: new Date() })
//   }
//   componentDidMount () {
//     this.timeId = setInterval(() => {
//       this.tick()
//     }, 1000)
//   }
//   componentWillUnmount () {
//     clearInterval(this.timeId)
//   }
//   render () {
//     return <div>{this.props.a}现在时间{this.state.date.toLocaleTimeString()}</div>
//   }
// }
/**
 * 
 * @param {条件渲染} props 
 */
// function Login (props) {
//   return <p>请登录</p>
// }
// function Logout (props) {
//   return <p>退出</p>
// }
// function Log (props) {
//   let isLogin = props.isLogin
//   if (!isLogin) {
//     return <Login></Login>
//   } else {
//     return <Logout></Logout>
//   }
// }

// function LogoutBtn (props) {
//   return <button onClick={props.onClick}>Logout</button>
// }
// function LoginBtn (props) {
//   return <button onClick={props.onClick}>Login</button>
// }
// class LoginControl extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { isLogin: false }
//     this.LogoutFn = this.LogoutFn.bind(this)
//     this.LoginFn = this.LoginFn.bind(this)
//   }

//   LoginFn () {
//     this.setState({ isLogin: true })
//   }
//   LogoutFn () {
//     this.setState({ isLogin: false })
//   }

//   render () {
//     let button
//     if (this.state.isLogin) {
//       button = <LogoutBtn onClick={this.LogoutFn}></LogoutBtn>
//     }else{
//       button = <LoginBtn onClick={this.LoginFn}></LoginBtn>
//     }
//     return (<><Log isLogin={this.state.isLogin}></Log> {button}</>)
//   }
// }
// function Ao () {
//   // return React.createElement('h1', null, '123')
//   return <h1>123<span className="text-muted">www</span></h1>
// }
// console.log(<LoginControl />)
// console.log(<Ao />)
// console.log(<h1>123</h1>)
// let abc = React.createElement('div', { className: 'aaa', style: { color: 'red', fontSize: '14px' } }, '123', '2344')
// console.log(abc)


/**
 * setState实现
 */
// class Abc extends React.Component {
//   constructor(props) {
//     super(props)
//     this.props = props
//     this.state = { num: 1 }
//     this.clickSpan = this.clickSpan.bind(this)
//     this.clickRoot = this.clickRoot.bind(this)
//   }
//   clickSpan () {
//     this.setState({ num: this.state.num + 1 })
//     console.log(this.state.num)
//     this.setState({ num: this.state.num + 1 })
//     console.log(this.state.num)
//     this.setState({ num: this.state.num + 1 })
//     console.log(this.state.num)
//     this.setState({ num: this.state.num + 1 })
//     console.log(this.state.num)
//     setTimeout(() => {
//       this.setState({ num: this.state.num + 1 })
//       console.log(this.state.num)
//       this.setState({ num: this.state.num + 1 })
//       console.log(this.state.num)
//       this.setState({ num: this.state.num + 1 })
//       console.log(this.state.num)
//       this.setState({ num: this.state.num + 1 })
//       console.log(this.state.num)
//     })
//   }
//   clickRoot(){
//     console.log('clickRoot')
//   }
//   render () {
//     return <h1 onClick={this.clickRoot}>num<span className="text-muted">{this.state.num}</span><div onClick={this.clickSpan}>+</div></h1>
//   }
// // }
// class RefClassComponent extends React.Component {
//   constructor(props) {
//     super(props)
//     this.A = React.createRef()
//     this.B = React.createRef()
//     this.C = React.createRef()
//   }
//   add = () => {
//     this.C.current.value = parseFloat(this.A.current.value) + parseFloat(this.B.current.value)
//   }
//   render () {
//     return (
//       <>
//         <input ref={this.A} />
//         <input ref={this.B} />
//         <span onClick={this.add}>+</span>
//         <input ref={this.C} />
//       </>
//     )
//   }
// }
// class Son extends React.Component {
//   constructor(props) {
//     super(props)
//     this.son = React.createRef()
//   }
//   sonClick = () => {
//     console.log('sonClick', this.son.current.innerText = '111')
//   }
//   render () {
//     return <span onclick={this.sonClick} ref={this.son}>son</span>
//   }
// }

// class Fa extends React.Component {
//   constructor(props) {
//     super(props)
//     this.fa = React.createRef()
//   }
//   faClick = () => {
//     this.fa.current.sonClick()
//   }
//   render () {
//     return <Son onClick={this.faClick} ref={this.fa} />
//   }
// }
// function Son2 (props, ref) {
//   return <span ref={ref}>son2</span>
// }
// const ForwardSon2 = React.forwardRef(Son2)
// class Fa2 extends React.Component {
//   constructor(props) {
//     super(props)
//     this.fa = React.createRef()
//     console.log('1 constructor')
//     this.state = { num: 1 }
//   }
//   faClick = () => {
//     this.fa.current.innerText = '112'
//     this.setState({ num: this.state.num + 1 })
//   }
//   componentWillMount () {
//     console.log('2 componentWillMount')
//   }
//   componentDidMount () {
//     console.log('4 componentDidMount')
//   }
//   // 当属性发生改变时,会走此方法决定是否渲染更新
//   shouldComponentUpdate (nextProps, nextState) {
//     // setState会引起nextState变化
//     // 父组件更新,会引起nextProps变化
//     console.log('5 shouldComponentUpdate')
//     return nextState.num > 3
//   }
//   componentWillUpdate () {
//     console.log('6 shouldComponentUpdate')
//   }
//   componentDidUpdate () {
//     console.log('7 shouldComponentUpdate')
//   }
//   render () {
//     console.log('3 render')
//     if (this.state.num > 3) {
//       return (
//         <button onClick={this.faClick}>click</button>
//       )
//     } else {
//       return <>
//         <ForwardSon2 ref={this.fa} />
//         <button onClick={this.faClick}>click</button>
//       </>
//     }
//   }
// }
// class ChildCounter extends React.Component {
//   constructor(props) {
//     super(props)
//     this.props = props
//     this.state = { a: '1' }
//     console.log('1 ChildCounter constructor')
//   }
//   static getDerivedStateFromProps (nextProps, oldState) {
//     console.log(nextProps, 'nextProps')
//     console.log(oldState, 'oldState')
//     return 1
//   }
//   render () {
//     console.log('3 ChildCounter render')
//     return (<span>{this.props.num}</span>)
//   }
// }
// class Counter extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { num: 1 }
//     console.log('1 constructor')
//   }
//   componentWillMount () {
//     console.log('2 componentWillMount')
//   }
//   componentDidMount () {
//     console.log('4 componentDidMount')
//   }
//   // 当属性发生改变时,会走此方法决定是否渲染更新
//   // shouldComponentUpdate (nextProps, nextState) {
//   //   // setState会引起nextState变化
//   //   // 父组件更新,会引起nextProps变化
//   //   console.log('5 shouldComponentUpdate')
//   //   return nextState.num % 2 === 0
//   // }
//   componentWillUpdate () {
//     console.log('6 shouldComponentUpdate')
//   }
//   componentDidUpdate () {
//     console.log('7 shouldComponentUpdate')
//   }
//   add = () => {
//     this.setState({ num: this.state.num + 1 })
//     // this.forceUpdate()
//   }
//   render () {
//     // return <span>123</span>
//     // console.log('3 render', this.state.num % 3 === 0)
//     let childCounter
//     if (this.state.num > 2) {
//       childCounter = <ChildCounter num={this.state.num} />
//     } else {
//       childCounter = <span>{this.state.num}span</span>
//     }
//     return <div><span>num:{this.state.num}</span>
//       <button onClick={this.add}>+</button>
//       {childCounter}
//       <span>尾部</span>
//     </div>
//   }
// }
// class ScrollList extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { num: [] }
//     this.wrapper = React.createRef()
//   }
//   componentDidMount () {
//     // this.timer = setInterval(() => {
//     //   this.setState((state) => ({
//     //     num: [state.num.length, ...state.num]
//     //   }))
//     // }, 1000)
//   }
//   componentWillUnmount () {
//     // clearInterval(this.timer)
//   }
//   getSnapshotBeforeUpdate () {
//     // 更新前scroll高度
//     let prevScrollTop = this.wrapper.current.scrollTop
//     // 更新前内容的高度
//     let prevContentTop = this.wrapper.current.scrollHeight
//     return {
//       prevScrollTop,
//       prevContentTop
//     }
//   }
//   componentDidUpdate (prevProps, prevState, snapshot) {
//     let { prevScrollTop, prevContentTop } = snapshot
//     this.wrapper.current.scrollTop = prevScrollTop + (this.wrapper.current.scrollHeight - prevContentTop)
//   }
//   render () {
//     let style = {
//       height: "150px",
//       width: "50px",
//       overflow: "auto",
//       border: "1px solid red",
//     }
//     return <div style={style} ref={this.wrapper}>
//       {
//         this.state.num.map((i, index) => {
//           return <div key={index}>{i}</div>
//         })
//       }
//     </div>
//   }
// }

/**
 * 高阶组件 属性代理
 */
// const a = (Ao) => {
//   return class extends React.Component {
//     show () {
//       console.log("show")
//     }
//     render () {
//       return <Ao {...this.props} show={this.show} />
//     }
//   }
// }
// class A extends React.Component {
//   render () {
//     return <button onClick={this.props.show}>123</button>
//   }
// }
// let B = a(A)
/**
 * 高阶组件 反向继承
 */
// class A extends React.Component {
//   componentDidMount () {
//     console.log('A componentDidMount')
//   }
//   render () {
//     console.log('A render')
//     return <div>123</div>
//   }
// }
// const B = (Aoa) => {
//   return class extends Aoa {
//     state = { num: 1 }
//     componentDidMount () {
//       console.log('B componentDidMount')
//     }
//     add = () => {
//       this.setState({ num: this.state.num + 1 })
//     }
//     render () {
//       console.log('B render')
//       let renderDom = super.render()
//       let newProps = {
//         ...renderDom.props,
//         onClick: this.add
//       }
//       let newDom = React.cloneElement(renderDom, newProps, <button>{this.state.num}</button>)
//       return newDom
//     }
//   }
// }
// let Ao = B(A)
/**
 * Render Props
 * 
 */
// class MouseTracker extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       x: 0,
//       y: 0
//     }
//   }
//   mouseMove = (event) => {
//     this.setState({ x: event.clientX, y: event.clientY })
//   }
//   render () {
//     return (
//       <div onMouseMove={this.mouseMove}>
//         {this.props.render(this.state)}
//       </div>
//     )
//   }
// }
// const wrapper = OldComponent => {
//   return class extends React.Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         x: 0,
//         y: 0
//       }
//     }
//     mouseMove = (event) => {
//       this.setState({ x: event.clientX, y: event.clientY })
//     }
//     render () {
//       return (
//         <div onMouseMove={this.mouseMove}>
//           <OldComponent {...this.state}></OldComponent>
//         </div>
//       )
//     }
//   }
// }
// function RenderContent (props) {
//   return (
//     <div>
//       <h1>鼠标移动</h1>
//       <p>x={props.x},y={props.y}</p>
//     </div>
//   )
// }
// let MouseTracker = wrapper(RenderContent)
function Child ({ data, setNumber }) {
  console.log('Child render')
  return (
    <button onClick={setNumber}>{data.num}</button>
  )
}
let MemoChild = React.memo(Child)
function App () {
  const [num, setNumber] = React.useState(0)
  const [name, setName] = React.useState('aaa')
  let data = React.useMemo(()=>({ num }),[num])
  let add = React.useCallback(() => setNumber(num + 1),[num])
  console.log('App render')
  return (
    <>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <MemoChild data={data} setNumber={add} />
    </>
  )
}
ReactDOM.render(
  // <Clock a={123}></Clock>,
  // <Ao />,
  // <Abc />,
  // abc,
  // <RefClassComponent />,
  // <Fa />,
  // <Fa2 />,
  // <Counter />,
  // <ScrollList />,
  // <Ao />,
  // <MouseTracker />,
  <App />,
  document.getElementById('root')
)
