<template>
  <div align="center">
    <h2>Rechnungen</h2>
    <b>Search</b> <input name="query" v-model="searchQuery" />
    <pkv-tabelle
      :payload="rechnungen"
      :columns="gridColumns"
      :filter-key="searchQuery"
      :columnsSumup="columnsSumup"
    >
    </pkv-tabelle>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tabelle from "@/components/Tabelle.vue";
import rechnungenData from "@/../tests/fixtures/rechnungen.json";
import { Rechnung, TableColumn } from "@/types";
import * as moment from "moment";

export default Vue.extend({
  name: "RechnungTabelle" as string,
  components: {
    "pkv-tabelle": Tabelle
  },
  props: {},
  data() {
    this.$log.debug(this.$options.name, "data");
    return {
      rechnungen: rechnungenData as Array<Rechnung>,
      searchQuery: "" as string,
      gridColumns: [
        { name: "arzt", type: "string" } as TableColumn,
        { name: "datum", type: "date" } as TableColumn,
        { name: "betrag", type: "currency" } as TableColumn,
        { name: "beihilfeEingAm", type: "date" } as TableColumn,
        { name: "pkvEingAm", type: "date" } as TableColumn,
        { name: "bemerkung", type: "string" } as TableColumn,
        { name: "scan", type: "string" } as TableColumn,
        { name: "erstattungBh", type: "currency" } as TableColumn,
        { name: "erstattungPkv", type: "currency" } as TableColumn
      ] as Array<TableColumn>,
      columnsSumup: ["betrag", "erstattungBh", "erstattungPkv"]
    };
  },
  mounted(): void {
    this.$log.debug(this.$options.name, "mounted");
    this.$log.debug(this.$options.name, "rechnungen: ", this.rechnungen);
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
