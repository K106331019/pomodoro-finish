<template>
  <div id="settings" class="w-100 h-100">
    <b-container>
            <b-table :items="items" :fields="fields" @row-clicked="select" style="margin-top: 10%;">
                <template #cell(src)="data">
                  <audio controls="controls" :src="require('@/assets/' + data.value)"></audio>
                </template>
                <template #cell(select)="data">
                  <span v-if="data.item.src === sound"><b-icon-check font-scale="3"></b-icon-check></span>

                </template>
            </b-table>
      </b-container>
  </div>
</template>

<script>

export default {
  data () {
    return {
      items: [
        { name: '鬧鈴', src: 'alarm.mp3' },
        { name: 'yay', src: 'yay.mp3' }
      ],
      fields: [
        { key: 'name', label: '名稱' },
        { key: 'src', label: '試聽' },
        { key: 'select', label: '選擇' }
      ]
    }
  },
  methods: {
    select (item) {
      this.$store.commit('selectSound', item.src)
    }
  },
  computed: {
    sound () {
      return this.$store.state.sound
    }
  }
}
</script>
