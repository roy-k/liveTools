<template>
    <div>
      <h1>wordCards</h1>
      <hr/>
      <div class="con">
        <ul>
          <li v-for="word in showWords">
              <p v-show="loopConfig.showPro">{{word.pronunciation}}</p>
              <!--<div style="margin: 40px"> </div>-->
              <p v-show="loopConfig.showLow">{{word.low}}</p>
              <p v-show="loopConfig.showCap">{{word.cap}}</p>
          </li>
        </ul>
      </div>
        <div class="side-bar">
            <div :class="{'side-hide': !showSiderBar}">
                <!--<div style="text-align: right;"><span @click="hideSideBar">X</span></div>-->
                <SwitchBar label="显示小写" v-model="loopConfig.showLow"></SwitchBar>
                <SwitchBar label="显示大写" v-model="loopConfig.showCap"></SwitchBar>
                <SwitchBar label="显示读音" v-model="loopConfig.showPro"></SwitchBar>
                <SwitchBar label="自动切换" v-model="loopConfig.loop"></SwitchBar>
                <Vinput v-model="loopConfig.amount" label="总数量" :wid="80"></Vinput>
                <Vinput v-model="loopConfig.showNum" label="显示数量" :wid="80"></Vinput>
                <Vinput v-model="loopConfig.timeGap" label="切换时间" :wid="80"></Vinput>


                <SwitchBar label="暂停" v-model="loopConfig.loop"></SwitchBar>
                <!--<SwitchBar label="自动切换" v-model="loopConfig.random"></SwitchBar>-->
            </div>
            <!--<span class="side-bar-control" @click="toggleSideBar">{{showSiderBar ? '隐藏侧边栏' :'显示侧边栏'}}</span>-->
        </div>
    </div>
</template>

<script>
  import words  from 'data/words';
  import SwitchBar from 'cops/switch/switch.vue';
  import Vinput from 'cops/input/input.vue';

    export default {
        name: 'word-cards',
        components: {
            SwitchBar,
            Vinput,
        },
        data() {
          return {
              words,
              showWords: [],
              showSiderBar: true,
              loopConfig: {
                amount: 46,
                showNum: 1,

                random: true,
                showLow: true,
                showCap: true,
                showPro: false,

                loop: true,
                timeGap: 5000,

                pause: false,
              }
            }
        },
        computed: {
            showPool() {
                const {words} = this;
                return words.slice(0, this.loopConfig.amount);
            },
        },
        methods: {
            selectFromPool() {
                const {showPool} = this;
                const {showNum} = this.loopConfig;
                this.showWords = this.getRandomArrayElements(showPool, showNum);
            },
            getRandomArrayElements(arr, count) {
                const shuffled = arr.slice(0);
                let i = arr.length;
                let min = i - count;
                let temp;
                let index;
                while (i-- > min) {
                    index = Math.floor((i + 1) * Math.random());
                    temp = shuffled[index];
                    shuffled[index] = shuffled[i];
                    shuffled[i] = temp;
                }
                return shuffled.slice(min);
            },
            changeWords() {
                const {timeGap, loop} = this.loopConfig;
                setTimeout(() => {
                    if(this.loopConfig.loop) {
                        this.selectFromPool();
                    }
                    this.changeWords();
                }, timeGap);
            },
            toggleSideBar() {
                this.showSiderBar = !this.showSiderBar;
            }
        },
        created() {
            this.selectFromPool();
            this.changeWords();
        }
    }
</script>

<style scoped lang="stylus">
    h1, h2
        font-weight: normal
    ul
        list-style-type: none
        padding: 0
        width: 190px
        margin: 0 auto
    li
        display: inline-block
        margin: 0 10px
    a
        color: #42b983
    .con
        padding: 20px
    .side-bar
        position: absolute
        /*background-color: #fcfcfc*/
        left: 10px
        .side-hide
            width: 0
            overflow: hidden
            transition width .3s
        .side-bar-control
            position: absolute
            background-color: #c4e9ff
            cursor: pointer
            border-radius: 2px
            width: 14px;
            right: -15px
            top: 50%
            transform: translate(0, -50%)
        &::after
            content: ''
            position: absolute
            right: -25px
            top: 50%
            transform: translate(0, -50%)

</style>
