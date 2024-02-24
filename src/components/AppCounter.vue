<template>
  <div>
    <p data-testid="counter">{{ count }}</p>
    <button @click="count++">Increment</button>
    <button @click="count--">Decrement</button>
    <button @click.alt="count += 10">Increment 10</button>
  </div>
  <div>
    <h2>
      {{ customTitle }}
    </h2>
    <p> {{ count }} <sup>2</sup> = {{ squareValue }}</p>
    <p>{{ count }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    start: {
      type: Number,
      default: 150
    }
  },
  name: 'AppCounter',

  data() {
    return {
      count: this.start
    }
  },

  methods: {
    getSquareValue() {
      return this.count * this.count;
    }
  },

  computed: {
    squareValue() {
      return this.count * this.count;
    },
    customTitle() {
      return this.title || 'Counter';
    }
  }
}
</script>

<style></style>