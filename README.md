# vue-webview-bridge

> An bridge for interacting between native and JavaScript as vue plugin.
  
In Hybrid App, you can call native methods with a global object that native developer defined before. when call a method, should pass parameters and callback names(callback name is a string, when excutes your callback, native will find the method with the same name ), so we need global callback. but in module development for a FE developer, if a callback method defined in a module, we can not call it in global, so this plugin can help, it return a promise, used in vue


## Installation
install with npm 

``` bash
# install plugin
npm install vue-webview-bridge --save
```
## Usage
1. import and use it in main.js
```javascript
import Vue from 'vue'
import App from './App'
import vueWebviewBridge from 'vue-webview-bridge'  
  
  
Vue.use(vueWebviewBridge, 'appWebView')
  
  
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

```

2. you can pass a global object name(witch can call your native methods) when use vueWebviewBridge, it's default value is 'appWebView'

3. use in a component

```vue
<template>
  <div @click="take">
    <img :src="avatar"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        avatar: ''
      }
    },
    methods: {
      take (index) {
        this.bridge('takePhoto', this.handleTake, this.currentIndex) // this will return a promise
      }
    }
  }
</script>
```


For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
