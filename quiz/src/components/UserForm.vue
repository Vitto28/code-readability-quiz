<template>
  <div id="form-container" class="mx-auto">
    <v-form class="w-100" ref="form" v-model="valid" lazy-validation>
      <v-text-field
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
      ></v-select>

      <v-checkbox
        v-model="isProgrammer"
        label="Do you know how to code?"
        required
      ></v-checkbox>

      <div id="programmer" v-show="isProgrammer">
        <h3>You're a programmer!</h3>

        <v-slider
          :model-value="preferredStyle"
          :ticks="styles"
          :max="2"
          step="1"
          show-ticks="always"
          tick-size="4"
        ></v-slider>

        <h4>What languages do you code in?</h4>
        <v-container id="languages" fluid>
          <v-checkbox
            v-for="(lang, i) in languages"
            :key="i"
            v-model="usedLanguages"
            :value="lang"
            :label="lang"
          ></v-checkbox>
        </v-container>
      </div>

      <div id="buttons">
        <v-btn color="success" class="mr-4" @click="validate"> Validate </v-btn>
        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,

    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],

    isProgrammer: true,

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
    usedLanguages: [],
  }),

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) alert("Form is valid");
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
#form-container {
  display: flex;
  justify-content: center;
  width: 800px;
  padding: 16px;
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
