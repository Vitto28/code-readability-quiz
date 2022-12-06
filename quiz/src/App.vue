<template>
  <v-app>
    <v-main>
      <div id="container" class="mx-auto w-100 h-100">
        <!-- Home -->
        <Home @state="setState" v-if="currentState === 'home'" />

        <!-- Form -->
        <UserForm @state="setState" v-if="currentState === 'form'" />

        <!-- Test -->
        <h1 v-if="currentState === 'test'">Test</h1>

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
import Home from "@/components/Home.vue";
export default {
  name: "App",

  components: {
    UserForm,
    Home,
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
      currentState: "home",

      showQuestions: false,
      questions: [],
    };
  },

  methods: {
    setState(state) {
      this.currentState = state;
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

.quiz {
  display: flex;
  flex-wrap: wrap;
}
</style>
