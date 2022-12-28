
module.exports = app => {
    app.route('/registers')
        .post(app.api.register.save)  

    app.route('/users/login')
        .post(app.api.login.logar)

    app.route('/user/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.router_private.routePrivate)

    app.route('/forgot_password')
        .post(app.api.forgotPassword.forgotPass)

    app.route('/reset_password')
        .post(app.api.router_resetPass.resetPass)

    app.route('/delete_user/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.delete_user.delet)

    app.route('/upload')
        .all(app.config.passport.authenticate())
        .post(app.config.multer.configMulter())
        .post(app.api.uploads.upload)

    app.route('/delete_uploads/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.delete_uploads.delete_upload)
            
}
