<template>
  <q-page class="q-pa-md">
    <div class="q-pt-md">
      <Breadcums :data="breadcums" />
    </div>
    <div class="q-pt-md">
      <q-btn color="primary" icon="fa fa-plus" label="Create" to="player/create" />
    </div>
    <div class="q-pt-md">
      <Table1 :columns="columns" model="Player" url="players" :isViewtable="false" path="player"/>
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
    title: 'Player',
    icon: 'fas fa-user'
  }
]
const COLUMS = [
  {
    name: 'fullname',
    label: 'Fullname',
    align: 'left',
    field: row => row.fullname,
    sortable: true
  },
  {
    name: 'nickname',
    label: 'Nickname',
    align: 'left',
    field: row => row.nickname,
    sortable: true
  },
  {
    name: 'phone',
    label: 'Nomor Telepon',
    align: 'left',
    field: row => row.phone,
    sortable: true
  },
  {
    name: 'gender',
    label: 'Jenis Kelamin',
    align: 'left',
    field: row => row.gender,
    format: val => (val === 'L' ? 'Laki-Laki' : 'Perempuan'),
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
