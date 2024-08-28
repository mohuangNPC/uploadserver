const core = require('@actions/core');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

try {
    const upload_url = core.getInput('upload_url');
    const upload_file = core.getInput('upload_file');
    // //信息文件，可选，包含这次上传文件的信息
    const info_file = core.getInput('info_file');
    // //可选，上传文件的鉴权token
    const token = core.getInput('token');
    console.log('upload_url', upload_url);
    console.log('upload_file', upload_file);
    // 读取文件
    const file = fs.createReadStream(upload_file);
    const form = new FormData();
    form.append('file', file);
    if(info_file !== undefined && info_file !== ''){
        console.log("有信息文件")
        form.append('info_file', fs.createReadStream(info_file));
    }else{
        console.log("没有信息文件")
    }
    axios.post(upload_url, form, {
        headers: {
            'Authorization': token,
        }
    }).then(response => {
        console.log('File uploaded successfully:', response.data);
        core.setOutput('result', 'File uploaded successfully');
    }).catch(error => {
        core.setFailed(`File upload failed: ${error.message}`);
    });
} catch (error) {
    core.setFailed(error.message);
}