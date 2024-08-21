const core = require('@actions/core');
const fs = require('fs');
const axios = require('axios');

try {
    const upload_url = core.getInput('upload_url');
    const upload_file = core.getInput('upload_file');
    // 读取文件
    const file = fs.createReadStream(upload_file);
    const form = new FormData();
    form.append('file', file);
    axios.post(upload_url, form, {
    }).then(response => {
        console.log('File uploaded successfully:', response.data);
        core.setOutput('result', 'File uploaded successfully');
    }).catch(error => {
        core.setFailed(`File upload failed: ${error.message}`);
    });
} catch (error) {
    core.setFailed(error.message);
}