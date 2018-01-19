<template>
    <div>
        <!--<h1>lucky wheel</h1>-->
        <div style="position: absolute; left: 10px; top: 10px">
            <a href="http://moshou.qq.com/" class="logo_eng"></a>
        </div>
        <div style="position: absolute; right: 10px; top: 10px">
            <a class="clock" title="使用秒表"></a>
        </div>
        <vue-modal
            v-model="showModal"
            :backdrop="false"
        >
            <div class="modal-4">
                <!--<h2>Congratulations 😊</h2>-->
                <h1>{{showWords}}   😊</h1>
                <!--<a @click="hideModal" class="button red">close</a>-->
            </div>
        </vue-modal>
        <canvas id="canvas" width="800" height="800">
            浏览器版本过低, 不支持canvas
        </canvas>

        <div class="noselect">请使用 空格 / 鼠标点击</div>


    </div>
</template>

<script>

// const awards= [ '大保健', '话费10元', '话费20元', '话费30元', '保时捷911', '火星7日游'];
const awards= [
    {num: 688, prob: 0.15, color: '#FF9E5E'},
    {num: 188, prob: 0.1,  color: '#ff86b5'},
    {num: 888, prob: 0.15, color: '#FD5757'},
    {num: 1888, prob: 0.5, color: '#FF6766'},
    {num: 388, prob: 0.1,  color: '#ff6e37'},
    ];


    export default {
        name: 'lucky-wheel',
        data() {
            return {
                showModal: false,
                canvas: null,
                context: null,
                showWords: '',

                OUTSIDE_RADIUAS: 300,   // 转盘的半径
                INSIDE_RADIUAS: 0,      // 用于非零环绕原则的内圆半径
                TEXT_RADIUAS: 210,      // 转盘内文字的半径

                POINTER_RADIUAS: 70,

                CENTER_X: 0,  // todo
                CENTER_Y: 0,

                awards,

                startRadian: 0,
                // awardRadian: (Math.PI * 2) / awards.length,
                // awardRadian: (Math.PI * 2) / 8,

                duration: 30000,     // 旋转事件
                velocity: 10,       // 旋转速率
                spinningTime: 0,    // 旋转当前时间
                spinTotalTime: '',       // 旋转时间总长
                spinningChange: '',      // 旋转变化值的峰值
                pointerAngle: 90,

                // pointerWord: '',

                isStop: true,
            }
        },
        methods: {
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
                this.drawRouletteWheel();

                window.addEventListener('keyup', this.eventHandler);
                window.addEventListener('mouseup', this.handle);
            },
            eventHandler(e) {
                if(e.keyCode === 32) {
                    this.handle();
                }
            },
            clear() {},
            drawRouletteWheel() {
                let {canvas, context, OUTSIDE_RADIUAS, INSIDE_RADIUAS, TEXT_RADIUAS, CENTER_X, CENTER_Y, POINTER_RADIUAS, awards, startRadian, isStop} = this;
                let _startRadian = startRadian;
                // ----- ① 清空页面元素，用于逐帧动画
                context.clearRect(0, 0, canvas.width, canvas.height);
                // -----

                for (let i = 0; i < awards.length; i ++) {
                    let awardRadian = awards[i].prob * 2 * Math.PI;

                    let _endRadian =   _startRadian + awardRadian;     // 每一个奖项的终止弧度

                    // console.log(_startRadian, _endRadian, awardRadian);
                    // ----- ② 使用非零环绕原则，绘制圆盘
                    context.save();
                    context.fillStyle = awards[i].color;
                    context.beginPath();
                    context.arc(canvas.width / 2, canvas.height / 2, OUTSIDE_RADIUAS, _startRadian, _endRadian, false);
                    context.arc(canvas.width / 2, canvas.height / 2, INSIDE_RADIUAS, _endRadian, _startRadian, true);
                    context.fill();
                    context.restore();
                    // -----

                    // ----- ③ 绘制文字
                    context.save();
                    context.font = 'bold 25px Helvetica, Arial';
                    context.fillStyle = '#FFF';
                    context.translate(
                        CENTER_X + Math.cos(_startRadian + awardRadian / 2) * TEXT_RADIUAS,
                        CENTER_Y + Math.sin(_startRadian + awardRadian / 2) * TEXT_RADIUAS
                    );
                    context.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
                    context.fillText(awards[i].num, -context.measureText(awards[i].num).width / 2, 0);
                    context.restore();

                    _startRadian += awardRadian;  // 每一个奖项所占的起始弧度
                    // -----
                }

                // ----- ④ 绘制指针
                context.save();
                context.beginPath();
                context.moveTo(CENTER_X, CENTER_Y);
                context.lineTo(CENTER_X, CENTER_Y - POINTER_RADIUAS - 30);
                context.lineTo(CENTER_X - POINTER_RADIUAS, CENTER_Y);
                context.closePath();
                context.fillStyle = '#fff790';
                context.fill();
                context.restore();

                context.save();
                context.beginPath();
                context.moveTo(CENTER_X, CENTER_Y);
                context.lineTo(CENTER_X, CENTER_Y - POINTER_RADIUAS - 30);
                context.lineTo(CENTER_X + POINTER_RADIUAS, CENTER_Y);
                context.closePath();
                context.fillStyle = '#feca65';
                context.fill();
                context.restore();

                context.save();
                context.beginPath();
                context.arc(CENTER_X, CENTER_Y, POINTER_RADIUAS,  0, 2 * Math.PI);
                context.fillStyle = '#fff790';
                context.fill();
                context.restore();

                context.save();
                context.beginPath();
                context.arc(CENTER_X, CENTER_Y, POINTER_RADIUAS - 15,  0, 2 * Math.PI);
                context.fillStyle = '#feca65';
                context.fill();
                context.restore();

                // #88411f
                context.save();
                context.font = 'bold 20px Helvetica, Arial';
                context.fillStyle = '#88411f';
                // context.translate(CENTER_X -16 , CENTER_Y -16);
                // context.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
                context.fillText(isStop ? '开始' : '停止', CENTER_X -20 , CENTER_Y + 6);
                context.restore();
                // -----
            },
            rotateWheel() {
                // console.log('转');
                let {startRadian, spinTotalTime, spinningChange, spinningTime, isStop} = this;
                // 当 当前时间 大于 总时间，停止旋转，并返回当前值

                if (spinningTime >= spinTotalTime || isStop) {
                    this.drawRouletteWheel();
                    console.log(this.getValue());
                    this.isStop = true;
                    return
                }
                spinningTime += 20;

                let _spinningChange = (spinningChange - this.easeOut(spinningTime, 0, spinningChange, spinTotalTime)) * (Math.PI / 180);
                startRadian += _spinningChange;

                this.drawRouletteWheel();
                this.spinningTime = spinningTime;
                this.startRadian = startRadian;
                window.requestAnimationFrame(this.rotateWheel);
            },
            easeOut(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            getValue() {
                let {startRadian, awardRadian, pointerAngle, awards} = this;
                let startAngle = startRadian * 180 / Math.PI;      // 弧度转换为角度
                let awardAngle = awardRadian * 180 / Math.PI;

                // pointerAngle = 90,                              // 指针所指向区域的度数，该值控制选取哪个角度的值
                let overAngle = (startAngle + pointerAngle) % 360;  // 无论转盘旋转了多少圈，产生了多大的任意角，我们只需要求到当前位置起始角在360°范围内的角度值
                let restAngle = 360 - overAngle;                   // 360°减去已旋转的角度值，就是剩下的角度值

                let restRadian = restAngle / 360;
                let sum = 0;
                for (let i = 0, len = awards.length; i < len; i++) {
                    let temp = awards[i];
                    sum += temp.prob;
                    if(sum >= restRadian) {
                        this.showWords = temp.num;
                        this.toShowModal();
                        return temp.num;
                    }
                }
            },
            handle() {
                if(this.showModal) {
                    this.hideModal();
                    return;
                }
                this.isStop ? this.start() : this.stop();
            },
            start() {
                // console.log('start');
                this.spinningTime = 0;                                // 初始化当前时间
                this.spinTotalTime = Math.random() * 3 + this.duration;    // 随机定义一个时间总量
                this.spinningChange = Math.random() * 10 + this.velocity;  // 随机顶一个旋转速率
                this.isStop = false;
                this.rotateWheel();
            },
            stop() {
                this.isStop = true;
            },
            hideModal() {
                this.showModal = false;
            },
            toShowModal() {
                this.showModal = true;
            },
        },
        mounted() {
            this.init();

            this.$nextTick(() => {

            })
        }
    };
</script>

<style scoped>
    .clock {
        display: block;
        width: 70px;
        height: 70px;
        background: url(/static/asset/image/clock.png) no-repeat center;
        background-size: 35px;
    }
    .logo_eng {
        display: block;
        width: 150px;
        height: 81px;
        background: url(/static/asset/image/logo_eng.png) no-repeat;
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
</style>
