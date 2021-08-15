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
class Abc extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = { num: 1 }
    this.clickSpan = this.clickSpan.bind(this)
  }
  clickSpan () {
    this.setState({ num: this.state.num + 1 })
    console.log(this.state.num)
    this.setState({ num: this.state.num + 1 })
    console.log(this.state.num)
    this.setState({ num: this.state.num + 1 })
    console.log(this.state.num)
    this.setState({ num: this.state.num + 1 })
    console.log(this.state.num)
    setTimeout(() => {
      this.setState({ num: this.state.num + 1 })
      console.log(this.state.num)
      this.setState({ num: this.state.num + 1 })
      console.log(this.state.num)
      this.setState({ num: this.state.num + 1 })
      console.log(this.state.num)
      this.setState({ num: this.state.num + 1 })
      console.log(this.state.num)
    })
  }
  render () {

    return <h1>num<span className="text-muted">{this.state.num}</span><div onClick={this.clickSpan}>+</div></h1>
  }
}
ReactDOM.render(
  // <Clock a={123}></Clock>,
  // <Ao />,
  <Abc />,
  // abc,
  document.getElementById('root')
)
