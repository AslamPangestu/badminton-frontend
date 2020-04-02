<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5">Edit Player</div>
        </q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <q-input
              filled
              v-model="fullname"
              label="Nama Lengkap"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              v-model="nickname"
              label="Nama Panggilan"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              v-model="phone"
              type="number"
              label="Nomor HP"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-radio keep-color v-model="gender" val="L" label="Laki-Laki" color="red" />
            <q-radio keep-color v-model="gender" val="P" label="Perempuan" color="pink" />
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
    title: 'Player',
    icon: 'fas fa-user',
    link: '/admin/player'
  },
  {
    title: 'Edit Player'
  }
]
export default {
  name: 'PageEditPlayer',
  components: { Breadcums },
  data () {
    return {
      id: '',
      fullname: '',
      nickname: '',
      phone: '',
      gender: '',
      breadcums: BREADCUMS
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async onSubmit () {
      try {
        await this.$axios.patch(`${process.env.API_BASE_URL}/v1/players/${this.id}`, {
          fullname: this.fullname,
          nickname: this.nickname,
          phone: this.phone,
          gender: this.gender
        })
        this.$router.back()
      } catch (error) {
        console.error('ERR', error)
      }
    },
    onReset () {
      this.fullname = ''
      this.nickname = ''
      this.phone = ''
      this.gender = ''
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
