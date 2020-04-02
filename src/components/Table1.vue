<template>
  <div>
    <q-table
      :grid="isGrid"
      :title="model"
      :data="data"
      :columns="columns"
      row-key="_id"
      :loading="isLoading"
    >
      <template v-slot:isLoading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-weight-bolder"
          >{{ col.label }}</q-th>
          <q-th auto-width class="text-weight-bolder">Actions</q-th>
        </q-tr>
      </template>
      <!-- TABLE -->
      <template v-slot:body="props" v-if="!isGrid">
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
              v-if="isDeletable"
              icon="fas fa-trash"
              @click="showDelete(props.row._id)"
            />
          </q-td>
        </q-tr>
      </template>
      <!-- GRID -->
      <template v-slot:item="props" v-if="isGrid">
        <div class="q-pa-xs col-xs-12 col-sm-5 col-md-4 col-lg-3 grid-style-transition">
          <q-card to="/">
            <q-card-section class="row justify-between">
              <div class="text-h6 text-weight-bolder">{{props.row.name}}</div>
              <div class="row justify-between">
                <q-btn
                  flat
                  round
                  size="sm"
                  v-if="isEditable"
                  icon="fas fa-pen"
                  :to="path+'/edit/'+props.row._id"
                />
                <q-btn
                  flat
                  round
                  size="sm"
                  v-if="isDeletable"
                  icon="fas fa-trash"
                  @click="showDelete(props.row._id)"
                />
              </div>
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-separator />
            <q-card-actions vertical>
              <q-btn flat :to="path+'/'+props.row._id">{{detailLabel}}</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-table>
    <!-- DELETE DIALOGUE -->
    <q-dialog v-model="isDelete" v-if="isDeletable">
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
    isGrid: {
      type: Boolean
    },
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
    isDeletable: {
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
    },
    detailLabel: {
      type: String,
      default: 'Detail'
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
