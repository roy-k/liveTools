/**
 * Created by roy on 2018/3/9.
 */

import axios from 'axios'

// 1. 获取文件夹

const getFileTags = function(params) {
    return axios.get('/api/getFileTag')
};

const getDirFiles = function(dir) {
    return axios.get(`/api/getFiles/${dir}`)
};

const deleteFiles = function(fileName) {
    return axios.delete(`/api/delFile/${fileName}`)
};

export {
    getFileTags,
    getDirFiles,
    deleteFiles,
};

// 2. 生成分类选择数组
// [{value: v.Fid, label: v.Ftitle}]

// const generateCategoryOptions = async function() {
//     const {categorys} = await getCategory({page_size: 20});
//     // console.log('await cates', categorys);
//     const arr = [{value: '', label: '请选择'}];
//     return categorys.reduce(function(s, v) {
//         s.push({
//             value: v.Fid,
//             label: v.Ftitle
//         });
//         return s;
//     }, arr);
// };
// exports.generateCategoryOptions = generateCategoryOptions;
//
// // 3. 获取已关联标签
// //
//
// exports.getAssociationTags = function(params) {
//
// };
