<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn stretch flat to="/">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          <div class="q-ml-sm">Badminton Tetamba</div>
        </q-btn>
        <q-btn stretch flat label="Riwayat" to="history" />
        <q-btn stretch flat label="Menjadi Wasit" to="be-referee" />
        <q-space />
        <q-space />
        <q-space />
        <q-btn stretch flat label="Go To Dashboard" to="admin" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {}
  }
}
</script>

<style scoped>
.list-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
}
</style>
