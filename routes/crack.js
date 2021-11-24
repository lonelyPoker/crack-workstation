const express = require('express');
const fs = require('fs')
const router = express.Router();



router.get("/crack", function (req, res) {
    let encrypt = req.query.encrypt
    res.send(dispatch.decrypt(encrypt))
})
// 上传JS
router.post("/import", function (req, res) {
    console.log(req.files[0]);  // 上传的文件信息
    var des_file = __dirname + "/" + req.files[0].originalname; //文件名
    fs.readFile(req.files[0].path, function (err, data) {  // 异步读取文件内容
        fs.writeFile(des_file, data, function (err) { // des_file是文件名，data，文件数据，异步写入到文件
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
})

module.exports.router = router;
