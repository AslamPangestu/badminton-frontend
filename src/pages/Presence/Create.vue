<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5">Create Player</div>
        </q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <q-date v-model="date" landscape />
          </q-card-section>
          <q-separator dark />
          <q-card-actions align="center">
            <q-btn class="q-px-xl q-py-xs" label="Submit" type="submit" color="primary" />
            <q-btn class="q-px-xl q-py-xs" label="Reset" type="reset" color="primary" flat />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Breadcums from 'src/components/Layout/Breadcums'
export default {
  name: 'PageCreatePresences',
  components: { Breadcums },
  data () {
    return {
      date: '',
      breadcums: [
        {
          title: 'Home',
          icon: 'fas fa-home',
          link: '/admin'
        },
        {
          title: 'Presences',
          icon: 'fas fa-user',
          link: '/admin/presence'
        },
        {
          title: 'Create Presences'
        }
      ]
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.$axios.post(`${process.env.API_BASE_URL}/v1/presences`, {
          date: this.date
        })
        this.$router.back()
      } catch (error) {
        console.error('ERR', error)
      }
    },
    onReset () {
      this.date = ''
    }
  }
}
</script>
