<template>
  <div id="form-container" class="w-100 h-100">
    <v-form id="form" class="my-16" lazy-validation>
      <v-btn
        id="back-btn"
        @click="goToHome"
        variant="text"
        prepend-icon="mdi-chevron-left"
      >
        go back
      </v-btn>
      <div id="title" class="mb-8">
        <h1 class="text-h2 mb-2">About You</h1>
        <span class="text-body-1">
          Before you begin the test, we need to know some basic information
          about you. <br />
          Don't worry, we're not selling your personal data to anybody
          <span class="text-grey-lighten-4">the authorities are aware of</span>
        </span>
      </div>

      <h3 class="text-h6">Gender</h3>
      <v-radio-group v-model="gender" mandatory inline>
        <v-radio label="Male" value="male"></v-radio>
        <v-radio label="Female" value="female"></v-radio>
        <v-radio label="Other" value="other"></v-radio>
      </v-radio-group>

      <h3 class="text-h6">Age</h3>
      <div class="horizontal">
        <v-radio-group v-model="age" mandatory>
          <v-radio label="< 20" value="<20"></v-radio>
          <v-radio label="20 - 29" value="20s"></v-radio>
          <v-radio label="30 - 39" value="30s"></v-radio>
          <v-radio label="40 - 49" value="40s"></v-radio>
          <v-radio label="50 - 59" value="50s"></v-radio>
          <v-radio label="60+" value="60+"></v-radio>
        </v-radio-group>
      </div>

      <v-checkbox
        v-model="isProgrammer"
        label="Do you know how to code?"
        required
        color="green lighten-1"
      ></v-checkbox>

      <div id="programmer" v-show="isProgrammer">
        <h3 class="text-h6">How long have you been programming for?</h3>
        <div class="horizontal">
          <v-radio-group v-model="yearProgramming" mandatory>
            <v-radio label="less than 1 year" value="<1"></v-radio>
            <v-radio label="1 - 5 years" value="1-5"></v-radio>
            <v-radio label="5 - 10 years" value="5-10"></v-radio>
            <v-radio label="10+ years" value=">10"></v-radio>
          </v-radio-group>
        </div>

        <h3 class="text-h6">How much do you program per day?</h3>
        <div class="horizontal">
          <v-radio-group v-model="hoursProgramming" mandatory>
            <v-radio label="less than 1 hour" value="<1"></v-radio>
            <v-radio label="1 - 4 hours" value="1-4"></v-radio>
            <v-radio label="4 - 8 hours" value="4-8"></v-radio>
            <v-radio label="8+ hours" value=">8"></v-radio>
          </v-radio-group>
        </div>

        <div class="mb-4">
          <h3 class="text-h6">What languages do you code in?</h3>
          <v-container id="languages" fluid>
            <v-checkbox
              v-for="(lang, i) in languages"
              :key="i"
              v-model="selectedLanguages"
              :value="lang"
              :label="lang"
            ></v-checkbox>
          </v-container>
          <span class="text-body-2"
            ><b class="text-subtitle-1 font-weight-bold">Other languages</b>
            (separate them by a comma)</span
          >
          <v-text-field
            placeholder="e.g: language-1, language-2, ..."
            v-model="extraLanguages"
            clearable
          ></v-text-field>
        </div>

        <h3 class="mb-2 text-h6">
          Which of these two casing styles do you prefer?
        </h3>
        <div id="style-preference" class="mb-16">
          <v-slider
            color="green-lighten-2"
            class="mb-8"
            v-model="preferredStyle"
            :ticks="styles"
            :max="2"
            step="1"
            show-ticks="always"
            tick-size="4"
          ></v-slider>
        </div>
      </div>

      <div id="buttons" class="mb-16 mt-8">
        <v-btn size="x-large" class="mr-16 bg-green-lighten-1" @click="submit">
          Finish
        </v-btn>
        <v-btn size="x-large" class="bg-red-lighten-2" @click="reset">
          Reset
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    // General Questions

    age: null,

    gender: null,

    // Programmer-specific questions

    isProgrammer: false,

    yearProgramming: null,
    hoursProgramming: null,

    preferredStyle: 1,
    styles: {
      0: "kebab-case",
      1: "No Preference",
      2: "camelCase",
    },

    languages: [
      "Python",
      "Java",
      "Go",
      "Kotlin",
      "JavaScript/TypeScript",
      "PHP",
      "C",
      "Ruby",
      "C++",
      "HTML/CSS",
      "C#",
    ],
    selectedLanguages: [],
    extraLanguages: "",
  }),

  methods: {
    goToHome() {
      this.$emit("state", "home");
    },

    goToTest() {
      this.$emit("state", "test");
    },

    submit() {
      if (this.formIsValid) {
        this.$emit("userData", this.userData);
        this.goToTest();
      } else {
        alert("The form is incomplete.");
      }
    },

    reset() {
      this.age = null;
      this.gender = null;
      this.preferredStyle = 1;
      this.selectedLanguages = [];
      this.extraLanguages = "";
      this.yearProgramming = null;
      this.hoursProgramming = null;
    },
  },

  computed: {
    usedLanguages() {
      var languages = [...this.selectedLanguages];
      var extra = this.extraLanguages.split(",");
      for (let i = 0; i < extra.length; i++) {
        var lang = extra[i].trim();
        if (lang !== "") {
          languages.push(lang);
        }
      }
      return languages;
    },

    formIsValid() {
      var generalIncomplete = !this.age || !this.gender;
      var programmerIncomplete =
        this.isProgrammer &&
        (this.usedLanguages.length == 0 ||
          !this.yearProgramming ||
          !this.hoursProgramming);
      return !generalIncomplete && !programmerIncomplete;
    },

    userData() {
      var data = { age: this.age, gender: this.gender };
      if (this.isProgrammer) {
        data.languages = this.usedLanguages;
        data.preferredStyle = this.styles[this.preferredStyle];
        data.yearProgramming = this.yearProgramming;
        data.hoursProgramming = this.hoursProgramming;
      }
      return data;
    },
  },
};
</script>

<style>
.horizontal .v-selection-control-group {
  flex-direction: row;
  justify-content: space-between !important;
}

#style-preference .v-slider-track__tick-label {
  margin-top: 16px;
  color: #444;
}
</style>

<style scoped>
#form {
  position: relative;
}

#back-btn {
  position: absolute;
  left: -36px;
  top: -48px;
}

#form-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: black !important;
}

#title,
.text-body-1,
.text-subtitle-1,
.text-h6 {
  color: #444;
}

.text-body-1 {
  font-size: 18px !important;
}

#form {
  width: 800px;
}

#languages {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 24px;
}

#buttons {
  display: flex;
  justify-content: center;
}
</style>
