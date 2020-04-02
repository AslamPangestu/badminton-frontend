<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5">Create Match</div>
        </q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <q-input
              filled
              v-model="name"
              label="Nama Pertandingan"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              v-model="location"
              label="Lokasi Pertandingan"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-radio keep-color v-model="is_single" val="1" label="Single" color="red" />
            <q-radio keep-color v-model="is_single" val="0" label="Double" color="pink" />
            <q-select clearable v-model="referee" :options="options" label="Wasit" />
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
const BREADCUMS = [
  {
    title: 'Home',
    icon: 'fas fa-home',
    link: '/admin'
  },
  {
    title: 'Match',
    icon: 'fas fa-calendar-plus',
    link: '/admin/match'
  },
  {
    title: 'Create Match'
  }
]
export default {
  name: 'PageCreateMatch',
  components: { Breadcums },
  data () {
    return {
      name: '',
      location: '',
      referee: '',
      is_single: '',
      options: [],
      breadcums: BREADCUMS
    }
  },
  created () {
    this.getWasits()
  },
  methods: {
    async onSubmit () {
      try {
        await this.$axios.post(`${process.env.API_BASE_URL}/v1/matches`, {
          name: this.name,
          location: this.location,
          referee: this.referee.value,
          is_single: this.is_single === '1'
        })
        this.$router.back()
      } catch (error) {
        console.error('ERR', error)
      }
    },
    onReset () {
      this.name = ''
      this.location = ''
      this.referee = ''
      this.is_single = ''
    },
    async getWasits () {
      const res = await this.$axios.get(`${process.env.API_BASE_URL}/v1/players`)
      const options = []
      res.data.data.map(item => {
        options.push({ value: item._id, label: item.nickname })
      })
      this.options = options
    }
  }
}
</script>
