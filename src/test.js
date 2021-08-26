class Father {
  static aaa = 'Father'
}
class Son extends Father {

}
let son = new Son()
console.log(son.constructor.aaa)