<template>
  <v-app>
    <v-main>
      <h1>Hello World!</h1>
    </v-main>
  </v-app>
</template>

<script>
import { phrases } from "@/questions/phrases.js";
import { createQuizQuestions } from "@/questions/question.js";
export default {
  name: "App",

  async mounted() {
    var questions = await createQuizQuestions(phrases, 4);
    console.log(questions);
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
