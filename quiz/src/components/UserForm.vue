<template>
  <div id="form-container">
    <v-form ref="form" v-model="valid" lazy-validation>
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

      <div v-if="isProgrammer">
        <h3>You're a programmer!</h3>

        <v-radio-group v-model="preferredStyle" row>
          <v-radio label="Option 1" value="radio-1"></v-radio>
          <v-radio label="Option 2" value="radio-2"></v-radio>
        </v-radio-group>
      </div>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,

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

    preferredStyle: null,
  }),

  methods: {
    validate() {
      var result = this.$refs.form.validate();
      console.log(result);
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
#form-container {
  max-width: 1024px;
  padding: 16px;
}
</style>
