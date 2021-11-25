
const multer = require("multer");
const path = require("path")

function uploadCrackJsStorage(directory) {
    return multer.diskStorage({
        destination: function (req, file, cb) {

            cb(null, path.join(path.dirname(__dirname), directory))
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
}
// Only files with the extension .js will be accepted
function uploadCrackJsFilter(req, file, cb) {
    if (path.extname(file.originalname) === ".js") {
        console.log(cb);
        cb(null, true)
    } else {
    cb(new Error(`Only files with the extension .js will be accepted, ${file.originalname} failed to upload.`))
    }
}

module.exports = {
    uploadCrackJsStorage,
    uploadCrackJsFilter
};