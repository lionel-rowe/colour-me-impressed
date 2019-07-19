<template>
  <div class="column is-4-desktop is-6-tablet is-12-mobile">
    <div class="card person-card-inner" :class="!person.isEnabled && 'inactive'">
      <header class="card-header">
        <p class="card-header-title">{{fullName}}</p>
        <router-link
          :to="`/people/${person.personId}/edit`"
          class="unstyled edit-button"
          :title="`Edit ${fullName}’s details`"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
        </router-link>
      </header>
      <div class="card-content">
        <img
          :src="gravatarUrl"
          :alt="`${fullName}’s profile pic`"
          :title="`${fullName}’s profile pic`"
        />
        <div>
          <font-awesome-icon class="status-icon" title="Valid" icon="check" v-if="person.isValid"></font-awesome-icon>
          <font-awesome-icon
            class="status-icon"
            title="Authorized"
            icon="key"
            v-if="person.isAuthorised"
          ></font-awesome-icon>
        </div>
      </div>
      <footer v-if="person.favouriteColours.length" class="card-footer">
        <div class="card-footer-item">
          <span>Favourite colours</span>
          <template v-for="favouriteColour in person.favouriteColours">
            <swatch :key="favouriteColour.colourId" :colour="favouriteColour"></swatch>
          </template>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getGravatarUrl } from "@/utils/utils";
import Swatch from "@/components/swatch.vue";

export default Vue.extend({
  components: {
    Swatch
  },

  props: {
    person: {
      type: Object as () => IPerson
    }
  },

  computed: {
    // TODO: DRY
    fullName(): string {
      return `${this.person.firstName} ${this.person.lastName}`;
    },
    gravatarUrl(): string {
      return getGravatarUrl(this.person);
    }
  },

  data: () => ({})
});
</script>

<style scoped lang="scss">
@import "@/styles/styles.scss";

$spacer: 0.5em;

* {
  word-wrap: break-word;
}
.person-card-inner {
  height: 100%;
  min-height: 200px;

  justify-content: space-between;

  .card-content {
    flex: 1 1 100%;
    display: flex;
    flex-direction: row;
    overflow-y: auto;

    img {
      margin-right: $spacer;
    }
  }

  .card-footer-item {
    justify-content: flex-start;
    flex-wrap: wrap;

    > * {
      margin-right: $spacer;
    }
  }
}

.inactive {
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
}

.status-icon {
  font-size: 1.2em;
  margin-right: $spacer;
}

.edit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  cursor: pointer;
  color: #000;

  &:hover {
    color: $primary;
  }
}
</style>
