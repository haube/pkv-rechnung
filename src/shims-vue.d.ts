declare module "*.vue" {
  import Vue from "vue";
  import { DateServiceI } from "@/util/DateService";
  module "vue/types/vue" {
    interface Vue {
      $dateService: DateServiceI;
    }
    export interface VueConstructor<V extends Vue = Vue> {
      $log: {
        debug(...args: any[]): void;
        info(...args: any[]): void;
        warn(...args: any[]): void;
        error(...args: any[]): void;
        fatal(...args: any[]): void;
      };
    }
  }
  export default Vue;
}

declare module "*.json" {
  const value: { [key: string]: any };
  export default value;
}
