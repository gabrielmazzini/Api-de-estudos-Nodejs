const { findOne } = require('../models/user_models')
const User = require('../models/user_models')

module.exports = app => {
    const delet = async (req, res) => {
        const id = req.params.id
        const users = await User.findById(id, '-password')
        
        if(!users) {
            return res.json({ msg: "Error: user not found"})
        }

        try{ 
            const user = User.deleteOne({ id }, (err) => {
                if(err) return res.status(404).json({ msg: "Error: User not deleted"})
            })
    
             return res.status(200).json({ msg: "User deleted successfully"})

         } catch {
            return res.status(500).json({ msg: "server error"})
         }
        
    }

    return { delet }
}