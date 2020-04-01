<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5">Edit Presences</div>
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
import { date } from 'quasar'

export default {
  name: 'PageEditPresence',
  components: { Breadcums },
  async created () {
    const { id } = this.$route.params
    const res = await this.$axios.get(`${process.env.API_BASE_URL}/v1/presences/${id}`)
    this.date = date.formatDate(res.data.data.date, 'YYYY/MM/DD')
    this.id = id
  },
  data () {
    return {
      id: '',
      date: '',
      breadcums: [
        {
          title: 'Home',
          icon: 'fas fa-home',
          link: '/admin'
        },
        {
          title: 'Presence',
          icon: 'fas fa-book-open',
          link: '/admin/presence'
        },
        {
          title: 'Edit Presence'
        }
      ]
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.$axios.patch(`${process.env.API_BASE_URL}/v1/presences/${this.id}`, {
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
