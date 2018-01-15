<template>
    <div>
      <h1>wordCards</h1>
      <hr/>
      <ul>
        <li v-for="word in words">
          <p>{{word.low}}</p>
          <p>{{word.cap}}</p>
          <p>{{word.pronunciation}}</p>
        </li>
      </ul>
    </div>
</template>

<script>
  import words  from 'data/words';

    export default {
        name: 'word-cards',
        data() {
          return {
              words,
              loopConfig: {
                amount: '',

                random: false,
                showLow: false,
                showCap: false,
                showPro: false,

                loop: false,
                timeGap: 2000,

                pause: false,
              }
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
