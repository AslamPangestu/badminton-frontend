<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <q-btn color="primary" icon="fa fa-plus" label="Create" to="presence/create" />
    </div>
    <div class="q-pt-md">
      <Table1 :columns="columns" model="Presence" url="presences" :isViewtable="false" path="presence"/>
    </div>
  </q-page>
</template>

<script>
import Breadcums from 'src/components/Layout/Breadcums'
import Table1 from 'src/components/Table1'
import { date } from 'quasar'

const BREADCUMS = [
  {
    title: 'Home',
    icon: 'fas fa-home',
    link: '/admin'
  },
  {
    title: 'Prensence',
    icon: 'fas fa-book-open'
  }
]
const COLUMS = [
  {
    name: 'date',
    label: 'Tanggal Kehadiran',
    align: 'left',
    field: row => date.formatDate(row.date, 'dddd, DD MMMM YYYY'),
    sortable: true
  }
]

export default {
  name: 'PagePresence',
  components: { Breadcums, Table1 },
  data () {
    return {
      breadcums: BREADCUMS,
      columns: COLUMS
    }
  }
}
</script>
