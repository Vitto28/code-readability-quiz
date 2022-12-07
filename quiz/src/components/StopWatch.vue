<template>
  <div>
    <p>{{ shownTime }}</p>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "stopwatch",
  props: {
    running: {
      type: Boolean,
      default: false,
    },
    resetWhenStart: {
      type: Boolean,
      default: false,
    },
    restWhenStop: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    running: function (newVal, oldVal) {
      if (newVal) this.startT();
      else this.stopT();
    },
  },
  mounted() {
    if (this.running) this.startT();
  },
  data() {
    return { time: 0, timer: null };
  },
  methods: {
    stopT: function () {
      clearInterval(this.timer);
      if (this.restWhenStop) this.resetT();
    },
    startT: function () {
      if (this.resetWhenStart) this.resetT();
      this.timer = setInterval(() => {
        this.time++;
      }, 10);
    },
    resetT: function () {
      this.time = 0;
    },
  },
  computed: {
    shownTime() {
      var timeT = moment("2015-01-01")
        .startOf("day")
        .milliseconds(this.time)
        .format("sS:SSS")
        .toString();
      return timeT.substring(0, 3) + "" + timeT.substring(4 + "".length);
    },
  },
  filters: {},
};
</script>

<style scoped>
p {
  font-weight: bold;
  font-size: x-large;
}
</style>
