<template>
  <div id="test-container">
    <div id="title" class="mb-8">
      <!-- Tutorial -->
      <div id="tutorial" class="my-8 px-16">
        <h1 class="text-h2 mb-2">Tutorial</h1>
        <p class="text-body-1 mb-8">
          Let's do a quick run down of how the test works and how you're meant
          to complete it. You will need to repeat the following steps a certain
          amount of times:
        </p>
        <ol id="list" class="px-8">
          <li>
            First of all, let's talk prep work. This test is meant to asses your
            <b>reaction and reading comprehension speed</b>. We want you to get
            the best score you possibly can, so if you partied too hard last
            night or skipped your morning coffee, come back to this test some
            other time
          </li>
          <li>
            A short phrase (only 2 or 3 words max) will be shown on the screen.
            You need to <b>memorize</b> this phrase, so take as much time as you
            need to study it carefully!
          </li>
          <li>
            After clicking continue, four boxes will appear on-screen. Inside
            these boxes is the phrase you saw before... but not quite. Only one
            of them contains your original phrase, the rest have been
            <b>modified to say something different</b>, so watch out
          </li>
          <li>
            When you see these boxes, the clock starts ticking! You need to
            <b>identify</b> which of these boxes contain the phrase you
            memorized, and you need to do it <b>as fast as possible</b>
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
            <v-btn size="large" color="green-lighten-2 text-white">start</v-btn>
          </div>
        </div>
      </div>
      <!-- End tutorial -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questions: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      state: "test",
    };
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
  align-items: flex-start;
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
</style>
