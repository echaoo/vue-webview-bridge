const bridgePlugin = {
  install: (Vue, bridgeName = 'appWebView') => {
    const bridge = (method, bridgeCallback, ...arvg) => {
      return new Promise((resolve, reject) => {
        const realCallback = (...arvg) => {
          try {
            resolve(bridgeCallback(...arvg))
          } catch (e) {
            reject(e)
          }
        }
        const callbackId = window.callBackArr.push(realCallback) - 1
        window[bridgeName][method](...arvg, callbackId)
      })
    }

    Vue.mixin({
      methods: {
        bridge
      }
    })
  }
}

export default bridgePlugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(bridgePlugin)
}
