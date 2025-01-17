<script setup lang="ts">
import type { Slot } from 'vue';

  const props = defineProps<{
    for?: string,
    label?: string,
    description?: string,
    hint?: string,
    showHint?: boolean,
    invalid?: boolean
  }>()

  defineSlots<{
    default?: Slot,
    label?: Slot,
    description?: Slot
  }>()

</script>

<template>
  <div class="form-group">
    <div class="form-group__label-wrapper">
      <label :for="props.for" class="form-group__label">
        <slot name="label">{{ props.label }}</slot>
      </label>
      <div class="form-group__description">
        <slot name="description">{{ props.description }}</slot>
      </div>
    </div>
    <div class="form-group__control">
      <slot />
    </div>
    <div v-if="props.hint !== undefined" class="form-group__hint" :class="{ 'form-group__hint--invalid': props.invalid }">
      <template v-if="props.showHint || props.invalid"> {{ props.hint }} </template>
    </div>
  </div>
</template>

<style scoped>
/* _form-group.css */
.form-group {
}

.form-group__label-wrapper {
  margin-block-end: var(--spacing-small);
}

.form-group__label {
  display: block;
  font-size: var(--font-size-control);
}

.form-group__description {
  color: var(--color-dimmed);
}

.form-group__hint {
  font-size: var(--font-size-small);
  color: var(--color-dimmed);
  min-height: 1lh;

  &.form-group__hint--invalid {
    color: var(--color-danger);
  }
}
</style>
