var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');


/*liste shared spaces begin*/
router.get('/', (request, response) => {
    require("../models/todosharedspace").get(jwt.decode(request.headers.authorization, toString(new Date())), (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to get your shared spaces',
                resultes : ''
            });
        }else {
            //return a json object
            response.json({
                success : true,
                msg : '',
                resultes : resp
            });
        }
    });
});
/*liste space end*/


/*liste  user begin*/
router.get('/:id', (request, response) => {
    require("../models/todosharedspace").getUser(request.params.id, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to get your space guests',
                resultes : ''
            });
        }else {
            //return a json object
            response.json({
                success : true,
                msg : '',
                resultes : resp
            });
        }
    });
});
/*liste users end*/


/*add begin*/
router.post('/add', (request, response) => {
    require("../models/todosharedspace").add({id:request.body.id,email : request.body.email, me : jwt.decode(request.headers.authorization, toString(new Date()))}, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to add new guest!!',
                resultes : ''
            });
        }else if(resp == 'notExist'){
            //return a json object
            response.json({
                success : false,
                msg : 'This email does not existed!!',
                resultes : ''
            });
        }else {
            //return a json object
            response.json({
                success : true,
                msg : '',
                resultes : resp
            });
        }
    });
});
/*add end*/

/*delete begin*/
router.delete('/delete/:id', (request, response) => {
    require("../models/todosharedspace").delete(request.params.id, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to delete guest!!',
                resultes : ''
            });
        }else {
            //return a json object
            response.json({
                success : true,
                msg : 'The guest deleted by success',
                resultes : ''
            });
        }
    });
});
/*delete end*/


module.exports = router;