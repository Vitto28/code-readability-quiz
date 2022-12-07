<!-- https://codesandbox.io/s/vue-stopwatch-forked-fe06fo?file=/src/App.vue:399-514 -->

<template>
  <div id="test-container">
    <!-- Test Screen -->
    <div
      v-show="this.state === 'test' || this.state === 'tutorial'"
      id="test"
      class="mt-16 pa-8"
    >
      <!-- Show Phrase -->
      <div class="w-100 h-100" id="big-phrase" v-if="showPhrase">
        <div class="phrase">
          <p class="mb-2 mr-2">your phrase is</p>
          <h1>{{ currentQuestion.phrase }}</h1>
        </div>

        <v-btn
          @click="closePreview"
          size="x-large"
          class="bg-green-lighten-2 mt-8 text-white"
        >
          Got it
        </v-btn>
      </div>

      <!-- End Show Phrase -->

      <!-- Actual test -->
      <div
        v-else
        class="w-100 h-100"
        style="display: flex; flex-direction: column"
      >
        <div id="info">
          <div class="phrase">
            <p class="mb-2 mr-2">your phrase is</p>
            <h1>{{ currentQuestion.phrase }}</h1>
          </div>
          <StopWatch
            ref="stopWatch"
            :running="running"
            :resetWhenStart="true"
          />
        </div>
        <div id="options" class="mt-4">
          <v-card
            variant="tonal"
            class="option"
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :class="`option ${
              currentQuestion.selected === index
                ? index === currentQuestion.solution
                  ? 'bg-green-lighten-3 text-white full-opacity'
                  : 'bg-red-lighten-2 full-opacity'
                : ''
            } ${currentQuestion.selected !== null ? 'disabled' : ''}`"
            @click="setAnswer(index)"
            >{{ option }}</v-card
          >
        </div>
        <v-btn
          id="next-btn"
          size="x-large"
          class="bg-green-lighten-2 mt-16 text-white"
          :disabled="currentQuestion.selected === null"
          @click="getNextQuestion"
        >
          {{
            currentQuestionIdx < activeQuestions.length - 1
              ? "Next Question"
              : "Finish"
          }}
        </v-btn>
      </div>
      <!-- End Actual test -->
    </div>
    <!-- End Test Screen -->

    <!-- Instructions -->
    <div
      id="instructions"
      v-if="this.state === 'instructions'"
      class="my-8 px-16"
    >
      <h1 class="text-h2 mb-2">Tutorial</h1>
      <p class="text-body-1 mb-8">
        Let's do a quick run down of how the test works and how you're meant to
        complete it. You will need to repeat the following steps a certain
        amount of times:
      </p>
      <ol id="list" class="px-8">
        <li>
          First of all, let's talk prep work. This test is meant to asses your
          <b>reaction and reading comprehension speed</b>. We want you to get
          the best score you possibly can, so if you partied too hard last night
          or skipped your morning coffee, come back to this test some other time
        </li>
        <li>
          A short phrase (only 2 or 3 words max) will be shown on the screen.
          You need to <b>memorize</b> this phrase, so take as much time as you
          need to study it carefully!
        </li>
        <li>
          After clicking continue, four boxes will appear on-screen. Inside
          these boxes is the phrase you saw before... but not quite. They'll be
          written either in
          <b class="text-red-darken-2">camelCaseStyle</b> or in
          <b class="text-red-darken-2">kebab-case-style</b>. Furthermore, only
          one of them contains your original phrase! The rest have been
          <b>modified to say something different</b>, so watch out
        </li>
        <li>
          When you see these boxes, the clock starts ticking! You need to
          <b>identify</b> which of these boxes contain the phrase you memorized,
          and you need to do it <b>as fast as possible</b>
        </li>
        <li>
          Once you've selected one of the options, the timer stops. You'll be
          able to see if you chose the correct answer, and you can check the
          timer on the upper-right corner of the screen to know how long you
          took to select it.
        </li>
        <li>
          Click on 'Next Question' to... well, you can guess what that button
          does
        </li>
      </ol>

      <div id="bottom" class="mt-16">
        <v-card
          id="tip"
          title="Pro Tip"
          text="Don't get discouraged if you choose and incorrect
            answer or take too long to choose which option to pick. Let that
            motivate you to perform better on the next one!"
        ></v-card>
        <div id="start">
          <p>Did you get all that? Let's do a trial run</p>
          <v-btn
            @click="beginTutorial"
            size="large"
            color="green-lighten-2 text-white"
            >start</v-btn
          >
        </div>
      </div>
    </div>
    <!-- End Instructions -->

    <!-- Tutorial End Screen -->
    <div
      id="tutorial-end"
      v-if="this.state === 'tutorial-end'"
      class="mx-16 my-8 px-16"
    >
      <h1 class="text-h2 mb-2">Tutorial Finished</h1>
      <p class="text-body-1 my-8">
        Whew! That wasn't too bad, was it? <br /><br />
        Now you know how this test works and how you're meant to interact with
        it. <br />
        You are free (and encouraged!) to redo the tutorial again until you
        become comfortable with the steps you need to perform.
      </p>
      <p class="text-body-1 mb-8">
        Otherwise, if you feel ready, you may continue to the real test now.
        Good luck!
      </p>
      <div id="buttons" class="mt-16">
        <v-btn size="x-large" class="mr-16" @click="redoTutorial">
          Redo Tutorial
        </v-btn>
        <v-btn
          size="x-large"
          class="ml-16 bg-green-lighten-2 text-white"
          @click="beginTest"
        >
          Do real test
        </v-btn>
      </div>
    </div>
    <!-- Tutorial End Screen -->

    <!-- Final end screen -->
    <!-- End Final end screen -->
  </div>
</template>

<script>
import StopWatch from "@/components/StopWatch.vue";

export default {
  props: {
    questions: {
      type: Object,
      required: true,
    },
  },

  components: {
    StopWatch,
  },

  data() {
    return {
      running: false, // whether the timer is running or not
      activeQuestions: [], // questions currently being used
      currentQuestionIdx: 0,
      state: "instructions",
      showPhrase: false, // preview phrase before answering

      sampleQuestions: [
        {
          phrase: "a sample phrase",
          options: [
            "a-sample-phase",
            "a-simple-phrase",
            "a-sample-phrase",
            "an-sample-phrase",
          ],
          solution: 2,
          selected: null,
          time: 0,
        },
        {
          phrase: "another sample phrase",
          options: [
            "anotherSamplePhrase",
            "anotherAmplePhase",
            "anthemSamplePhrase",
            "anotherSimplePhrase",
          ],
          solution: 0,
          selected: null,
          time: 0,
        },
      ],
    };
  },

  methods: {
    // quiz methods
    setAnswer(idx) {
      this.running = false;
      this.currentQuestion.selected = idx;
      this.currentQuestion.time = this.$refs.stopWatch.shownTime;
    },

    getNextQuestion() {
      this.currentQuestionIdx++;
      if (this.currentQuestionIdx === this.activeQuestions.length) {
        if (this.state === "tutorial") {
          this.state = "tutorial-end";
        } else if (this.state === "test") {
          this.$emit("test-finished", this.activeQuestions);
        }
      } else {
        this.showPhrase = true;
      }
    },
    closePreview() {
      this.showPhrase = false;
      this.running = true;
    },

    beginTutorial() {
      this.activeQuestions = this.sampleQuestions;
      this.currentQuestionIdx = 0;
      this.state = "tutorial";
      this.showPhrase = true;
    },

    redoTutorial() {
      // clean sample questions
      var questions = this.sampleQuestions;
      for (let i = 0; i < questions.length; i++) {
        var q = questions[i];
        q.selected = null;
        q.time = 0;

        // reorder answers
        const correctAnswer = q.options[q.solution];
        q.options.push(q.options.shift());
        q.solution = q.options.findIndex((e) => e === correctAnswer);
      }
      this.state = "instructions";
    },

    beginTest() {
      this.activeQuestions = this.questions;
      this.currentQuestionIdx = 0;
      this.state = "test";
      this.showPhrase = true;
    },
  },

  computed: {
    currentQuestion() {
      return this.activeQuestions[this.currentQuestionIdx] || {};
    },
  },
};
</script>

<style>
#tip .v-card-text {
  font-size: 1rem !important;
}
</style>

<style scoped>
#test-container {
  width: 100%;
  margin: 32px 64px;
  display: flex;
  justify-content: center;
}

b.text-red-darken-2 {
  letter-spacing: 0.5px;
}

p,
li {
  font-size: 1.25rem !important;
}

#list {
  width: 1300px;
}

li {
  margin-bottom: 24px;
}

#tutorial-end {
  margin-top: 200px !important;
}

#buttons {
  display: flex;
  justify-content: center;
  width: 100%;
}

#bottom {
  display: flex;
  justify-content: space-between;
}

#tip {
  width: 700px;
}

#start {
  display: flex;
  align-items: center;
  justify-content: center;
}

#start p {
  width: 200px;
  text-align: center;
}

#info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phrase {
  display: flex;
  align-items: flex-end;
}

#info h1 {
  font-size: 2.5rem;
}

#info p {
  margin-bottom: 5.5px;
}

#big-phrase {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#big-phrase p {
  font-size: 1.75rem !important;
  margin-bottom: 28px !important;
  margin-right: 16px !important;
}

#big-phrase h1 {
  font-size: 5.5rem;
}

/* Options */

#options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 3rem;
}

.option {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  transition: none;
}

.option.full-opacity {
  opacity: 1 !important;
}

.option.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.option:hover {
  cursor: pointer;
  background-color: #efebe9;
}

#test {
  width: 1300px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#next-btn {
  align-self: flex-end;
}
</style>
