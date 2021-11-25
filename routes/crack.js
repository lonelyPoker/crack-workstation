const express = require('express');
const multer = require('multer');
const tools = require("../tools/tools")
const upload = multer({
    storage: tools.uploadCrackJsStorage("libs"),
    fileFilter: tools.uploadCrackJsFilter
}).single("file")


const router = express.Router();
// router.use(upload)


router.get("/crack", function (req, res) {
    let encrypt = req.query.encrypt
    res.send(dispatch.decrypt(encrypt))
})

// upload javascript file
router.post("/import", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.send({ message: err.toString(), status: 500 })
        } else if (err) {
            res.send({ message: err.toString(), status: 500 })
        }
        res.send({message:`${req.file.filename} uploaded successfully`})
    })
})

router.get("/exploer", function (req, res) {
    res.render("index")
})


module.exports.router = router;
