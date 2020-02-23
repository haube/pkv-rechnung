<!-- component template -->
<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(key, idx) in columns"
          :key="idx"
          @click="sortBy(key.name)"
          :class="{ active: sortKey == key.name }"
        >
          {{ key.name | capitalizeFilter }}
          <span class="arrow" :class="sortOrders[key.name] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, idx) in filteredData.data" :key="idx">
        <td v-for="(key, idxR) in columns" :key="idxR">
          <div v-if="key.type == 'date' && entry[key.name]">
            {{ entry[key.name] | moment("DD.MM.YYYY") }}
          </div>
          <div
            v-else-if="key.type === 'number' && entry[key.name]"
            class="numeric"
          >
            <!-- TOOD Util Function for number Format -->
            {{
              entry[key.name].toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR"
              })
            }}
          </div>
          <div v-else>
            {{ entry[key.name] }}
          </div>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row">Summen</th>
        <td
          class="numeric"
          v-for="(column, idxR) in columns.slice(1)"
          :key="idxR"
        >
          {{
            summeInColumn(filteredData, column).toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR"
            })
          }}
        </td>
      </tr>
      <tr>
        <td>Erfassen:</td>
        <td>
          <button>Add</button>
          <button>Clear</button>
        </td>
      </tr>
      <tr>
        <td v-for="(key, idxR) in columns" :key="idxR">
          <input
            v-if="key.type == 'number'"
            :type="key.type"
            :placeholder="capitalize(key.name)"
            min="0.00"
            step="any"
          />
          <input
            v-else-if="key.type == 'date'"
            :type="text"
            :placeholder="capitalize(key.name)"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
          /><input
            v-else
            :type="key.type"
            :placeholder="capitalize(key.name)"
          />
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import { FilteredData, TableColumn } from "@/types";

export default Vue.extend({
  name: "Tabelle" as string,
  props: {
    payload: { type: Array as () => Array<any> },
    columns: { type: Array as () => Array<TableColumn> },
    columnsSumup: { type: Array as () => Array<string> },
    filterKey: String
  },
  data(): {
    sortKey: string;
    sortOrders: { [key: string]: number };
  } {
    let sortOrders = {} as { [key: string]: number };
    if (this.columns) {
      this.columns.forEach(function(key: TableColumn) {
        sortOrders[key.name] = 1;
      });
    }
    return {
      sortKey: "",
      sortOrders: sortOrders
    };
  },
  computed: {
    filteredData(): FilteredData {
      let sortKey = this.sortKey;
      let filterKey = this.filterKey && this.filterKey.toUpperCase();
      let order = this.sortOrders[sortKey] || 1;
      let payloadDisplay: Array<any> = this.payload;
      let summen = [] as Array<{ key: string; value: number }>;

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

      if (this.columnsSumup && this.columnsSumup.length > 0) {
        this.columnsSumup.forEach(column => {
          let columnSum = { key: column, value: 0 };
          payloadDisplay.forEach(row => {
            if (row[column] && typeof row[column] === "number") {
              return (columnSum["value"] += row[column]);
            } else {
              return columnSum["value"];
            }
          });
          summen.push(columnSum);
        });
      }

      let filteredData = {} as FilteredData;
      filteredData.data = payloadDisplay;
      filteredData.summen = summen;

      return filteredData;
    }
  },
  filters: {
    //Todo String library
    capitalizeFilter(str: string): String {
      return (str.charAt(0).toUpperCase() + str.slice(1))
        .replace(/([A-Z])/g, " $1")
        .trim();
    }
  },
  methods: {
    sortBy(key: string): void {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    //Todo String library(duplicate in filter)
    capitalize(str: string): String {
      return (str.charAt(0).toUpperCase() + str.slice(1))
        .replace(/([A-Z])/g, " $1")
        .trim();
    },
    /**
     * returns number or empty String if non sum exists in the array
     */
    summeInColumn(filteredData: FilteredData, column: TableColumn): any {
      let index = filteredData.summen.findIndex(e => e.key === column.name);
      if (index >= 0) {
        return filteredData.summen[index].value;
      } else return "";
    }
  },

  mounted(): void {
    this.$log.debug(this.$options.name, "mounted");
    this.$log.debug(this.$options.name, "props.payload: ", this.payload);
    this.$log.debug(this.$options.name, "props.columns: ", this.columns);
    this.$log.debug(this.$options.name, "props.filterKey: ", this.filterKey);
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

.numeric {
  text-align: right;
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
