# easy-vuex-modules

> Vuex helper that makes working with modules easier and more organized.

## Install

```
npm install easy-vuex-modules
or
yarn add easy-vuex-modules
```

## What problem does it solve?
In a Vuex, when using namespaced modules the map mutation/action/getters are becoming string based arrays:
 ```
...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
])
```

and maping states requires using functions:
```
 ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
```

There's also an option to go with
```const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')``` when it's needed but this 
adds even more code in each component.

`easy-vuex-modules` provides a set of helpers with it's own `mapState, mapGetters...` that makes using modules a bit more
straightfowrad.  


### mapState
Handling of the `mapState` via native vuex function is very dencent. One doesn't rely on strings so that's always
an added benefit. But if someone would like to follow string pattern that `mapState` allows when no namespaces are used -
`easy-vuex-modules` allows just that.
#### Before: 
```
    ...mapState({
       a: state => state.some.nested.module.a,
       b: state => state.some.nested.module.b
     })
   },
```

#### After:
The `state` with `easy-vuex-modules` resolves pretty straighforward - you can provide a string like one would if
 there was no namespaces at all.
 ```
import { mapState } from `easy-vuex-modules`;

...mapState([
    'some.nested.module.a',
    `some.nested.module.b`
]),
```

### mapGetters, mapMutations, mapActions
The real power of `easy-vuex-modules` shows here. While defining a state user also defines a namespaceMap that later allows 
to resolve getters/mutations/actions without use of error-prone strings.

#### Before:
 ```
...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
])
```

#### After:
 ```
  import { mapGetters, mapMutations } from `easy-vuex-modules`;
  import { module1, module2 } from './store';

  export default {
    name: 'App',
    computed: {
      ...mapGetters([
        module1.getters.foo,
        module2.getters.bar
      ])
    },
    methods: {
      ...mapMutations([
        module1.mutations.updateFoo,
        module2.mutations.changeBar
      ])
    }
  };
```
 

## Base usage
- Start by defining a namespace for a given module
```javascript
export const myModuleNamespace = {
   module: 'myModule',
   getters: {
     foo: 'foo'
   },
   mutations: {
     bar: 'bar',
   },
   actions: {
     baz: 'baz'
};
```

- When creating a module use defined namespace values as keys
```javascript
export const myModule = {
  state: {
    data: 1
  },
  getters: {
    [myModuleNamespace.getters.foo](state) {
      // getter
    }
  },
  mutations: {
    [myModuleNamespace.mutations.bar](state) {
      // mutation
    },
  actions: {
   [myModuleNamespace.actions.baz](state) {
        // action
    }
   }
  }
};
```
- During store creation make sure you use namespace for each module, or just ouse `namespace` helper provided by the library
```javascript
import { namespace } from 'easy-vuex-modules';
import { myModule } from './myModule';
 
export const storeInstance = new Vuex.Store({
  modules: namespace({
    myModule: myModule,
  })
});
```
- The step where magic happens. Use `createModuleMap` on the module namespace and export the result for use inside the components

```javascript
import { namespace } from 'easy-vuex-modules';
import { myModule } from './myModule';
 
export const storeInstance = new Vuex.Store({
  modules: namespace({
    myModule: myModule,
  })
});

export const counterOne = createModuleMap(counterOneNamespace);
```
- Import your store normally into the app
import store from './store';

```javascript
import { storeInstance } from './store';

new Vue({
  el: '#app',
  store: storeInstance,
  render: h => h(App),
});
```
- Use `easy-vuex-modules` functions instead of native `vuex` functions when mapping in component

```javascript
  import { mapGetters, mapMutations, mapActions } from 'easy-vuex-modules';
  import { myModule } from './store';

  export default {
    name: 'App',
    computed: {
      ...mapGetters([
        myModule.getters.foo
      ])
    },
    methods: {
      ...mapMutations([
        myModule.mutations.bar,
      ]),
      ...mapActions([
        myModule.actions.baz      
      ])      
    }
  };
```

Now you no longer have to use long strings to map to namespaced modules and if your IDE is clever enough it will even suggest you autocomplete for keys *(this should even work better after I add typings to the library)*

## Running example
Repository includes a simple example that can be easly run with webpack via `yarn run example` command.

## Dependences 
- Vuex

## Compatibility
`easy-vuex-modules` depends on Proxy functionality being available. Browser without Proxy support are not supported.

### TODO:
- add tests
- add typings
