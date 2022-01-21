<template>
  <div id="home" class="w-100 vh-100">
    <b-container class="vh-100" >
      <b-row class="h-100">
        <b-col cols="6" class="left">
          <b-img v-bind="circle" rounded="circle" class="circle"></b-img>
          <b-btn variant="link" class="play" v-if="status !== 1" @click="start">
          <b-icon-play-fill class="icon"></b-icon-play-fill>
          </b-btn>
          <b-btn variant="link" class="pause" v-else @click="pause">
          <b-icon-pause-fill class="icon"></b-icon-pause-fill>
          </b-btn>
          <b-btn variant="link" class="x" v-if="implement.length > 0" @click="finish(true)">
          <b-icon-x class="icon"></b-icon-x>
          </b-btn>
          <p class="time">{{ timeText }}</p>
        </b-col>
        <b-col cols="6" class="right">
          <div class="text">
            <p class="item">{{ implementText }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// STOP = 0
// COUNTING = 1

// PAUSE = 2
export default {
  data () {
    return {
      circle: {
        blank: true,
        blankColor: '#fff',
        width: 500,
        height: 500,
        class: 'm1'
      },
      status: 0,
      timer: 0
    }
  },
  computed: {
    implement () {
      return this.$store.state.implement
    },
    items () {
      return this.$store.state.items
    },
    implementText () {
      return this.implement.length > 0 ? this.implement : this.items.length > 0 ? '點擊開始' : '沒有事項'
    },
    timestart () {
      return this.$store.state.timestart
    },
    timeText () {
      const m = Math.floor(this.timestart / 60).toString().padStart(2, '0')
      const s = Math.floor(this.timestart % 60).toString().padStart(2, '0')
      return `${m}:${s}`
    }
  },
  methods: {
    start () {
      if (this.status === 0 && this.items.length > 0) {
        this.$store.commit('start')
      }
      if (this.implement.length) {
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timestart <= -1) {
            this.finish(false)
          }
        }, 1000)
      }
    },
    pause () {
      this.status = 2
      clearInterval(this.timer)
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish')

      if (this.items.length > 0) {
        this.start()
      } else {
        this.$swal({
          icon: 'success',
          title: '結束',
          text: ''
        })
      }
    }
  }
}
</script>
