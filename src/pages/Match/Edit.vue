<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5">Edit Match</div>
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
            <q-select clearable v-model="refree" :options="options" label="Wasit" />
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
  name: 'PageEditMatch',
  components: { Breadcums },
  data () {
    return {
      id: '',
      name: '',
      location: '',
      refree: '',
      is_single: '',
      options: [],
      breadcums: BREADCUMS
    }
  },
  created () {
    this.getWasits()
    this.getData()
  },
  methods: {
    async onSubmit () {
      try {
        await this.$axios.patch(`${process.env.API_BASE_URL}/v1/players/${this.id}`, {
          name: this.name,
          location: this.location,
          refree: this.refree.value,
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
      this.refree = ''
      this.is_single = ''
    },
    async getWasits () {
      const res = await this.$axios.get(`${process.env.API_BASE_URL}/v1/players`)
      const options = []
      res.data.data.map(item => {
        options.push({ value: item._id, label: item.nickname })
      })
      this.options = options
    },
    async getData () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`${process.env.API_BASE_URL}/v1/players/${id}`)
      this.fullname = res.data.data.fullname
      this.nickname = res.data.data.nickname
      this.phone = res.data.data.phone
      this.gender = res.data.data.gender
      this.id = id
    }
  }
}
</script>
