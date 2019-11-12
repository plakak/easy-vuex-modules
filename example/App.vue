<template>
  <div class="counters">
   <div class="counters__one">
     <h2>Counter 1</h2>
     <div>
       Count: <span class="result"> {{ count }} </span>
     </div>
     <div>
       Count multiplied by two: <span class="result"> {{ multipliedByTwo }} </span>
     </div>
     <div>
       <button @click="increment"> + </button>
       <button @click="decrement"> - </button>
     </div>
   </div>
    <div class="counters__two">
      <h2>Counter 2</h2>
      <div>
        Count: <span class="result"> {{ count2 }} </span>
      </div>
      <div>
        Count multiplied by three: <span class="result"> {{ multipliedByThree }} </span>
      </div>
      <div>
        <button @click="increment2"> + </button>
        <button @click="decrement2"> - </button>
      </div>
    </div>
  </div>
</template>

<script>
  /* Easy-vuex-modules import*/
  import { mapGetters, mapState, mapMutations } from '../src'

  import { counterOne, counterTwo } from './store';

  export default {
    name: 'App',
    computed: {
      ...mapState([
        'counterOne.count',
        {name: 'count2', state: 'counterTwo.count'}
      ]),
      ...mapGetters([
        counterOne.getters.multipliedByTwo,
        counterTwo.getters.multipliedByThree
      ])
    },
    methods: {
      ...mapMutations([
        counterOne.mutations.increment,
        counterOne.mutations.decrement,
        {name: 'increment2', state: counterTwo.mutations.increment},
        {name: 'decrement2', state: counterTwo.mutations.decrement}
      ])
    }
  };
</script>

<style lang="scss">
  $colors: (
    "one": rebeccapurple,
    "two": tomato
  );

  .counters {
    font-size: 18px;
    font-family: 'Roboto', sans-serif;

    .result {
      font-weight: bold;
    }

    @each $key, $value in $colors {
      &__#{$key} {
        h2 {
          color: $value;
        }
        .result {
          color: $value;
        }
      }
    }
  }
</style>
