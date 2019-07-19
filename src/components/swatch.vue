<template>
  <div
    class="swatch"
    :aria-label="description"
    :title="description"
    :class="!computedColour && 'unknown'"
    :style="{background: computedColour || null}"
  ></div>
</template>

<script lang="ts">
import Vue from "vue";
import { getComputedColour } from "@/utils/utils";

export default Vue.extend({
  props: {
    colour: {
      type: Object as () => IColour,
      required: true
    }
  },

  computed: {
    computedColour(): string {
      return getComputedColour(this.colour);
    },
    description(): string {
      return [this.colour.name, this.computedColour]
        .filter(Boolean)
        .join(" | ");
    }
  }
});
</script>

<style lang="scss" scoped>
.swatch {
  $size: 1.2em;

  display: inline-flex;
  width: $size;
  height: $size;
  border: 2px solid #eee;

  &.unknown {
    background: gray;
    align-items: center;
    justify-content: center;
    &:after {
      content: "?";
      font-weight: bold;
      color: white;
    }
  }
}
</style>
