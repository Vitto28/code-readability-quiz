<!-- https://gist.github.com/itechmeat/11e4e91b77b649ad3b63b63d8293ceb4 -->

<template>
  <p></p>
  <div class="time text-h3 font-weight-bold">{{ shownTime }}</div>
</template>

<script>
export default {
  props: {
    hours: Boolean,
    minutes: Boolean,
  },
  data() {
    return {
      time: null,
      isRunning: false,
      startTime: null,
      times: [0, 0, 0, 0],
      frameId: null,
    };
  },

  computed: {
    shownTime() {
      if (this.time) {
        return this.time.replace("00:00:", "");
      } else {
        return "00:00";
      }
    },
  },

  methods: {
    start() {
      if (this.isRunning) throw new Error("Stopwatch has already started.");
      this.isRunning = true;
      if (!this.startTime) this.startTime = performance.now();
      this.$emit("start", this.startTime);
      this.frameId = requestAnimationFrame(this.step);
    },

    stop() {
      if (!this.isRunning)
        throw new Error("Stopwatch has not been started yet.");
      this.isRunning = false;
      this.startTime = null;
      this.times = [0, 0, 0, 0];
      this.$emit("stop", this.shownTime);
      cancelAnimationFrame(this.frameId);
    },

    reset() {
      this.startTime = 0;
      this.isRunning = false;
      this.times = [0, 0, 0, 0];
      this.time = this.formatTimes();
    },

    formatTimes(times = this.times) {
      const hours = pad0(times[0], 2);
      const minutes = pad0(times[1], 2);
      const seconds = pad0(times[2], 2);
      const milliseconds = pad0(Math.trunc(times[3] % 100), 2);
      if (this.hours) {
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
      }
      if (this.minutes) {
        return `${minutes}:${seconds}:${milliseconds}`;
      }
      return `${seconds}:${milliseconds}`;
      function pad0(value, count) {
        let result = value.toString();
        while (result.length < count) {
          result = "0" + result;
          --count;
        }
        return result;
      }
    },

    step(timestamp) {
      if (!this.isRunning) return;
      this.calculate(timestamp);
      this.startTime = timestamp;
      this.time = this.formatTimes();
      this.frameId = requestAnimationFrame(this.step);
    },
    calculate(timestamp) {
      const diff = timestamp - this.startTime;
      this.times[3] += diff / 10;
      if (this.times[3] >= 100) {
        this.times[3] -= 100;
        this.times[2] += 1;
      }
      if (this.times[2] >= 60) {
        this.times[2] -= 60;
        this.times[1] += 1;
      }
      if (this.times[1] >= 60) {
        this.times[1] -= 60;
        this.times[0] += 1;
      }
    },
  },
};
</script>
