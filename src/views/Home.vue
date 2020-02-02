<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <pkv-rechnung-tabelle msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import RechnungTabelle from "@/components/RechnungTabelle.vue";

export default {
  name: "home",
  components: {
    "pkv-rechnung-tabelle": RechnungTabelle
  },
  mounted() {
    console.log(this.$options.name, "mounted");
  }
};
</script>
