"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var vuex=require("vuex");function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function _objectSpread2(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(r,!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _iterableToArrayLimit(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var getProp=function e(t,r,n){var o=Array.isArray(r)?r:r.split(".").filter(function(e){return e.length});return o.length?e(t[o.shift()],o,n):void 0===t?n:t},aggregateEnties=function(e){return e.reduce(function(e,t){return e[t.slice(t.lastIndexOf("/")+1)]=t,e},{})},aggregateEntiesForState=function(e){return e.reduce(function(e,t){var r="";if("string"==typeof t)r=t.slice(t.lastIndexOf(".")+1);else{if(!t.name||!t.state)throw new Error("Wrong state provided to Vmodulex");r=t.name}return e[r]=function(e){return getProp(e,t.state?t.state:t)},e},{})},wrapVuexFn=function(t,r){return function(e){return t(r(e))}},namespace=function(e){return Object.entries(e).reduce(function(e,t){var r=_slicedToArray(t,2),n=r[0],o=r[1];return e[n]=Object.assign({},o,{namespaced:!0}),e},{})},createModuleMap=function o(e,a){return new Proxy(e,{get:function(e,t){var r=a||e.module,n=e[t];return n.constructor===Object?o(n,r):r+"/"+t}})},combineModule=function(e,t,r,n){return _objectSpread2({module:e},t&&{getters:t},{},r&&{mutations:r},{},n&&{actions:n})},mapActions=wrapVuexFn(vuex.mapActions,aggregateEnties),mapMutations=wrapVuexFn(vuex.mapMutations,aggregateEnties),mapGetters=wrapVuexFn(vuex.mapGetters,aggregateEnties),mapState=wrapVuexFn(vuex.mapState,aggregateEntiesForState);exports.combineModule=combineModule,exports.createModuleMap=createModuleMap,exports.mapActions=mapActions,exports.mapGetters=mapGetters,exports.mapMutations=mapMutations,exports.mapState=mapState,exports.namespace=namespace;
