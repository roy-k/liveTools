<template>
    <div>
      <h1>wordCards</h1>
      <hr/>
      <div class="con">
        <ul>
          <li v-for="word in words">
            <p>{{word.low}}</p>
            <p>{{word.cap}}</p>
            <p>{{word.pronunciation}}</p>
          </li>
        </ul>
      </div>
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
  .con {

  }
  ul {
    list-style-type: none;
    padding: 0;
    width: 190px;
    margin: 0 auto;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
