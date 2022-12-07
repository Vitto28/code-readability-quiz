<template>
  <v-app>
    <v-main>
      <div id="container" class="mx-auto w-100 h-100">
        <!-- Home -->
        <Home @state="setState" v-if="currentState === 'home'" />

        <!-- Form -->
        <UserForm @state="setState" v-if="currentState === 'form'" />

        <!-- Test -->
        <Test
          @state="setState"
          :questions="questions"
          v-if="currentState === 'test'"
        />

        <!-- End -->
        <div v-cloak v-if="currentState === 'end'" id="end-screen">
          <h1 class="text-h1 mb-8">Test Finished</h1>
          <p class="mb-4">
            Congratulations, you have finished the test! As a reward, here are
            some stats for you:
          </p>
          <div id="stats" class="mb-8">
            <v-card
              variant="tonal"
              min-height="120"
              subtitle="Correct Answers"
              class="stat mx-4"
            >
              <template v-slot:text
                ><h1 class="mt-4">{{ correctAnswers }}</h1>
              </template>
            </v-card>
            <v-card
              variant="tonal"
              subtitle="Average Click Speed"
              class="stat mx-4"
            >
              <template v-slot:text
                ><h1 class="mt-4">{{ averageClickSpeed }}</h1>
              </template>
            </v-card>
            <v-card
              variant="tonal"
              subtitle="Fastest Correct Guess"
              class="stat mx-4"
            >
              <template v-slot:text
                ><h1 class="mt-4">{{ fastestCorrectGuess }}</h1>
              </template>
            </v-card>
          </div>
          <h2 class="text-h4 mt-4">What now?</h2>
          <p class="mb-2 px-16">
            Before we let you go, there's one last step you need to do. We have
            gathered all the data you provided during this test into a single
            CSV file. Please download it and send it via email
            <b>to all three</b> of the following people:
          </p>
          <div
            class="mb-8"
            style="display: flex; width: 100%; justify-content: center"
          >
            <div class="mx-6" v-for="(person, i) in creators" :key="i">
              <h4 class="text-h6 mt-2">{{ person.name }}</h4>
              <span class="text-body-1">{{ person.email }}</span>
            </div>
          </div>

          <JsonCSV name="not-a-virus.csv" :data="data">
            <v-btn
              class="mb-8"
              color="green-lighten-2 px-4 text-white"
              size="x-large"
              >Download data</v-btn
            >
          </JsonCSV>

          <p class="ma-0 mb-2 mt-8">oh, and one final thing...</p>
          <div id="thanks">
            <p class="ma-0">
              <b class="text-green-lighten-2">thank you</b> for participating!
            </p>
          </div>
        </div>
        <!-- End end-screen -->
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
import JsonCSV from "vue-json-csv";

export default {
  name: "App",

  components: {
    UserForm,
    Home,
    Test,
    JsonCSV,
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
      creators: [
        { name: "João Tomazoni", email: "joao.tomazoni@usi.ch" },
        { name: "Vittoria Marina Scocco", email: "vittoria.scocco@usi.ch" },
        { name: "Agostino Monti", email: "agostino.monti@usi.ch" },
      ],

      currentState: "home",
      questions: [],
      userData: {},
      testResults: {},
      data: [], // final JSON obj to be transformed to CSV file
    };
  },

  computed: {
    correctAnswers() {
      var numOfQuestions = this.questions.length;
      var correctAnswers = 0;
      for (let i = 0; i < numOfQuestions; i++) {
        var question = this.testResults[i] || {};
        if (question.selected === question.solution) correctAnswers++;
      }
      return `${correctAnswers}/${numOfQuestions}`;
    },

    averageClickSpeed() {
      var numOfQuestions = this.questions.length;
      var sum = 0;
      for (let i = 0; i < numOfQuestions; i++) {
        var question = this.testResults[i];
        if (!question) continue;
        let [seconds, milliseconds] = question.time.split(":");
        sum += parseInt(seconds) * 1000 + parseInt(milliseconds);
      }
      sum = Math.floor(sum / numOfQuestions);
      var seconds = Math.floor(sum / 1000);
      var minutes = sum % 100; // two digits for ms

      return `${seconds}.${minutes}s`;
    },

    fastestCorrectGuess() {
      var numOfQuestions = this.questions.length;
      var fastest = null;
      for (let i = 0; i < numOfQuestions; i++) {
        var question = this.testResults[i];
        if (!question) continue;
        let [seconds, milliseconds] = question.time.split(":");
        var time = parseInt(seconds) * 1000 + parseInt(milliseconds);
        if (
          question.selected === question.solution &&
          (fastest === null || time < fastest)
        )
          fastest = time;
      }

      if (fastest === null) return "None";

      var seconds = Math.floor(fastest / 1000);
      var minutes = fastest % 100; // two digits
      return `${seconds}.${minutes}s`;
    },
  },

  methods: {
    setState(state, payload) {
      this.currentState = state;
      if (state === "end") {
        // emitted by test
        this.testResults = payload;
        this.createJSON();
      } else if (state === "test") {
        // emitted by form
        this.userData = payload;
      }
    },

    createJSON() {
      this.userData.answers = JSON.stringify(this.testResults);
      this.data.push(this.userData);
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

/* End screen */

#end-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1500px;
  height: 100%;
}

#end-screen p {
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

#stats {
  display: flex;
  width: 100%;
  justify-content: center;
}

#stats .stat {
  min-width: 200px;
  width: fit-content;
}

#stats .stat h1 {
  font-size: 5rem;
}

#thanks > * {
  font-size: 2rem;
}
</style>
