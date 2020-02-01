<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ rechnungen }}</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import rechnungenData from "@/../tests/fixtures/rechnungen.json";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: {
    rechnungen() {
      return rechnungenData;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
