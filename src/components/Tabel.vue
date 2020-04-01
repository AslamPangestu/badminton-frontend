<template>
  <q-markup-table>
    <thead>
      <tr>
        <th class="text-left">
          <b>No.</b>
        </th>
        <th class="text-left" v-for="item in header" :key="item.key" v-bind="item">
          <b>{{item.label}}</b>
        </th>
        <th class="text-right">
          <b>Actions</b>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id" v-bind="item">
        <td class="text-left">
          <b>No.</b>
        </td>
        <td
          class="text-left"
          v-for="item1 in header"
          :key="item1.key"
          v-bind="item1"
        >{{item[item1.key]}}</td>
        <td class="text-right">
          <q-btn flat round size="xs" v-if="isViewtable" icon="fas fa-eye" />
          <q-btn
            flat
            round
            size="xs"
            v-if="isEditable"
            icon="fas fa-pen"
            :to="path+'/edit/'+item._id"
          />
          <q-btn
            flat
            round
            size="xs"
            v-if="isDeletabel"
            icon="fas fa-trash"
            @click="showDelete(item._id,item.nickname)"
          />
        </td>
      </tr>
    </tbody>
    <q-dialog v-model="isDelete">
      <q-card>
        <q-card-section>
          <div class="text-h6">Delete</div>
        </q-card-section>
        <q-card-section class="q-pt-none">Apakah anda yakin ingin menghapus {{model}} {{name}}</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancle" color="primary" v-close-popup />
          <q-btn flat label="OK" color="primary" @click="onDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-markup-table>
</template>

<script>
export default {
  name: 'Tabel',
  data () {
    return { data: [], isDelete: false, id: 0, name: '' }
  },
  props: {
    header: {
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
  async created () {
    try {
      const res = await this.$axios.get(`${process.env.API_BASE_URL}/v1${this.url}`)
      this.data = res.data.data
    } catch (error) {
      console.error('ERR', error)
    }
  },
  methods: {
    showDelete (id, name) {
      this.isDelete = true
      this.id = id
      this.name = name
    },
    async onDelete () {
      await this.$axios.delete(`${process.env.API_BASE_URL}/v1${this.url}/${this.id}`)
      this.isDelete = false
    }
  }
}
</script>
