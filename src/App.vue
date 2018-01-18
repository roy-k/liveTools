<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html {
      height: 100%;
  }
  body {
    height: 100%;
      background-color: #ccc;
    /*background-image: radial-gradient(at top right, #B7B6BB 0%, #E8EAE9 100%);*/
    /*background-repeat: no-repeat;*/
  }
  * {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
</style>
