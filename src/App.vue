<template>
  <div id="app">
    <section class='-content'>
      <router-view/>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      pureData: 'this is a pure page'
    }
  }
}
</script>

<style lang="scss">

#app {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff;

  .-content {
    width: 750px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
  }
}
</style>
