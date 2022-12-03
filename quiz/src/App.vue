<template>
  <v-app>
    <v-main>
      <h1>Hello World!</h1>
      <v-btn @click="callit">click me</v-btn>
    </v-main>
  </v-app>
</template>

<script>
import { phrases } from "@/questions/phrases.js";
import { createQuizQuestions } from "@/questions/question.js";
export default {
  name: "App",

  methods: {
    callit() {
      var questions = createQuizQuestions(phrases, 4);
    },
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
