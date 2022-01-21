<template>
  <div id="app">
    <div id="sidebar" class="nav col-1 vh-100 flex-column">
      <div class="btn mx-auto my-5">
        <router-link to="/" class="text-light" target="_self">
        <b-icon-play-circle-fill font-scale="3"></b-icon-play-circle-fill>
      </router-link></div>
      <div class="btn mx-auto my-3">
        <router-link to="/list" class="text-light" target="_self">
        <b-icon-check font-scale="5"></b-icon-check>
        </router-link>
      </div>
      <div class="btn mx-auto my-5">
        <router-link to='/settings' class="text-light" target="_self">
        <b-icon-gear-fill font-scale="3"></b-icon-gear-fill>
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
