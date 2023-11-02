export function maiusculo(str){
    return str.toUpperCase()
}

export function minusculo(str){
    return str.toLowerCase()
}


export function equal(val1, val2, options) {
    if (val1 === val2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }
  
  

