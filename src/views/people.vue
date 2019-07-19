<template>
  <div class="container is-fluid orders">
    <div class="section">
      <div v-if="error" class="error">{{error}}</div>
      <div v-else-if="loading" class="loading">Loading…</div>

      <template v-else>
        <div class="controls">
          <div class="field">
            <div class="control">
              <label class="checkbox" for="show-inactive">
                <input v-model="showInactive" type="checkbox" id="show-inactive" />
                Show inactive
              </label>
            </div>
          </div>
        </div>
        <div class="people columns flex-wrap">
          <template v-for="person in filteredPeople">
            <person-card :key="person.personId" :person="person"></person-card>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PersonCard from "@/components/person-card.vue";

export default Vue.extend({
  name: "people",

  data: () => ({
    showInactive: false,
    people: [],
    loading: false,
    error: ''
  }),

  async mounted() {
    try {
      this.loading = true;

      const res = await fetch("https://colours.squirrels.dev/api/person");
      const people = await res.json();

      this.loading = false;
      this.people = people;
    } catch(e) {
      this.error = 'An error occurred.'
    }

  },

  computed: {
    filteredPeople() {
      return this.people.filter(
        person => this.showInactive || person.isEnabled
      );
    }
  },

  components: {
    PersonCard
  }
});
</script>

<style lang="scss" scoped>
.flex-wrap {
  flex-wrap: wrap;
}

.controls {
  margin-bottom: 2em;

  label {
    font-size: 1.2em;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
}
</style>

