<template>
  <div align="center">
    <h2>Rechnungen</h2>
    <b>Search</b> <input name="query" v-model="searchQuery" />
    <pkv-tabelle
      :payload="rechnungen"
      :columns="gridColumns"
      :filter-key="searchQuery"
    >
    </pkv-tabelle>
    <h2>{{ summe }} Euro</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tabelle from "@/components/Tabelle.vue";
import rechnungenData from "@/../tests/fixtures/rechnungen.json";
import { Rechnung } from "@/types";
import * as moment from "moment";

export default Vue.extend({
  name: "RechnungTabelle" as string,
  components: {
    "pkv-tabelle": Tabelle
  },
  props: {},
  data() {
    console.log(this.$options.name, "data");
    return {
      rechnungen: rechnungenData as Array<Rechnung>,
      searchQuery: "" as string,
      gridColumns: [
        "arzt",
        "datum",
        "betrag",
        "beihilfeEingAm",
        "pkvEingAm",
        "bemerkung",
        "scan"
      ]
    };
  },
  computed: {
    summe(): number {
      console.log(this.$options.name, "summe");
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
    console.log(this.$options.name, "mounted");
    console.log(this.$options.name, "rechnungen: ", this.rechnungen);
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
