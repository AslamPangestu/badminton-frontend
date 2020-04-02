<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section class="flex flex-center">
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input
            filled
            v-model="name"
            label="Nickname"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions vertical>
          <q-btn label="Login" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageClientLogin',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    onSubmit () {
      this.$router.push('/')
    }
  }
}
</script>
