<template>
  <v-app>
    <v-main>
      <h1>Hello World!</h1>

      <div class="quiz">
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
    </v-main>
  </v-app>
</template>

<script>
import { phrases } from "@/questions/phrases.js";
import { createQuizQuestions } from "@/questions/question.js";
export default {
  name: "App",

  async mounted() {
    var q = await createQuizQuestions(phrases, 8);
    setTimeout(() => {
      this.questions = q;
    }, 0);
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

.quiz {
  display: flex;
  flex-wrap: wrap;
}
</style>
