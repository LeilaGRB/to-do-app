var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');


/*liste space begin*/
router.get('/', (request, response) => {
    require("../models/todospace").get(jwt.decode(request.headers.authorization, toString(new Date())), (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to get spaces task',
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

/*add begin*/
router.post('/add', (request, response) => {
    require("../models/todospace").add({id: jwt.decode(request.headers.authorization, toString(new Date())),spaceName:request.body.spaceName}, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to add new space!!',
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

/*update begin*/
router.put('/update', (request, response) => {
    require("../models/todospace").update(request.body, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to update space!!',
                resultes : ''
            });
        }else {
            //return a json object
            response.json({
                success : true,
                msg : 'Task space updated bu success',
                resultes : ''
            });
        }
    });
});
/*update end*/

/*delete begin*/
router.delete('/delete/:id', (request, response) => {
    require("../models/todospace").delete(request.params.id, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to delete space!!',
                resultes : ''
            });
        }else {
            //return a json object
            response.json({
                success : true,
                msg : 'Task space deleted bu success',
                resultes : ''
            });
        }
    });
});
/*delete end*/


module.exports = router;