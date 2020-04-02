<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5">Buat Pertandingan</div>
        </q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="q-gutter-md row">
              <q-input
                filled
                v-model="name"
                label="Nama Pertandingan"
                lazy-rules
                class="col-5"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                v-model="location"
                label="Lokasi Pertandingan"
                lazy-rules
                class="col-5"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </div>
            <div class="q-gutter-md row">
              <q-select clearable v-model="referee" :options="options" class="col-5" label="Tim 1" />
              <q-select clearable v-model="referee" :options="options" class="col-5" label="Tim 2" />
            </div>
            <div class="q-gutter-md row">
            <q-radio keep-color v-model="is_single" val="1" label="Single" color="red" />
            <q-radio keep-color v-model="is_single" val="0" label="Double" color="pink" />
            </div>
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
    title: 'Dashboard',
    icon: 'fas fa-home',
    link: '/'
  },
  {
    title: 'Menjadi Wasit',
    icon: 'fas fa-user',
    link: '/be-referee'
  },
  {
    title: 'Buat Pertandingan'
  }
]
export default {
  name: 'PageBeRefereeCreate',
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
      const res = await this.$axios.get(
        `${process.env.API_BASE_URL}/v1/players`
      )
      const options = []
      res.data.data.map(item => {
        options.push({ value: item._id, label: item.nickname })
      })
      this.options = options
    }
  }
}
</script>
