<template>
    <div style="margin: 5px 0;">
        <span class="switch-label" @click="change">{{label}}</span>
        <span @click="change" :class="['switch-bg', {'active': isSelect}]">
            <span :class="['switch-btn', {'switch-active': isSelect}]"></span>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'switchBar',
        props: {
            label: {
                type: String,
            },
            value: {
                required: true,
                type: Boolean
            }
        },
        data() {
            return {
                isSelect: this.value,
            }
        },
        methods: {
            change() {
                this.isSelect = !this.isSelect;
                // this.value
                this.$emit('input', this.isSelect);
            }
        }
    };
</script>

<style scoped lang="stylus">
    .switch-label
        display inline-block
        height: 20px
        line-height: 20px
        vertical-align: top
        margin-right: 5px
    .switch-bg
        position: relative
        display: inline-block
        width: 40px
        height: 20px
        background-color: #ccc
        border: 1px solid #ccc
        border-radius: 10px
        outline: none
        transition: border-color .3s, background-color .3s
        &.active
            background-color: #13ce66
    .switch-btn
        position: absolute
        top: 1px
        left: 1px
        border-radius: 100%
        transition: transform .3s
        width: 16px
        height: 16px
        background-color: #fff
    .switch-active
        transform: translate3d(20px, 0px, 0px)
</style>
