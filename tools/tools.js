
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
        cb(null, true)
    } else {
        cb(new Error(`Only files with the extension .js will be accepted, ${file.originalname} failed to upload.`))
    }
}

// export Crack JS file Parameter

function exportCrackJsParameter(moduleDirectory, moduleName) {
    let moduleFolder = path.join(path.dirname(__dirname), moduleDirectory, moduleName);
    let library = require(moduleFolder);
    return library;
}

module.exports = {
    uploadCrackJsStorage,
    uploadCrackJsFilter,
    exportCrackJsParameter
};