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
        </div>
    </div>
</template>
<script>

    import {getFileTags, getDirFiles} from '../../api/images'


    export default {
        data() {
            return {
                formData: {
                    dir: 'other',
                },
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
                            trigger: 'blur'
                        }
                    ],
                },
                columns: [
                    {
                        title: 'No',
                        key: 'index'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '地址',
                        key: 'address'
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
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteImg(params.row)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                listData: [],
            };
        },
        methods: {
            getTags() {
                getFileTags().then(({data}) => {
                    this.tagList = data || [];
                    // console.log('res', data);
                })
            },
            queryData() {
                const {dir} = this.formData;
                getDirFiles(dir).then(({data}) => {
                    this.listData = data.map((address, index) => {
                        return {
                            index,
                            address,
                        }
                    })
                    console.log('res', res);
                })
            },
            deleteImg(item) {
                console.log(item);
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
