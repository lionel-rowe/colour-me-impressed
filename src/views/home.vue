<template>
  <div class="home has-text-centered">
    <div class="comicsans has-text-light title is-1">Welcome to</div>
    <img class="logotype" src="/colour-me-impressed.png" alt="Colour Me Impressed" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "home",
  components: {}
});
</script>

<style lang="scss" scoped>
@import "@/styles/styles.scss";

.home {
  min-height: $main-height;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logotype {
  max-width: calc(100vw - 3em);
}

.comicsans.title.is-1 {
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  font-weight: normal;

  @media screen and (max-width: $tablet) {
    font-size: 2rem;
  }
}
</style>

