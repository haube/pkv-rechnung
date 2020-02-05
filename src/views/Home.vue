<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <div align="left">
      <h2>
        Willkommen, Heute ist<br />
        {{ new Date() | moment("dddd, Do MMMM YYYY") }}
      </h2>
    </div>
    <pkv-rechnung-tabelle />
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
    this.$log.debug(this.$options.name, "mounted");
  }
};
</script>
