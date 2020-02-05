declare module "*.vue" {
  import Vue from "vue";
  import { DateServiceI } from "@/util/DateService";
  module "vue/types/vue" {
    interface Vue {
      $dateService: DateServiceI;
    }
  }
  export default Vue;
}
declare module "*.json" {
  const value: { [key: string]: any };
  export default value;
}
