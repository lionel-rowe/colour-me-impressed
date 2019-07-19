<template>
  <div id="app">
    <top-nav></top-nav>
    <main class="is-dark has-text-light">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TopNav from "@/components/top-nav.vue";

export default Vue.extend({
  components: { TopNav },
  data: () => ({
    faviconIndex: 0,
    interval: -1
  }),

  mounted() {
    this.interval = setInterval(() => {
      const faviconEl = document.querySelector(
        "link[rel*='icon']"
      ) as HTMLLinkElement;

      faviconEl.href = `/pp${++this.faviconIndex % 10}.png`;
    }, 100);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
});
</script>

<style lang="scss">
@import "@/styles/styles.scss";
</style>

<style scoped lang="scss">
@import "@/styles/styles.scss";

main {
  min-height: $main-height;
  margin: 0 $logo-width;
  
  @media screen and (max-width: $tablet) {
    margin: 0;
  }
}
</style>
