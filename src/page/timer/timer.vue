<template>
    <div>
        <!--<h1>lucky wheel</h1>-->
        <div style="position: absolute; left: 10px; top: 10px">
            <a href="http://moshou.qq.com/" class="logo_eng"></a>
        </div>
        <div style="position: absolute; right: 10px; top: 10px">
            <router-link class="back" to="/"></router-link>
            <!--<a title="使用秒表"></a>-->
        </div>

        <!--<div>-->
            <!--<p style="text-align:center;font-size: 40px;">{{time}}</p>-->
        <!--</div>-->
        <canvas id="canvas" width="800" height="300">
            浏览器版本过低, 不支持canvas
        </canvas>

        <div class="noselect">请使用 空格 / 鼠标点击</div>

        <div class="sider" @mouseup.stop="empty">
            <SwitchBar label="倒计时" v-model="isCountDown"></SwitchBar>
            <div v-show="isCountDown" style="margin: 15px 0;overflow: hidden;">
                <Vselect v-model="setMin" :options="minOptions" style="float:left;width: 60px;"></Vselect>
                <span style="float: right;line-height: 32px;">分</span>
            </div>
            <div v-show="isCountDown" style="margin: 15px 0;overflow: hidden;">
                <Vselect v-model="setSec" :options="minOptions" style="float:left;width: 60px;"></Vselect>
                <span style="float: right;line-height: 32px;">秒</span>
            </div>
            <!--<Vselect v-model="setSec" :options="minOptions"></Vselect>-->
        </div>

    </div>
</template>

<script>
    import SwitchBar from 'cops/switch/switch.vue';
    import Vinput from 'cops/input/input.vue';
    import Vselect from 'cops/select/select.vue';

    export default {
        name: 'lucky-wheel',
        components: {
            SwitchBar,
            Vinput,
            Vselect,
        },
        data() {
            return {
                isCountDown: true,
                setMin: '0',
                setSec: '30',
                showModal: false,
                canvas: null,
                context: null,
                time: '00: 00: 00',

                startM: 0,
                endM: 0,

                fontSize: '100',
                wordWidth: '',
                CENTER_X: 0,  // todo
                CENTER_Y: 0,

                isStop: true,
                hasReset: true,
                minOptions: [],
            }
        },
        watch: {
            time: function() {
                this.drawTime();
            },
            isCountDown: function() {
                this.resetTime();
            },
            setMin: function() {
                this.resetTime();
            },
            setSec: function() {
                this.resetTime();
            },
        },
        methods: {
            empty() {},
            init() {
                let canvas = document.getElementById('canvas');
                let context = canvas.getContext('2d');
                if(!canvas || !context) {
                    alert('画布出错');
                    return;
                }
                this.canvas = canvas;
                this.context = context;
                this.CENTER_X = canvas.width / 2;
                this.CENTER_Y = canvas.height / 2;
                this.drawTime();

                window.addEventListener('keyup', this.eventHandler);
                window.addEventListener('mouseup', this.handle);
            },
            eventHandler(e) {
                if(e.keyCode === 32) {
                    this.handle();
                }
            },
            resetTime() {
                if(!this.isCountDown) {
                    this.time = '00: 00: 00';
                } else {
                    let {setMin, setSec} = this;
                    setMin = setMin > 9 ? setMin : '0' + setMin;
                    setSec = setSec > 9 ? setSec : '0' + setSec;
                    this.time = `${setMin}: ${setSec}: 00`;
                }
                this.hasReset = true;
            },
            drawTime(){
                let {canvas, context, time, CENTER_X, CENTER_Y, fontSize, wordWidth} = this;
                // ----- ① 清空页面元素，用于逐帧动画
                context.clearRect(0, 0, canvas.width, canvas.height);
                // -----

                // #88411f
                context.save();
                context.font = `bold ${fontSize}px Helvetica, Arial`;
                context.fillStyle = '#121225';
                if(!wordWidth) {
                    wordWidth = context.measureText(time).width;
                    this.wordWidth = wordWidth;
                }

                context.fillText(time, CENTER_X - wordWidth / 2, CENTER_Y);
                context.restore();
                // -----
            },
            refreshTime(){
                this.drawTime();

                if(this.isStop) {
                    console.log('stop', this.time);
                    return;
                }
                this.changeValue();

                window.requestAnimationFrame(this.refreshTime);
            },

            changeValue() {
                console.log('change');
                let past = 0;
                if(!this.isCountDown) {
                    past = new Date().getTime() - this.startM;

                } else {
                    past = this.endM - new Date().getTime();
                    if(past <= 0) {
                        this.stop();
                        return;
                    }
                }
                // 除 10 100 60  60
                const ms = past / 10 % 100;
                const s = past / 1000 % 60;
                const m = past / 1000 / 60 % 60;
                this.time = `${this.format(m, 2)}: ${this.format(s, 2)}: ${this.format(ms, 2)}`;
            },
            format(num, length) {
                let n = parseInt(num) + '';
                if(n.length < length) {
                    const zero = '0'.repeat(length - n.length);
                    n = zero + n;
                }
                return n;
            },
            handle() {
                if(!this.hasReset) {
                    this.resetTime();
                    this.drawTime();
                    this.hasReset = true;
                    return;
                }

                this.isStop ? this.start() : this.stop();
            },
            start() {
                this.startM = new Date().getTime();
                if(this.isCountDown) this.setEndTime();
                this.isStop = false;
                this.refreshTime();
            },
            setEndTime() {
                let {setMin, setSec} = this;
                let now = new Date().getTime();
                let span = parseInt(setMin) * 60 * 1000 + parseInt(setSec) * 1000;
                this.endM = now + span;
            },
            stop() {
                this.isStop = true;
                this.hasReset = false;
            },
        },
        mounted() {
            this.resetTime();
            this.init();
        },
        created() {
            this.minOptions = Array(60).fill(1).map((v, i) => {
                return {
                    label: i,
                    value: i,
                }
            })
        }
    };
