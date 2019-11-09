export const counterOneNamespace = {
  module: 'counterOne',
  getters: {
    multipliedByTwo: 'multipliedByTwo'
  },
  mutations: {
    increment: 'increment',
    decrement: 'decrement'
  }
};

export const counterOne = {
  state: {
    count: 1
  },
  getters: {
    [counterOneNamespace.getters.multipliedByTwo](state) {
      return state.count * 2;
    }
  },
  mutations: {
    [counterOneNamespace.mutations.increment](state) {
      state.count = state.count + 1;
    },
    [counterOneNamespace.mutations.decrement](state) {
      state.count = state.count - 1;
    }
  }
};

export const counterTwoGetters = {
  multipliedByThree: 'multipliedByThree'
};

export const counterTwoMutations = {
  increment: 'increment',
  decrement: 'decrement'
};


export const counterTwo = {
  state: {
    count: 1
  },
  getters: {
    [counterTwoGetters.multipliedByThree](state) {
      return state.count * 3;
    }
  },
  mutations: {
    [counterTwoMutations.increment](state) {
      state.count = state.count + 1;
    },
    [counterTwoMutations.decrement](state) {
      state.count = state.count - 1;
    }
  }
};
