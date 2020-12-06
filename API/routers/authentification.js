var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');


/*singUp begin*/
router.post('/singUp', (request, response) => {
    require("../models/user").singUp(request.body, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to creat new compte!!',
                resultes : ''
            });
        }else if(resp == 'exist'){
            //return a json object
            response.json({
                success : false,
                msg : 'This email exit!!',
                resultes : ''
            });
        }else {
            //return a json object
            response.json({
                success : true,
                msg : 'The new compte is created by success',
                resultes : {
                    token : jwt.encode(resp,toString(new Date()))
                }
            });
        }
    });
});
/*singUp end*/

/*singIn begin*/
router.post('/singIn', (request, response) => {
    require("../models/user").singIn(request.body, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to connect!!',
                resultes : ''
            });
        }else {
            //return a json object
            response.json({
                success : true,
                msg : '',
                resultes : {
                    user : {
                        nom : resp.nom,
                        prenom : resp.prenom,
                        email : resp.email,
                    },
                    token : jwt.encode(resp.idUser,toString(new Date()))
                }
            });
        }
    });
});
/*singIn end*/


module.exports = router;