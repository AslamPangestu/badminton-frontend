<template>
  <q-card class="my-card">
    <q-card-section>
      <q-breadcrumbs>
        <q-breadcrumbs-el
          v-for="item in data"
          :key="item.title"
          v-bind="item"
          :label="item.title"
          :to="item.link"
          :icon="item.icon"
        />
      </q-breadcrumbs>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'Breadcums',
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