</script>

<style scoped>
    .back {
        display: block;
        width: 70px;
        height: 70px;
        background: url(../../../static/asset/image/back.png) no-repeat center;
        background-size: 35px;
    }
    .logo_eng {
        display: block;
        width: 150px;
        height: 81px;
        background: url(../../../static/asset/image/logo_eng.png) no-repeat;
    }
    .modal-mask {
        align-items: flex-start;
    }
    .modal-4 {
        /*position: fixed;*/
        border: 1px solid #fff;
        padding: 0 4em;
        border-radius: 1em;
        background: #feca65;
        /*top: 100px;*/
        /*left: 50%;*/
        /*transform: translate(-50%, -50%);*/
        margin-top: 50px;
        /*background: hsla(0, 0%, 100%, .01)*/
    }
    h2 {
        display: block;
        font-size: 1.5em;
        -webkit-margin-before: 0.83em;
        -webkit-margin-after: 0.83em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        font-weight: bold;
        color: #f5fffa;
        font-family: Open Sans,sans-serif;
    }
    h1 {
        display: block;
        font-size: 2em;
        -webkit-margin-before: 0.67em;
        -webkit-margin-after: 0.67em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        font-weight: bold;
        color: #f60202;
        font-family: Open Sans,sans-serif;
    }
    .button {
        display: inline-block;
        margin: .3em;
        padding: 1.2em 3em;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        border-radius: 3px;
        transition: .3s;
        box-shadow: 0 2px 10px rgba(0, 0, 0, .5);
        border: none;
        font-size: 14px;
        text-align: center
    }

    .button:hover {
        box-shadow: 1px 6px 15px rgba(0, 0, 0, .5)
    }

    .green {
        background-color: #4caf50;
        color: #fff
    }

    .red {
        background-color: #fd5757;
        color: #fff
    }
    .noselect {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .sider {
        position: absolute;
        height: 200px;
        right: 10px;
        bottom: 0px;
        /*margin-top: 100px;*/
    }
</style>
