import Vue from 'vue'

const bridge = {
  bridge: (method, callback, ...arvg) => {
    return new Promise((resolve, reject) => {
      const realCallback = (...arvg) => {
        try {
          resolve(callback(...arvg))
        } catch (e) {
          reject(e)
        }
      }
      const callbackId = window.callBackArr.push(realCallback) - 1
      appWebView[method](...arvg, callbackId)
    })
  },
  install: (Vue, options) => {
    console.log('查看一下options' + JSON.stringify(options))
    Vue.prototype.bridge = bridge
  }
}

export default install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
  if (install.installed) {
    install.installed = false
  }
}
