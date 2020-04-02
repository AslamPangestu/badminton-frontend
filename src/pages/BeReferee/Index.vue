<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <q-btn color="primary" icon="fa fa-plus" label="Create" to="be-referee/create" />
    </div>
    <div class="q-pt-md">
      <Table1
        :columns="columns"
        model="Menjadi Wasit"
        url="matches"
        path="be-referee"
        :isGrid="true"
        detailLabel="Match"
      />
    </div>
  </q-page>
</template>

<script>
import Breadcums from 'src/components/Layout/Breadcums'
import Table1 from 'src/components/Table1'

const BREADCUMS = [
  {
    title: 'Dashboard',
    icon: 'fas fa-home',
    link: '/'
  },
  {
    title: 'Menjadi Wasit',
    icon: 'fas fa-user'
  }
]
const COLUMS = [
  {
    name: 'is_single',
    label: 'Tipe',
    align: 'left',
    field: row => (row.is_single ? 'Single' : 'Double'),
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
    name: 'referee',
    label: 'Wasit',
    align: 'left',
    field: row => row.referee.nickname,
    sortable: true
  }
]

export default {
  name: 'PagePlayer',
  components: { Breadcums, Table1 },
  data () {
    return {
      breadcums: BREADCUMS,
      columns: COLUMS
    }
  }
}
</script>
