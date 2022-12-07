<template>
  <v-app>
    <v-main>
      <div id="container" class="mx-auto w-100 h-100">
        <!-- Home -->
        <Home @state="setState" v-if="currentState === 'home'" />

        <!-- Form -->
        <UserForm @state="setState" v-if="currentState === 'form'" />

        <!-- Test -->
        <Test :questions="questions" v-if="currentState === 'test'" />

        <!-- End -->
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { phrases } from "@/questions/phrases.js";
import { createQuizQuestions } from "@/questions/question.js";
import UserForm from "@/components/UserForm.vue";
import Home from "@/components/Home.vue";
import Test from "@/components/Test.vue";
export default {
  name: "App",

  components: {
    UserForm,
    Home,
    Test,
  },

  async mounted() {
    var q = await createQuizQuestions(phrases, 8);
    setTimeout(() => {
      this.questions = q;
    }, 0);
    console.log("Fetched questions");
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
