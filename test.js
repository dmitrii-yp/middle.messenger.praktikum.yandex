const obj = {
  a: 1,
  b: 2,
}

const proxiedObject = new Proxy(obj, {
  get(target, prop) {
    console.log('get', prop)
    return target[prop]
  },
  set(target, prop, value) {
    console.log('set', prop, value)
    target[prop] = value
    return true;
  },
})

Object.assign(proxiedObject, { a: 3, b: 4 })

