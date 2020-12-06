var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');

/*update profile data begin*/
router.put('/updateProfile', (request, response) => {
    require("../models/user").profilDataUpdate({id :jwt.decode(request.headers.authorization, toString(new Date())),nom:request.body.nom,prenom:request.body.prenom,email:request.body.email}, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to update profil data!!',
                resultes : ''
            });
        }else {
            //return a json object
            response.json({
                success : true,
                msg : 'The profil is updated by success',
                resultes : ''
            });
        }
    });
});
/*update profil data end*/

/*update password begin*/
router.put('/updatePassword', (request, response) => {
    require("../models/user").profilPasswordUpdate({id :jwt.decode(request.headers.authorization, toString(new Date())),password:request.body.password}, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to update pasword!!',
                resultes : ''
            });
        }else {
            //return a json object
            response.json({
                success : true,
                msg : 'The password is updated by success',
                resultes : ''
            });
        }
    });
});
/*update password end*/

module.exports = router;