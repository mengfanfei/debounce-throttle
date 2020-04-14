function debounce(func, wait, immediate) {
    let timeout, result;
    const debounced =  function() {
        let context = this
        let args = arguments
        if(timeout) clearTimeout(timeout)
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

