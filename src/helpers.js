const getProp = (object, path, defaultVal) => {
  const _path = Array.isArray(path) ? path : path.split('.').filter(i => i.length);

  if (!_path.length) {
    return object === undefined ? defaultVal : object;
  }

  return getProp(object[_path.shift()], _path, defaultVal);
};

export const aggregateEnties = arr =>
  arr.reduce((acc, next) => {
    if (typeof(next) === 'string') {
      acc[next.slice(next.lastIndexOf('/') + 1)] = next;
    } else if (next.name && next.state) {
      acc[next.name] = next.state;
    } else {
      throw new Error('Wrong data provided to easy-vuex-modules');
    }

    return acc;
  }, {});

// Agregates names of operations from mapState
export const aggregateEntiesForState = arr =>
  arr.reduce((acc, next) => {
    let name = '';

    if (typeof(next) === 'string') {
      name = next.slice(next.lastIndexOf('.') + 1);
    } else if (next.name && next.state) {
      name = next.name;
    } else {
      throw new Error('Wrong data provided to easy-vuex-modules');
    }

    acc[name] = state => getProp(state, next.state ? next.state : next);

    return acc;
  }, {});

export const wrapVuexFn = (fn, mapper) => array => fn(mapper(array));
