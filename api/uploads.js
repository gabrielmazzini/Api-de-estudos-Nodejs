const multerConfig = require('../config/multer')
const mongoose = require('mongoose')
const Upload = require('../models/upload_models')
const multer = require('multer')

module.exports = app => {

    const upload = async (req, res) => {
       
        try {
            const { originalname: name, size, filename: key} = req.file

            const up = await Upload.create({
                name,
                size,
                key,
                url: ''
            })

            return res.status(200).json(up)

        } catch {

            return res.status(500).json({msg: "Error on server"})
        }
    }

    return { upload }
}

