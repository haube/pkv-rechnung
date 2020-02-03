<!-- component template -->
<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(key, idx) in columns"
          :key="idx"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }"
        >
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, idx) in filteredData" :key="idx">
        <td v-for="(key, idxR) in columns" :key="idxR">
          <div v-if="typeof entry[key] === 'string'">
            {{ entry[key] | moment("DD.MM.YYYY") }}
          </div>
          <div v-else>
            {{ entry[key] }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Tabelle" as string,
  props: {
    payload: { type: Array as () => Array<any> },
    columns: { type: Array as () => Array<string> },
    filterKey: String
  },
  data(): {
    sortKey: string;
    sortOrders: { [key: string]: number };
  } {
    let sortOrders = {} as { [key: string]: number };
    if (this.columns) {
      this.columns.forEach(function(key: string) {
        sortOrders[key] = 1;
      });
    }
    return {
      sortKey: "",
      sortOrders: sortOrders
    };
  },
  computed: {
    filteredData(): Array<any> {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toUpperCase();
      var order = this.sortOrders[sortKey] || 1;
      var payloadDisplay = this.payload;
      if (filterKey) {
        payloadDisplay = payloadDisplay.filter(function(row: any) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toUpperCase()
                .indexOf(filterKey) > -1
            );
          });
        });
      }
      if (sortKey) {
        payloadDisplay = payloadDisplay.slice().sort(function(a: any, b: any) {
          switch (typeof a[sortKey]) {
            case "string":
              return (
                a[sortKey].localeCompare(b[sortKey], "de", {
                  sensitivity: "base",
                  numeric: true,
                  caseFirst: "upper",
                  usage: "sort",
                  ignorePunctuation: true
                }) * order
              );
            default:
              return (
                (a[sortKey] === b[sortKey]
                  ? 0
                  : a[sortKey] > b[sortKey]
                  ? 1
                  : -1) * order
              );
          }
        });
      }
      return payloadDisplay;
    }
  },
  filters: {
    capitalize(str: string): String {
      return (str.charAt(0).toUpperCase() + str.slice(1))
        .replace(/([A-Z])/g, " $1")
        .trim();
    }
  },
  methods: {
    sortBy(key: string): void {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  },

  mounted(): void {
    console.log(this.$options.name, "mounted");
    console.log(this.$options.name, "props.payload: ", this.payload);
    console.log(this.$options.name, "props.columns: ", this.columns);
    console.log(this.$options.name, "props.filterKey: ", this.filterKey);

    console.log(
      this.$options.name,
      "props.payload.slice(): ",
      this.payload.slice()
    );
    // console.log(this.$options.name, "props.filterKey: ", this.$props.filterKey);
  }
});
</script>

<style>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
