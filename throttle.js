// //第一次触发，最后不会被调用触发函数
// //不顾头   顾尾
// function throttle(func, wait) {
//   let context, args
//   //之前的时间戳
//   let old = 0
//   return function() {
//     context = this
//     args = arguments
//     //获取当前的时间戳
//     let now = new Date().valueOf()
//     if(now - old > wait) {
//       //立即执行
//       func.apply(context, args)
//       old = now
//     }
//   }
// }

// //第一次不触发，最后一次会触发
// //顾头   不顾尾
// function throttle(func, wait) {
//   let context, args, timeout
//   return function() {
//     context = this
//     args = arguments
//     if (!timeout) {
//       timeout = setTimeout(() => {
//         timeout = null
//         func.apply(context, args)
//       }, wait)
//     }
//   }
// }

//第一次触发，最后一次会触发
//顾头   顾尾
function throttle(func, wait, options) {
  let context, args, timeout
  let old = 0
  if(!options) options = {}
  return function() {
    context = this
    args = arguments
    let now = new Date().valueOf()
    if(options.leading === false && !old) {
      old = now
    }
    if (now - old > wait) {
      //第一次会直接执行
      if(timeout) {
          clearTimeout(timeout)
          timeout = null
      }
      func.apply(context, args)
      old = now
    }else if (!timeout && options.trailing !== false) {
      //最后一次也会执行
      timeout = setTimeout(() => {
        old = new Date().valueOf()
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}