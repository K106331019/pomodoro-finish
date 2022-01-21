<template>
  <div id="list" class="w-100 h-100">
    <b-container class="mt-5">
      <b-row>
        <b-col cols="8">
          <b-form-group label="新增事項" label-for="listinput"  invalid-feedback="字數太少"   label-size="lg">
            <b-form-input id="listinput" v-model="listinput" :state="listinputstate" @keydown.enter="additem"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-btn class="mt-5" @click="additem">新增</b-btn>
          </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col cols="5">
          <h1 class="text-secondary">待辦事項</h1>
          <b-table :items="items" :fields="fields" class="table">
            <template #cell(name)="data">
              <b-form-input v-if="data.item.edit" v-model="data.item.model" :state="data.item.state" @keydown.enter="okitem(data.index)" @keydown.esc="returnitem(data.index)"></b-form-input>
              <span class="todo2" v-else>{{ data.value }}</span>
            </template>
            <template #cell(action)="data">
              <span v-if="data.item.edit">
                <b-btn variant="success">
                  <b-icon-check @click="okitem(data.index)" ></b-icon-check>
                </b-btn>
                <b-btn variant="danger">
                  <b-icon-arrow-counterclockwise @click="returnitem(data.index)"></b-icon-arrow-counterclockwise>
                </b-btn>
              </span>
              <span v-else>
                <b-btn  variant="success">
                  <b-icon-pencil @click="reviseitem(data.index)"></b-icon-pencil>
                </b-btn>
                <b-btn  variant="danger">
                  <b-icon-trash @click="delitem(data.index)"></b-icon-trash>
                </b-btn>
              </span>
            </template>
          </b-table>
        </b-col>
        <b-col cols="5" class="ms-5">
          <h1 class="text-secondary">已完成事項</h1>
          <b-table-simple>
            <b-thead>
              <b-th class="py-2">名稱</b-th>
              <b-th class="py-2">操作</b-th>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(item,idx) in finished" :key="item.idx">
                <b-td class="todo">{{ item }}</b-td>
                <b-td>
                  <b-btn variant="danger" @click="delfinish(idx)">
                    <b-icon-trash></b-icon-trash>
                  </b-btn>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listinput: '',
      fields: [
        { key: 'name', label: '名稱' },
        { key: 'action', label: '操作' }
      ]

    }
  },
  computed: {
    listinputstate () {
      return this.listinput.length > 2 ? true : this.listinput.length === 0 ? null : false
    },
    items () {
      // 新增state
      return this.$store.state.items.map(item => {
        item.state = item.model.length > 2
        return item
      })
    },
    finished () {
      return this.$store.state.finished
    }
  },
  methods: {
    additem () {
      if (this.listinput.length > 2) {
        this.$store.commit('additem', this.listinput)
        this.listinput = ''
      }
    },
    reviseitem (index) {
      this.$store.commit('reviseitem', index)
    },
    delitem (index) {
      this.$store.commit('delitem', index)
    },
    okitem (index) {
      if (this.items[index].state) {
        this.$store.commit('okitem', index)
      }
    },
    returnitem (index) {
      this.$store.commit('returnitem', index)
    },
    delfinish (index) {
      this.$store.commit('delfinish', index)
    }

  }
}
</script>
