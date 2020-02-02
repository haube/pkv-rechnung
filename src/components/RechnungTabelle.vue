<template>
  <div align="center">
    <form id="search">Search <input name="query" v-model="searchQuery" /></form>
    <demo-grid
      :data="rechnungen"
      :columns="gridColumns"
      :filter-key="searchQuery"
    >
    </demo-grid>
    <h2>{{ summe }} Euro</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DemoGrid from "@/components/DemoGrid.vue";
import rechnungenData from "@/../tests/fixtures/rechnungen.json";
import { Rechnung } from "@/types"; // Our interface#

export default Vue.extend({
  name: "RechnungTabelle" as string,
  components: {
    "demo-grid": DemoGrid
  },
  props: {
    msg: String
  },
  data() {
    console.log("data");
    return {
      rechnungen: rechnungenData as Array<Rechnung>,
      searchQuery: "" as String,
      gridColumns: ["arzt", "datum", "betrag"]
    };
  },
  computed: {
    summe(): number {
      console.log("summe");
      let sum: number = 0;
      // Rechnungen werden erst leer in Data deklariert, daher wird hier zunächst ein leeres Array berechnet, wo kein reduce existiert.
      if (this.rechnungen.length > 0) {
        sum = this.rechnungen.reduce(function(accumulator, rechnung) {
          return accumulator + rechnung.betrag;
        }, 0);
      }
      return sum;
    }
  },

  mounted(): void {
    console.log("mounted");
    console.log("rechnungen: ", this.rechnungen);
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
