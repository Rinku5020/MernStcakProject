const multer = require('multer')
const fs = require("fs")
const folderCreater =(path,folderName,cb)=>
{
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            cb(null, folderName)
        }
    })
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        let  folderName = "uploads/"
        if (file.fieldname == "profilePic") {
            folderName += "userProfile";
            folderCreater("./uploads/userProfile",folderName,cb)
        }
        else {
            folderName += "blogImage";
            folderCreater("./uploads/blogImage",folderName,cb)
        }

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = upload