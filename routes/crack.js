const express = require('express');
const multer = require('multer');
const path = require("path")
const tools = require("../tools/tools")

const upload = multer({
    storage: tools.uploadCrackJsStorage("libs"),
    fileFilter: tools.uploadCrackJsFilter
}).single("file");
const router = express.Router();

router.use("/import", function (req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.send({ message: err.toString(), status: 500 })
        } else if (err) {
            res.send({ message: err.toString(), status: 500 })
        }
        next()
    })
})

// [post]    req.body ==> {"crackModule":"xxxx","params":[xx,xx,xx]}
// [success] res.json ==> {"data":{},status:200} 
// [fail]    res.json ==> {"message":"xxxx",status:500}
router.post("/crack", function (req, res) {
    let module_ = req.body.crackModule;
    let params = req.body.param;
    try {
        console.log(`the module being used is ${module_}`);
        let decrypt = req.app.settings[module_];
        if(!decrypt){
            decrypt = tools.exportCrackJsParameter("libs",module_).decrypt;
        }
        decryptPlain = decrypt.apply(null, params)
        res.json({ "data": decryptPlain, status: 200 })
    } catch (e) {
        res.json({ "message": e.toString(), status: 500 })
    }
})

// upload javascript file
router.post("/import", function (req, res) {
    let filename = path.parse(req.file.originalname).name;
    let module = tools.exportCrackJsParameter("libs", req.file.originalname)
    req.app.settings[filename] = module.decrypt;
    res.send({ message: `${req.file.filename} uploaded successfully`, status: 200 })
})

// test upload file api
router.get("/exploer", function (req, res) {
    res.render("index")
})


module.exports.router = router;
