<template>
  <v-app>
    <v-main>
      <div id="container" class="mx-auto w-100 h-100">
        <!-- Home -->
        <div id="home" class="py-16" v-if="currentState === 'home'">
          <h1 class="text-h1 my-8">Code Readability Test</h1>
          <p class="mb-4">
            This test is designed to measure how different word-sperator styles
            affect the comprehension and correct identification of short
            sentences. More specifically, styles commonly used in computer
            programming (like kebab-case, camelCase, and so on).
          </p>
          <p class="mb-9">
            Memorize a given phrase or collection of words, select the correct
            response as fast as you can, and get the best score!
          </p>

          <v-btn
            class="mb-8"
            color="green-lighten-2 px-4 text-white"
            @click="stateIdx++"
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

        <!-- Form -->
        <UserForm v-if="currentState === 'form'" />

        <!-- Test -->

        <!-- End -->

        <!-- Quiz -->
        <!-- <v-btn @click="showQuestions = !showQuestions">Show Questions</v-btn> -->
        <div v-show="showQuestions" class="quiz">
          <v-card
            v-for="(question, i) in questions"
            :key="i"
            class="question ma-4 px-8 py-4"
          >
            <v-card-title>{{ question.phrase }}</v-card-title>
            <ul>
              <li v-for="(op, i) in question.options" :key="i">{{ op }}</li>
            </ul>
          </v-card>
        </div>
        <!-- End Quiz -->
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { phrases } from "@/questions/phrases.js";
import { createQuizQuestions } from "@/questions/question.js";
import UserForm from "@/components/UserForm.vue";
export default {
  name: "App",

  components: {
    UserForm,
  },

  async mounted() {
    var q = await createQuizQuestions(phrases, 8);
    setTimeout(() => {
      this.questions = q;
    }, 0);
    console.log(q);
  },

  data() {
    return {
      states: ["home", "form", "test", "end"],
      stateIdx: 0,

      showQuestions: false,
      questions: [],
    };
  },

  computed: {
    currentState() {
      return this.states[this.stateIdx];
    },
  },
};
</script>

<style>
p {
  font-size: 1.25rem;
}
</style>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #444;
}

#container {
  display: flex;
  justify-content: center;
}

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

.quiz {
  display: flex;
  flex-wrap: wrap;
}
</style>
