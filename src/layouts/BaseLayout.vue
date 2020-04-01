<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title class="list-item">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          <div class="q-ml-sm">Badminton Tetamba</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      show-if-above
      :width="250"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-list>
        <DrawerItem v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import DrawerItem from '../components/Layout/DrawerItem'
export default {
  name: 'BaseLayout',
  components: { DrawerItem },
  data () {
    return {
      left: false,
      essentialLinks: [
        {
          title: 'Home',
          icon: 'fas fa-home',
          link: '/admin'
        },
        {
          title: 'Player',
          icon: 'fas fa-user',
          link: '/admin/player'
        },
        {
          title: 'Presence',
          icon: 'fas fa-book-open',
          link: '/admin/presence'
        },
        {
          title: 'Match',
          icon: 'fas fa-calendar-plus',
          link: '/admin/match'
        }
      ]
    }
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
