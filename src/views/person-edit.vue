<template>
  <div class="container is-fluid">
    <div class="section">
      <div v-if="error" class="error">{{error}}</div>
      <div v-else-if="loading" class="loading">Loading…</div>

      <form v-else @submit="updatePerson">
        <h1 class="title is-3 has-text-light">Editing Details for {{fullName}}</h1>

        <div class="field">
          <div class="control">
            <label>
              First name
              <input v-model="person.firstName" class="input" type="text" />
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label>
              Last name
              <input v-model="person.lastName" class="input" type="text" />
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input v-model="person.isAuthorised" type="checkbox" />
              Authorised
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input v-model="person.isEnabled" type="checkbox" />
              Active
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input v-model="person.isValid" type="checkbox" />
              Valid
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <div class="select is-multiple">
              <label>
                Select favourite colours (
                <kbd>Ctrl</kbd> + click to select multiple)
                <select v-model="person.favouriteColours" multiple>
                  <option
                    v-for="colour in colours"
                    :key="colour.colourId"
                    :value="colour.colourId"
                  >{{colour.name}}</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <button type="submit" class="button is-success is-medium">Update</button>

        <router-link to="/people">
          <button type="button" class="button is-medium">Cancel</button>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { setTitle } from "@/router";
import { getGravatarUrl } from "@/utils/utils";

const retrieveAndWipeAutosavedPersonData = () => {
  if (window.localStorage.autosavedPersonData) {
    const personData = JSON.parse(window.localStorage.autosavedPersonData);
    window.localStorage.removeItem("autosavedPersonData");

    return personData;
  }

  return null;
};

export default Vue.extend({
  name: "person-edit",
  data: () => ({
    person: null,
    colours: [],
    loading: true,
    error: ""
  }),

  components: {},

  computed: {
    // TODO: DRY
    fullName(): string {
      return this.person && `${this.person.firstName} ${this.person.lastName}`;
    },
    gravatarUrl(): string {
      return this.person && getGravatarUrl(this.person);
    }
  },

  beforeDestroy() {
    this.$_autosavePersonData();
    window.removeEventListener("beforeunload", this.$_autosavePersonData);
  },

  async mounted() {
    window.addEventListener("beforeunload", this.$_autosavePersonData);

    const autosavedPersonData = retrieveAndWipeAutosavedPersonData();

    if (
      autosavedPersonData &&
      autosavedPersonData.personId === +this.$route.params.id
    ) {
      this.person = autosavedPersonData;
    }

    try {
      this.loading = true;

      const [person, colours] = await Promise.all(
        [
          `https://colours.squirrels.dev/api/person/${this.$route.params.id}`,
          "https://colours.squirrels.dev/api/colour"
        ].map(url => fetch(url).then(res => res.json()))
      );

      person.favouriteColours = person.favouriteColours.map(
        colour => colour.colourId
      );

      this.person = this.person || person;
      this.colours = colours;
      this.loading = false;

      setTitle(`Editing details for ${this.fullName}`);
    } catch (e) {
      this.error = "An error occurred.";
    }
  },
  methods: {
    $_autosavePersonData() {
      window.localStorage.autosavedPersonData = JSON.stringify(this.person);
    },
    
    async updatePerson() {
      try {
        this.loading = true;

        const person = JSON.parse(JSON.stringify(this.person));

        console.log(person.favouriteColours);

        person.favouriteColours = person.favouriteColours.map(id => ({
          colourId: id
        }));

        delete person.personId;
        console.log(person);

        const res = await fetch(
          `https://colours.squirrels.dev/api/person/${this.$route.params.id}`,
          {
            method: "PUT",
            body: person,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        await res.json();

        this.$router.push({ name: "people" });
      } catch (e) {
        this.error = "An error occurred.";
      }
    }
  }
});
</script>

<style lang="scss" scoped>
label:hover {
  color: #fff;
}

button {
  margin-right: 1em;
}
</style>

