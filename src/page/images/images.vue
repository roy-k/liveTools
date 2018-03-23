
<template>
    <div class="layout">
        <Layout>
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu
                    @on-select="toggleTab" :active-name="tab"
                    theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="upload">
                        <Icon type="ios-navigate"></Icon>
                        <span>图片上传</span>
                    </MenuItem>
                    <MenuItem name="list">
                        <Icon type="search"></Icon>
                        <span>图片管理</span>
                    </MenuItem>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar"></Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '220px'}">
                    <div v-if="tab==='upload'" style="position: relative;">


                            <UploadFile></UploadFile>

                    </div>
                    <div v-if="tab==='list'">
                        <ListView></ListView>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import UploadFile from './upload'
    import ListView from './list'



    export default {
        data () {
            return {
                tab: 'upload',
                isCollapsed: false,
            };
        },
        created() {
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            toggleTab(tab) {
                console.log('tab', tab);
                this.tab = tab;
            },

        },
        components:{
            UploadFile,
            ListView,
        }
    }
</script>
<style scoped>


    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }
    .ivu-layout.ivu-layout-has-sider{
        height: 100%;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
