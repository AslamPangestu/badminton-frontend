<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <div class="row">
        <div class="col-8">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h5">Detail Pertandingan</div>
            </q-card-section>
            <!-- Timer -->
            <q-card-section class="row text-center">
              <div class="col">
                <div class="text-h6">Timer</div>
              </div>
            </q-card-section>
            <q-card-section class="row text-center">
              <div class="col">
                <div class="text-h4">00:00:00</div>
              </div>
            </q-card-section>
            <q-card-section class="row text-center">
              <div class="col"></div>
              <div class="col">
                <div class="row justify-evenly">
                  <q-btn color="warning" size="md" icon="fa fa-pause" split />
                  <q-btn color="positive" size="md" icon="fa fa-play" split />
                  <q-btn color="negative" size="md" icon="fa fa-stop" split />
                </div>
              </div>
              <div class="col"></div>
            </q-card-section>
            <q-card-section class="row">
              <div class="col">
                <div class="text-h6 text-center" v-if="winTeam1">Winner</div>
                <div
                  class="text-center"
                  v-if="serviceTeam1 !== 0"
                >Service : Player Name - {{serviceTeam1 === 1 ? 'Left':'Right'}}</div>
                <div class="text-h6 text-center">Tim A</div>
              </div>
              <div class="col"></div>
              <div class="col">
                <div class="text-h6 text-center" v-if="winTeam2">Winner</div>
                <div
                  class="text-center"
                  v-if="serviceTeam2 !== 0"
                >Service : Player Name - {{serviceTeam2 === 1 ? 'Left':'Right'}}</div>
                <div class="text-h6 text-center">Tim B</div>
              </div>
            </q-card-section>
            <!-- Player Name -->
            <q-card-section class="row">
              <div class="col text-center">Nama Pemain & Nama Pemain</div>
              <div class="col text-h6 text-center">Set</div>
              <div class="col text-center">Nama Pemain & Nama Pemain</div>
            </q-card-section>
            <!-- Score -->
            <q-card-section class="row">
              <div class="col text-center">
                <q-card class="my-card">
                  <q-card-section class="text-h1">{{scoreTeam1}}</q-card-section>
                </q-card>
              </div>
              <div class="col">
                <div class="col text-h1 text-center">{{setTitle}}</div>
                <div class="col text-center">Service By Player Name(Position)</div>
              </div>
              <div class="col text-center">
                <q-card class="my-card">
                  <q-card-section class="text-h1">{{scoreTeam2}}</q-card-section>
                </q-card>
              </div>
            </q-card-section>
            <!-- Score Counter -->
            <q-card-section class="row">
              <div class="col">
                <div class="row justify-evenly">
                  <q-btn color="negative" size="md" icon="fa fa-minus" @click="decreaseScore(1)" />
                  <q-btn color="positive" size="md" icon="fa fa-plus" @click="increaseScore(1)" />
                </div>
              </div>
              <div class="col text-center">
                <q-btn color="warning" label="Reset" />
              </div>
              <div class="col">
                <div class="row justify-evenly">
                  <q-btn color="negative" size="md" icon="fa fa-minus" @click="decreaseScore(2)" />
                  <q-btn color="positive" size="md" icon="fa fa-plus" @click="increaseScore(2)" />
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions vertical>
              <q-btn label="Simpan Set" color="primary" @click="onDelete" />
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-3 offset-md-1">
          <q-card class="my-card q-mb-xs">
            <q-card-section>
              <div class="text-h5">Detail Pertandingan</div>
            </q-card-section>
            <q-card-section>
              <q-markup-table flat bordered>
                <tbody>
                  <tr>
                    <td class="text-left">Nama Pertandingan</td>
                    <td class="text-left">159</td>
                  </tr>
                  <tr>
                    <td class="text-left">Lokasi</td>
                    <td class="text-left">159</td>
                  </tr>
                  <tr>
                    <td class="text-left">Tipe</td>
                    <td class="text-left">159</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card-section>
          </q-card>
          <q-card class="my-card q-mt-xs">
            <q-card-section>
              <div class="text-h5">Hasil Pertandingan</div>
            </q-card-section>
            <q-card-section>
              <div>Detail</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
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
    title: 'Pertandingan'
  }
]
export default {
  name: 'PageHistoryDetail',
  components: { Breadcums },
  data () {
    return {
      id: '',
      setTitle: 1,
      scoreTeam1: 0,
      scoreTeam2: 0,
      winTeam1: false,
      winTeam2: false,
      serviceTeam1: 0,
      serviceTeam2: 0,
      data: {},
      team1: [],
      team2: [],
      set1: {},
      set2: {},
      set3: {},
      breadcums: BREADCUMS
    }
  },
  created () {
    // this.getWasits()
    // this.getData()
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
      const { name, location, refree } = res.data.data
      this.data = {
        name,
        location,
        refree,
        is_single: res.data.data.is_single
      }
      this.team1 = res.data.data.players_team1
      this.team2 = res.data.data.players_team2
      this.id = id
    },
    increaseScore (team) {
      if (team === 1) {
        if (this.scoreTeam1 !== 30) this.scoreTeam1++
      } else {
        if (this.scoreTeam2 !== 30) this.scoreTeam2++
      }
    },
    decreaseScore (team) {
      if (team === 1) {
        if (this.scoreTeam1 !== 0) this.scoreTeam1--
      } else {
        if (this.scoreTeam2 !== 0) this.scoreTeam2--
      }
    }
  }
}
</script>
