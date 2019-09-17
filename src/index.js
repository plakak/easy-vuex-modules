import { 
  mapActions as mapVueActions,
  mapGetters as mapVueGetters,
  mapMutations as mapVueMutations,
  mapState as mapVueState
} from 'vuex';

import { aggregateEnties, aggregateEntiesForState, wrapVuexFn } from './helpers'; 

// Adds namespace to each module
export const namespace = modules =>
  Object.entries(modules).reduce((acc, [key, value]) => {
    acc[key] = Object.assign({}, value, { namespaced: true });
    return acc;
  }, {});
  
// Proxies namespace object to create module/operation at [[Get]].
export const createModuleMap = (namespace, module) =>
  new Proxy(namespace, {
    get(target, key) {
      const vuexModule = module || target.module;
      const nextTarget = target[key];

      return nextTarget.constructor === Object ? createModuleMap(nextTarget, vuexModule) : vuexModule + '/' + key;
    }
  });

export const combineModule = (name, getters, mutations, actions) => {
  return {
    module: name,
    ...(getters && { getters }),
    ...(mutations && { mutations }),
    ...(actions && { actions })
  }
};

export const mapActions = wrapVuexFn(mapVueActions, aggregateEnties);
export const mapMutations = wrapVuexFn(mapVueMutations, aggregateEnties);
export const mapGetters = wrapVuexFn(mapVueGetters, aggregateEnties);
export const mapState = wrapVuexFn(mapVueState, aggregateEntiesForState);