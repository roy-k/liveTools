<template>
    <div>
        <div>
            <div style="position: absolute;width: 150px;top: 20px;">
                <div class="formItem">
                    <AutoComplete
                        v-model="formData.newTag"
                        :data="tagList"
                        @on-search=""
                        placeholder="new tag"
                    ></AutoComplete>
                </div>
                <div class="formItem">
                    <Dropdown @on-click="selectTag">
                        <a href="javascript:void(0)">
                            <span>{{formData.tag || '请选择'}}</span>
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="item in tagList" :name="item" :key="item">{{item}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div style="margin-left: 160px;">
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="uploadList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"

                    multiple
                    type="drag"
                    :action="url">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                    </div>
                </Upload>
                <div style="padding-top: 5px;">
                    <div class="demo-upload-list" v-for="item in uploadList">
                        <div v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                            <span>{{item.name}} :</span>
                            <span>{{item.url}}</span>
                            <Icon style="cursor: pointer;vertical-align: -3px;" type="clipboard" size="28" @click.native="copyUrl(item.url)"></Icon>
                        </div>
                        <div v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </div>
                    </div>
                </div>
                <Modal title="View Image" v-model="visible">
                    <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {getFileTags} from '../../api/images'

    export default {
        name: 'images',
        components: {
        },
        data() {
            return {
                defaultList: [
                    // {
                    //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                    //     status: ''
                    // },
                ],
                imgName: '',
                visible: false,
                uploadList: [],

                formData: {
                    tag: '',
                    newTag: '',
                },
                tagList: [],

                show: true,
                list: [],
                params: {
                    token: '22222',
                    name: 'img',
                },
            }
        },
        watch: {
        },
        computed: {
            url() {
                const pre = '/api/upload/picture/';
                return `${pre}${this.formData.newTag || this.formData.tag || 'other'}`
            }
        },
        methods: {
            selectTag(tag) {
                this.formData.tag = tag
            },
            getTags() {
                getFileTags().then(({data}) => {
                    this.tagList = data || [];
                    // console.log('res', data);
                })
            },
            copyUrl(url) {
                console.log(url);
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file, fileList) {
                console.log('res', res);
                console.log('file', file);
                console.log('fileList', fileList);
                if(res.success) {
                    file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                    // file.url = res.data.url;
                    file.name = res.data.originalName;
                    this.uploadList.push(file);
                }
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                return true;
                // const check = this.uploadList.length < 5;
                // if (!check) {
                //     this.$Notice.warning({
                //         title: 'Up to five pictures can be uploaded.'
                //     });
                // }
                // return check;
            },
        },
        mounted() {
            this.$nextTick(() => {
                this.uploadList = this.$refs.upload.fileList;
            })
        },
        created() {
            this.getTags();
        },
        beforeDestroy() {

        },
    };
</script>

<style scoped>
    .ivu-dropdown-item {
        font-size: 14px !important;
    }
    .ivu-dropdown {
        width: 100%;
    }
    .formItem {
        margin: 10px;
    }

    .demo-upload-list{
        /*display: inline-block;*/
        /*width: 60px;*/
        /*height: 60px;*/
        text-align: left;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        /*overflow: hidden;*/
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
        padding: 5px 10px;
    }
    .demo-upload-list img{
        width: 60px;
        height: 60px;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        width: 60px;
        height: 60px;
        margin-left: -64px;
        margin-top: 1px;
        /*top: 0;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: inline-block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
