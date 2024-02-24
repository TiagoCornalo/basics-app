<template>
  <img v-if="img" :src='img' alt="bg" />
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input type="text" placeholder="Hazme una pregunta" v-model="question">
    <p>Recuerda terminar con un signo de interrogación (?)</p>
    <div v-if="isValidQuestion">
      <h2>
        {{ question }}
      </h2>
      <h1>
        {{ answer }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: null,
      answer: null,
      img: '',
      isValidQuestion: false
    }
  },

  methods: {
    async getAnswer() {
      try {
        this.answer = 'Pensando...'
        const { answer, image } = await fetch('https://yesno.wtf/api')
          .then(response => response.json())

        this.answer = answer === 'yes' ? 'Sí!' : answer === 'no' ? 'No!' : 'Tal vez'
        this.img = image

      } catch (error) {
        this.answer = 'Ups! Algo salió mal'
        this.img = null
      }
    },
  },

  watch: {
    question(value) {

      this.isValidQuestion = false

      if (!value.endsWith('?')) return

      this.isValidQuestion = true

      this.getAnswer()
    }
  }
}
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}

input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>