import React from './react'
import ReactDOM from './react-dom'
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
class ChildCounter extends React.Component {
  constructor(props) {
    super(props)
    console.log('1 ChildCounter constructor')
  }
  componentWillMount () {
    console.log('2 ChildCounter componentWillMount')
  }
  componentDidMount () {
    console.log('4 ChildCounter componentDidMount')
  }
  // 当属性发生改变时,会走此方法决定是否渲染更新
  // shouldComponentUpdate (nextProps, nextState) {
  //   // setState会引起nextState变化
  //   // 父组件更新,会引起nextProps变化
  //   console.log('5 ChildCounter shouldComponentUpdate')
  //   return nextProps.num % 3 === 0
  // }
  componentWillUpdate () {
    console.log('6 ChildCounter shouldComponentUpdate')
  }
  componentDidUpdate () {
    console.log('7 ChildCounter shouldComponentUpdate')
  }
  compontentWillReceiveProps () {
    console.log('x ChildCounter compontentWillReceiveProps')
  }
  componentWillUnmount () {
    console.log('9 ChildCounter componentWillUnmount')
  }
  render () {
    console.log('3 ChildCounter render')
    return (<span>{this.props.num}</span>)
  }
}
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { num: 1 }
    console.log('1 constructor')
  }
  componentWillMount () {
    console.log('2 componentWillMount')
  }
  componentDidMount () {
    console.log('4 componentDidMount')
  }
  // 当属性发生改变时,会走此方法决定是否渲染更新
  // shouldComponentUpdate (nextProps, nextState) {
  //   // setState会引起nextState变化
  //   // 父组件更新,会引起nextProps变化
  //   console.log('5 shouldComponentUpdate')
  //   return nextState.num % 2 === 0
  // }
  componentWillUpdate () {
    console.log('6 shouldComponentUpdate')
  }
  componentDidUpdate () {
    console.log('7 shouldComponentUpdate')
  }
  add = () => {
    this.setState({ num: this.state.num + 1 })
    // this.forceUpdate()
  }
  render () {
    // return <span>123</span>
    // console.log('3 render', this.state.num % 3 === 0)
    let childCounter
    if (this.state.num > 2) {
      childCounter = <ChildCounter num={this.state.num} />
    } else {
      childCounter = <span>{this.state.num}span</span>
    }
    return <div><span>num:{this.state.num}</span>
      <button onClick={this.add}>+</button>
      {childCounter}
      <span>尾部</span>
    </div>
  }
}
ReactDOM.render(
  // <Clock a={123}></Clock>,
  // <Ao />,
  // <Abc />,
  // abc,
  // <RefClassComponent />,
  // <Fa />,
  // <Fa2 />,
  <Counter />,
  document.getElementById('root')
)
