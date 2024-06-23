// loading-plugin.js
import { reactive, readonly } from "vue";
import { debounce } from './helpers'

const state = reactive({
  state: false,
});
const msg = reactive({
});
const debounced = debounce(setState, 300);
function setState(e){
  state.state = e;
}
function copyProperties(target, source) {
  const prototype = Object.getPrototypeOf(source);
  if (prototype !== null) {
    const properties = Object.getOwnPropertyNames(prototype);
    properties.forEach(property => {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, property);
      Object.defineProperty(target, property, descriptor);
    });
  }
}

export const taskPlugin = {
  install(app) {
    app.provide("loading", {
      isLoading: readonly(state),
      showLoading() {
        debounced(true)
      },
      hideLoading() {
        debounced(false)
      },
    });
    app.provide("message", {
      msg:(msg),
      updateOprating:(e)=>{
        // console.dir(e.__proto__)
        let tmp = Object.getOwnPropertyNames(e.__proto__);
        for(let b in e){
          msg[b] = e[b]
        }
        tmp.forEach(b=>{
          msg[b] = e.__proto__[b]
        })
        // copyProperties(msg,e);
      }
    });
  },
};

