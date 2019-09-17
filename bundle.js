'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vuex = require('vuex');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var getProp = function getProp(object, path, defaultVal) {
  var _path = Array.isArray(path) ? path : path.split('.').filter(function (i) {
    return i.length;
  });

  if (!_path.length) {
    return object === undefined ? defaultVal : object;
  }

  return getProp(object[_path.shift()], _path, defaultVal);
};

var aggregateEnties = function aggregateEnties(arr) {
  return arr.reduce(function (acc, next) {
    acc[next.slice(next.lastIndexOf('/') + 1)] = next;
    return acc;
  }, {});
}; // Agregates names of operations from mapState

var aggregateEntiesForState = function aggregateEntiesForState(arr) {
  return arr.reduce(function (acc, next) {
    var name = '';

    if (typeof next === 'string') {
      name = next.slice(next.lastIndexOf('.') + 1);
    } else if (next.name && next.state) {
      name = next.name;
    } else {
      throw new Error('Wrong state provided to Vmodulex');
    }

    acc[name] = function (state) {
      return getProp(state, next.state ? next.state : next);
    };

    return acc;
  }, {});
};

var namespace = function namespace(modules) {
  return Object.entries(modules).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    acc[key] = Object.assign({}, value, {
      namespaced: true
    });
    return acc;
  }, {});
}; // Proxies namespace object to create module/operation at [[Get]].

var createModuleMap = function createModuleMap(namespace, module) {
  return new Proxy(namespace, {
    get: function get(target, key) {
      var vuexModule = module || target.module;
      var nextTarget = target[key];
      return nextTarget.constructor === Object ? createModuleMap(nextTarget, vuexModule) : vuexModule + '/' + key;
    }
  });
};
var combineModule = function combineModule(name, getters, mutations, actions) {
  return _objectSpread2({
    module: name
  }, getters && {
    getters: getters
  }, {}, mutations && {
    mutations: mutations
  }, {}, actions && {
    actions: actions
  });
};
var mapActions = wrapVuexFn(vuex.mapActions, aggregateEnties);
var mapMutations = wrapVuexFn(vuex.mapMutations, aggregateEnties);
var mapGetters = wrapVuexFn(vuex.mapGetters, aggregateEnties);
var mapState = wrapVuexFn(vuex.mapState, aggregateEntiesForState);

exports.combineModule = combineModule;
exports.createModuleMap = createModuleMap;
exports.mapActions = mapActions;
exports.mapGetters = mapGetters;
exports.mapMutations = mapMutations;
exports.mapState = mapState;
exports.namespace = namespace;
