<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5">Detail Pertandingan</div>
        </q-card-section>
        <q-card-section>
          <div>Detail</div>
        </q-card-section>
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
    title: 'Riwayat',
    icon: 'fas fa-book-open',
    link: '/history'
  },
  {
    title: 'Detail'
  }
]
export default {
  name: 'PageHistoryDetail',
  components: { Breadcums },
  data () {
    return {
      id: '',
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
    this.getData()
  },
  methods: {
    async getWasits () {
      const res = await this.$axios.get(
        `${process.env.API_BASE_URL}/v1/players`
      )
      const options = []
      res.data.data.map(item => {
        options.push({ value: item._id, label: item.nickname })
      })
      this.options = options
    },
    async getData () {
      const { id } = this.$route.params
      const res = await this.$axios.get(
        `${process.env.API_BASE_URL}/v1/players/${id}`
      )
      this.fullname = res.data.data.fullname
      this.nickname = res.data.data.nickname
      this.phone = res.data.data.phone
      this.gender = res.data.data.gender
      this.id = id
    }
  }
}
</script>
