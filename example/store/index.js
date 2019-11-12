import Vue from 'vue';
import Vuex from 'vuex';

/* Easy-vuex-modules import*/
import { namespace, createModuleMap, combineModule } from '../../src';

import {
  counterOne as counterOneModule,
  counterTwo as counterTwoModule,
  counterOneNamespace,
  counterTwoGetters,
  counterTwoMutations
} from './counters';

Vue.use(Vuex);

const storeInstance = new Vuex.Store({
  modules: namespace({
    counterOne: counterOneModule,
    counterTwo: counterTwoModule,
  })
});

export const counterOne = createModuleMap(counterOneNamespace);
export const counterTwo = createModuleMap(combineModule('counterTwo', counterTwoGetters, counterTwoMutations));

export default storeInstance;
