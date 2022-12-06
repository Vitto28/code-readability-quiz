<template>
  <div id="form-container" class="w-100 h-100">
    <!-- <div style="z-index: 100; width: 500px; left: 8px">
      <div v-for="(entry, i) in Object.entries(this.userData)" :key="i">
        {{ entry[0] }}: {{ entry[1] }}
      </div>
    </div> -->
    <v-form id="form" class="mt-16" lazy-validation>
      <!-- <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[(v) => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select> -->

      <h3>Gender</h3>
      <v-radio-group v-model="gender" mandatory inline>
        <v-radio label="Male" value="male"></v-radio>
        <v-radio label="Female" value="female"></v-radio>
        <v-radio label="Other" value="other"></v-radio>
      </v-radio-group>

      <h3>Age</h3>
      <div id="age">
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
      ></v-checkbox>

      <div id="programmer" v-show="isProgrammer">
        <h3>Which of these two casing styles do you prefer?</h3>
        <v-slider
          class="mb-8"
          :model-value="preferredStyle"
          :ticks="styles"
          :max="2"
          step="1"
          show-ticks="always"
          tick-size="4"
        ></v-slider>

        <div class="mb-4">
          <h3>What languages do you code in?</h3>
          <v-container id="languages" fluid>
            <v-checkbox
              v-for="(lang, i) in languages"
              :key="i"
              v-model="selectedLanguages"
              :value="lang"
              :label="lang"
            ></v-checkbox>
          </v-container>
          <span><b>Other languages</b> (separate them by a comma)</span>
          <v-text-field
            placeholder="Add any other programming languages you know here..."
            v-model="extraLanguages"
            clearable
          ></v-text-field>
        </div>
      </div>

      <div id="buttons">
        <v-btn color="success" class="mr-4" @click="submit"> Finish </v-btn>
        <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>
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

    codingYears: null,

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

    codingYears: null,
  }),

  methods: {
    submit() {
      if (this.formIsValid) {
        this.$emit("userData", this.userData);
        alert(JSON.stringify(this.userData));
      } else {
        alert("The form is incomplete.");
      }
    },
    reset() {
      this.age = null;
      this.gender = null;
      this.isProgrammer = false;
      this.selectedLanguages = [];
      this.extra = "";
      this.codingYears = null;
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
        (!this.codingYears || this.usedLanguages.length == 0);
      return !generalIncomplete & !programmerIncomplete;
    },

    userData() {
      return {
        age: this.age,
        gender: this.gender,
        isProgrammer: this.isProgrammer,
        languages: this.usedLanguages,
        preferredStyle: this.styles[this.preferredStyle],
        codingYears: this.codingYears,
      };
    },
  },
};
</script>

<style>
#age .v-selection-control-group {
  flex-direction: row;
  justify-content: space-between !important;
}
</style>

<style scoped>
#form-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
