const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const { hash } = require('bcrypt')

    module.exports = app => {
    
    const multerConfig = {

    dest: path.resolve(__dirname, '../tmp/uploads'),

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '../tmp/uploads'))
        }
    }),

    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if(err) cb(err)
            const fileName = `${hash.toString('hex')}`-`${file.originalname}`

            cb(null, fileName)
        }) 
    },

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        const allWedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ]
        
        if(allWedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type"))
            }
        },
    }

       return {

        configMulter: () => multer(multerConfig).single('file')
        
       }
}


