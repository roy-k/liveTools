<template>
    <div>
        <!--<h1>lucky wheel</h1>-->
        <canvas id="canvas" width="600" height="600">
            浏览器版本过低, 不支持canvas
        </canvas>

        <div class="noselect">请使用 空格 / 鼠标点击</div>

        <vue-modal
            v-model="showModal"
            :backdrop="false"
        >
            <div class="modal-4">
                <h2>Congratulations 😊</h2>
                <h1>{{showWords}}</h1>
                <a @click="hideModal" class="button red">close</a>
            </div>
        </vue-modal>
    </div>
</template>

<script>

const awards= [ '大保健', '话费10元', '话费20元', '话费30元', '保时捷911', '火星7日游']

    export default {
        name: 'lucky-wheel',
        data() {
            return {
                showModal: false,
                canvas: null,
                context: null,
                showWords: '',

                OUTSIDE_RADIUAS: 200,   // 转盘的半径
                INSIDE_RADIUAS: 0,      // 用于非零环绕原则的内圆半径
                TEXT_RADIUAS: 160,      // 转盘内文字的半径

                CENTER_X: 300,  // todo
                CENTER_Y: 300,

                awards,

                startRadian: 0,
                awardRadian: (Math.PI * 2) / awards.length,
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
                let {canvas, context, OUTSIDE_RADIUAS, INSIDE_RADIUAS, TEXT_RADIUAS, CENTER_X, CENTER_Y, awards, startRadian, awardRadian, isStop} = this;
                // ----- ① 清空页面元素，用于逐帧动画
                context.clearRect(0, 0, canvas.width, canvas.height);
                // -----

                for (let i = 0; i < awards.length; i ++) {
                    let _startRadian = startRadian + awardRadian * i,  // 每一个奖项所占的起始弧度
                        _endRadian =   _startRadian + awardRadian;     // 每一个奖项的终止弧度

                    // ----- ② 使用非零环绕原则，绘制圆盘
                    context.save();
                    if (i % 2 === 0) context.fillStyle = '#FF6766'
                    else             context.fillStyle = '#FD5757';
                    context.beginPath();
                    context.arc(canvas.width / 2, canvas.height / 2, OUTSIDE_RADIUAS, _startRadian, _endRadian, false);
                    context.arc(canvas.width / 2, canvas.height / 2, INSIDE_RADIUAS, _endRadian, _startRadian, true);
                    context.fill();
                    context.restore();
                    // -----

                    // ----- ③ 绘制文字
                    context.save();
                    context.font = 'bold 16px Helvetica, Arial';
                    context.fillStyle = '#FFF';
                    context.translate(
                        CENTER_X + Math.cos(_startRadian + awardRadian / 2) * TEXT_RADIUAS,
                        CENTER_Y + Math.sin(_startRadian + awardRadian / 2) * TEXT_RADIUAS
                    );
                    context.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
                    context.fillText(awards[i], -context.measureText(awards[i]).width / 2, 0);
                    context.restore();
                    // -----
                }

                // ----- ④ 绘制指针
                context.save();
                context.beginPath();
                context.moveTo(CENTER_X, CENTER_Y);
                context.lineTo(CENTER_X, CENTER_Y - 70);
                context.lineTo(CENTER_X - 40, CENTER_Y);
                context.closePath();
                context.fillStyle = '#fff790';
                context.fill();
                context.restore();

                context.save();
                context.beginPath();
                context.moveTo(CENTER_X, CENTER_Y);
                context.lineTo(CENTER_X, CENTER_Y - 70);
                context.lineTo(CENTER_X + 40, CENTER_Y);
                context.closePath();
                context.fillStyle = '#feca65';
                context.fill();
                context.restore();

                context.save();
                context.beginPath();
                context.arc(CENTER_X, CENTER_Y, 50,  0, 2 * Math.PI);
                context.fillStyle = '#fff790';
                context.fill();
                context.restore();

                context.save();
                context.beginPath();
                context.arc(CENTER_X, CENTER_Y, 40,  0, 2 * Math.PI);
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
                let {startRadian, awardRadian, duration, velocity, spinTotalTime, spinningChange, pointerAngle} = this;
                let startAngle = startRadian * 180 / Math.PI;      // 弧度转换为角度
                let awardAngle = awardRadian * 180 / Math.PI;

                // pointerAngle = 90,                              // 指针所指向区域的度数，该值控制选取哪个角度的值
                let overAngle = (startAngle + pointerAngle) % 360;  // 无论转盘旋转了多少圈，产生了多大的任意角，我们只需要求到当前位置起始角在360°范围内的角度值
                let restAngle = 360 - overAngle;                   // 360°减去已旋转的角度值，就是剩下的角度值

                let index = Math.floor(restAngle / awardAngle);     // 剩下的角度值 除以 每一个奖品的角度值，就能得到这是第几个奖品

                console.log('rest', restAngle);
                this.showWords = this.awards[index];
                this.toShowModal();
                // return this.awards[index];

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
    .modal-4 {
        border: 1px solid #fff;
        padding: 3em;
        border-radius: 1em;
        background: #feca65;
        margin-top: -200px;
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
