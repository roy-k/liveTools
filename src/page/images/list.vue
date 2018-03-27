<template>
    <div>
        <div style="padding: 5px;text-align: left;">
            <Form ref="formInline" :model="formData" label-position="left" :rules="ruleInline" inline>
                <FormItem prop="user">
                    <Select v-model="formData.dir" style="width:200px">
                        <Option v-for="item in tagList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="success" @click="queryData">查询</Button>
                </FormItem>
            </Form>
        </div>
        <div>
            <Table stripe :columns="columns" :data="listData"></Table>
            <Modal title="View Image" v-model="visible">
                <img :src="viewSrc" v-if="visible" style="width: 100%">
            </Modal>
        </div>
    </div>
</template>
<script>

    import {getFileTags, getDirFiles, deleteFiles} from '../../api/images';

    export default {
        data() {
            return {
                formData: {
                    dir: 'other',
                },
                visible: false,
                viewSrc: '',
                tagList: [],
                formInline: {
                    user: '',
                    password: '',
                },
                ruleInline: {
                    dir: [
                        {
                            required: true,
                            message: '请选择标签',
                            trigger: 'blur',
                        },
                    ],
                },
                columns: [
                    {
                        title: 'No',
                        key: 'index',
                        width: 100,
                    },
                    {
                        title: '预览',
                        key: 'img',
                        render: (h, {row}) => {
                            return h('img', {
                                attrs: {
                                    src: row.address,
                                    // src: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                                },
                                style: {
                                    height: '40px'
                                },
                                on: {
                                    click: () => {
                                        this.viewSrc = row.address;
                                        this.visible = true;
                                    },
                                },
                            });
                        },
                    },
                    {
                        title: '名称',
                        key: 'name',
                    },
                    {
                        title: '地址',
                        key: 'address',
                        width: 500,
                    },
                    {
                        title: '操作',
                        key: 'control',
                        render: (h, params) => {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.show(params.index)
                                //         }
                                //     }
                                // }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteImg(params.row);
                                        },
                                    },
                                }, 'Delete'),
                            ]);
                        },
                    },
                ],
                listData: [],
            };
        },
        methods: {
            getTags() {
                getFileTags().then(({data}) => {
                    this.tagList = data || [];
                    // console.log('res', data);
                });
            },
            queryData() {
                const {dir} = this.formData;
                getDirFiles(dir).then(({data}) => {
                    if (!data.length) {
                        this.$Notice.info({
                            title: '提示',
                            desc: '无结果',
                        });
                    }
                    this.listData = data.map((address, index) => {
                        return {
                            index,
                            address,
                        };
                    });
                    // console.log('res', res);
                }, (err) => {
                    this.$Notice.error({
                        title: '查询错误',
                        desc: err
                    })
                });
            },
            deleteImg({address}) {
                console.log(address);
                const path = address.split('/').slice(-2).join('/');
                // console.log(path);
                deleteFiles(path).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        this.$Notice.success({
                            title: '操作成功',
                            desc: '删除图片成功',
                        });
                        this.queryData();
                    } else {
                        this.$Notice.error({
                            title: '操作失败',
                            desc: res.data,
                        });
                    }
                });
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            },
        },
        created() {
            this.getTags();
        },
    };
</script>
