<template>
  <div>
    <q-table :title="model" :data="data" :columns="columns" row-key="_id" :loading="isLoading">
      <template v-slot:isLoading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            <b>{{ col.label }}</b>
          </q-th>
          <q-th auto-width>
            <b>Actions</b>
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
          <q-td auto-width>
            <q-btn flat round size="xs" v-if="isViewtable" icon="fas fa-eye" />
            <q-btn
              flat
              round
              size="xs"
              v-if="isEditable"
              icon="fas fa-pen"
              :to="path+'/edit/'+props.row._id"
            />
            <q-btn
              flat
              round
              size="xs"
              v-if="isDeletabel"
              icon="fas fa-trash"
              @click="showDelete(props.row._id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="isDelete">
      <q-card>
        <q-card-section>
          <div class="text-h6">Delete</div>
        </q-card-section>
        <q-card-section
          class="q-pt-none"
        >Apakah anda yakin ingin menghapus {{model}} dengan ID {{id}}</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancle" color="primary" v-close-popup />
          <q-btn flat label="OK" color="primary" @click="onDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'Tabel',
  data () {
    return { data: [], isDelete: false, id: 0, name: '', isLoading: false }
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    isEditable: {
      type: Boolean,
      default: true
    },
    isViewtable: {
      type: Boolean,
      default: true
    },
    isDeletabel: {
      type: Boolean,
      default: true
    },
    path: {
      type: String
    },
    url: {
      type: String
    },
    model: {
      type: String
    }
  },
  created () {
    this.getData()
  },
  methods: {
    showDelete (id) {
      this.isDelete = true
      this.id = id
    },
    async onDelete () {
      try {
        await this.$axios.delete(
          `${process.env.API_BASE_URL}/v1/${this.$props.url}/${this.id}`
        )
      } catch (error) {
        console.error('ERR', error)
      }
      this.isDelete = false
      this.getData()
    },
    async getData () {
      this.isLoading = true
      try {
        const res = await this.$axios.get(
          `${process.env.API_BASE_URL}/v1/${this.$props.url}`
        )
        this.data = res.data.data
      } catch (error) {
        console.error('ERR', error)
      }
      this.isLoading = false
    }
  }
}
</script>
