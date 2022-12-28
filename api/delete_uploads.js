const Upload = require('../models/upload_models')

module.exports = app => {
    const delete_upload = async (req, res) => {
        const id = req.params.id 
        const uploads = await Upload.findById(id)

        if(!uploads) {
            return res.status(404).json({msg: "file not exist!"})
        }

        try{ 
            const user = Upload.deleteOne({ id }, (err) => {
                if(err) return res.status(400).json({ msg: "Error: File not deleted"})
            })
    
             return res.status(200).json({ msg: "File deleted successfully"})

         } catch {
            return res.status(500).json({ msg: "server error"})
         }
    }

    return { delete_upload }
}