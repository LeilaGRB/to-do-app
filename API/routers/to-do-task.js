var express = require('express');
var router = express.Router();


/*liste task begin*/
router.get('/:id', (request, response) => {
    require("../models/todotask").get(request.params.id, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to get tasks',
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
/*liste task end*/

/*add begin*/
router.post('/add', (request, response) => {
    require("../models/todotask").add(request.body, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to add new task!!',
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
    require("../models/todotask").update(request.body, (resp) => {
        console.log(resp)
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to update task!!',
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
    require("../models/todotask").delete(request.params.id, (resp) => {
        if(resp == 'error'){
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to delete task!!',
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