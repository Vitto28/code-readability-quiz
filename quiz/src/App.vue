<template>
  <v-app>
    <v-main>
      <h1>Hello World!</h1>

      <div class="quiz">
        <div v-for="(question, i) in questions" :key="i" class="question">
          <h2>{{ question.phrase }}</h2>
          <ul>
            <li v-for="(op, i) in question.options" :key="i">{{ op }}</li>
          </ul>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { phrases } from "@/questions/phrases.js";
import { createQuizQuestions } from "@/questions/question.js";
export default {
  name: "App",

  async mounted() {
    var q = await createQuizQuestions(phrases, 4);
    setTimeout(() => {
      this.questions = q;
    }, 500);
    console.log(q);
  },

  data() {
    return {
      questions: [],
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
