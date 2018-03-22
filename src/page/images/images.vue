<template>
    <div>
        <div style="width: 300px;margin: 0 auto;">
            <Upload
                multiple
                type="drag"
                :action="url">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>Click or drag files here to upload</p>
                </div>
            </Upload>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'images',
        components: {
        },
        data() {
            return {
                show: true,
                list: [],
                params: {
                    token: '22222',
                    name: 'img',
                },
                url: '/upload'
            }
        },
        watch: {

        },
        methods: {
            imageuploaded() {

            }
        },
        mounted() {

        },
        created() {

        },
        beforeDestroy() {

        },
    };
</script>

<style scoped>
    canvas {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
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
        right: 30px;
        bottom: 0px;
        /*margin-top: 100px;*/
    }
    .botS {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
