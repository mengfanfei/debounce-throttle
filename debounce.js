function debounce(func, wait, immediate) {
    console.log(func,wait)
    let timeout, result;
    const debounced =  function() {
        
        let context = this
        let args = arguments
        if(timeout) clearTimeout(timeout)
        console.log(timeout)
        if(immediate) {
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            //立即执行
            if(callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, wait)
        }
        return result
        
    }
    debounced.cancel = function() {
        clearTimeout(timeout)
        timeout = null
    }
    return debounced
}
// underscore官网
// _.debounce = function(func, wait, immediate) {
//     var timeout, args, context, timestamp, result;

//     var later = function() {
//       var last = _.now() - timestamp;

//       if (last < wait && last > 0) {
//         timeout = setTimeout(later, wait - last);
//       } else {
//         timeout = null;
//         if (!immediate) {
//           result = func.apply(context, args);
//           if (!timeout) context = args = null;
//         }
//       }
//     };

//     return function() {
//       context = this;
//       args = arguments;
//       timestamp = _.now();
//       var callNow = immediate && !timeout;
//       if (!timeout) timeout = setTimeout(later, wait);
//       if (callNow) {
//         result = func.apply(context, args);
//         context = args = null;
//       }

//       return result;
//     };
//   };