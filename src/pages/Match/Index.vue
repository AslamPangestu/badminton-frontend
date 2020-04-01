<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <q-btn color="primary" icon="fa fa-plus" label="Create" to="match/create" />
    </div>
    <div class="q-pt-md">
      <Table1 :columns="columns" model="Match" url="matches" :isViewtable="false" path="match" />
    </div>
  </q-page>
</template>

<script>
import Breadcums from 'src/components/Layout/Breadcums'
import Table1 from 'src/components/Table1'

const BREADCUMS = [
  {
    title: 'Home',
    icon: 'fas fa-home',
    link: '/admin'
  },
  {
    title: 'Match',
    icon: 'fas fa-calendar-plus'
  }
]
const COLUMS = [
  {
    name: 'name',
    label: 'Pertandingan',
    align: 'left',
    field: row => row.name,
    sortable: true
  },
  {
    name: 'is_single',
    label: 'Tipe',
    align: 'left',
    field: row => row.is_single ? 'Single' : 'Double',
    sortable: true
  },
  {
    name: 'location',
    label: 'Lokasi',
    align: 'left',
    field: row => row.location,
    sortable: true
  },
  {
    name: 'refree',
    label: 'Wasit',
    align: 'left',
    field: row => row.refree.nickname,
    sortable: true
  }
]

export default {
  name: 'PageMatch',
  components: { Breadcums, Table1 },
  data () {
    return {
      breadcums: BREADCUMS,
      columns: COLUMS
    }
  }
}
</script>
