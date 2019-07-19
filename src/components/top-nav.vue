<template>
  <nav class="navbar is-light" id="nav">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <router-link to="/" class="logo-link">
          <div class="logo">
            <img src="/partyparrot.gif" alt />
          </div>
        </router-link>
        <router-link class="marginal first" to="/">Colour Me Impressed</router-link>
        <router-link class="marginal" to="/people">People</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({})
});
</script>


<style lang="scss">
@import "@/styles/styles.scss";

$bg: #fff;

.marginal {
  $margin: 0.8em;
  margin: $margin;

  &.first {
    margin-left: $logo-width;

    @media screen and (max-width: $tablet) {
      margin-left: $margin;
    }
  }
}

a:not(.logo-link) {
  display: inline-block;
  font-weight: bold;
  height: 2em;

  &.router-link-exact-active {
    border-bottom: .5em solid $primary;
  }
}

nav {
  background: $bg !important;
  height: $nav-height;
}

.logo {
  background: $bg;
  width: $logo-width;
  height: $logo-width;
  border-radius: 0 0 60% 0;
  left: 0;
  position: fixed;

  img {
    height: 50%;
    margin-top: 12px;
    margin-left: 10px;
  }

  @media screen and (max-width: $tablet) {
    width: $nav-height;
    height: $nav-height;
    background: none;
    border-radius: 0;
    position: relative;
  }
}
</style>
