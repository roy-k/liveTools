<template>
    <div>
      <h1>目录</h1>
      <hr/>
      <ul>
        <li v-for="router in routers">
            <router-link to="japanese/wordCards">wordCards</router-link>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
          return {
              routers: [
                {
                  name: '',
                  path: '',
                }
              ]
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
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
