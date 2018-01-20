<template>
    <div>
      <h1>目录</h1>
      <hr/>
        <ul>
          <li v-for="router in routers">
            <router-link :to="router.path">{{router.name}}</router-link>
          </li>
        </ul>

    </div>
</template>

<script>
    import routers from '../router/merge'

    export default {
        name: 'index',
        data() {
          return {
              routers,
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .con {

  }
  ul {
    list-style-type: none;
    padding-top: 100px;
    /*width: 90px;*/
    margin: 0 auto;
  }
  li {
    /*display: inline-block;*/
    margin: 20px;
      font-size: 32px;
  }
  a {
    color: #42b983;
  }
</style>
