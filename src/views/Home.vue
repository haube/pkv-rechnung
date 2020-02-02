<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <h2>
      Willkommen, Heute ist {{ new Date() | moment("dddd, DD MMMM YYYY") }}
    </h2>
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
