<template>
  <div id="home" class="py-16">
    <h1 class="text-h1 my-8">Code Readability Test</h1>
    <p class="mb-4">
      This test is designed to measure how different word-sperator styles affect
      the comprehension and correct identification of short sentences. More
      specifically, styles commonly used in computer programming (like
      kebab-case, camelCase, and so on).
    </p>
    <p class="mb-9">
      Memorize a given phrase or collection of words, select the correct
      response as fast as you can, and get the best score!
    </p>

    <v-btn
      class="mb-8"
      color="green-lighten-2 px-4 text-white"
      @click="goToForm"
      size="x-large"
      >begin test</v-btn
    >

    <div id="credits" class="mt-16">
      <div class="credit-area pa-4">
        <h2 class="text-overline">Test designed by:</h2>
        <div>
          <h4 class="text-h6 mt-2">João Tomazoni</h4>
          <span class="text-body-1">joao.tomazoni@usi.ch</span>
          <h4 class="text-h6 mt-2">Vittoria Marina Scocco</h4>
          <span class="text-body-1">vittoria.scocco@usi.ch</span>
          <h4 class="text-h6 mt-2">Agostino Monti</h4>
          <span class="text-body-1">agostino.monti@usi.ch</span>
        </div>
      </div>
      <div class="credit-area pa-4">
        <h2 class="text-overline">Created for:</h2>
        <div>
          <h4 class="text-h6 mt-2">Course</h4>
          <span class="text-body-1"
            >Experimentation and Evaluation SA22-23</span
          >
          <h4 class="text-h6 mt-2">Prof. Gabriele Bavota</h4>
          <span class="text-body-1">gabriele.bavota@usi.ch</span>
          <h4 class="text-h6 mt-2">TA Leonardo Alchieri</h4>
          <span class="text-body-1">leonardo.alchieri@usi.ch</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToForm() {
      this.$emit("state", "form");
    },
  },
};
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1024px;
  height: 100%;
}

#home p {
  margin: 8px 188px;
  text-align: center;
}

#credits {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

#credits h2 {
  font-size: 1.1rem !important;
}

.credit-area {
  width: 350px;
}

.credit-area h4 {
  font-size: 1rem !important;
}
</style>
