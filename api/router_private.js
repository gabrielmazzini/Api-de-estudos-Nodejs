const User = require('../models/user_models')

module.exports = app => {

        // Rota Privada
        const routePrivate =  async (req, res) => {
        const id = req.params.id
        
        const user = await User.findById(id, '-password')
    
        if (!user) {
           return res.status(404).json({msg: "User not found!"})
        }
    
           return res.status(200).json({ user })
        }

        return { routePrivate }
}        
