var express = require('express');
var router = express.Router();


/*logout begin*/
router.get('/', (request, response) => {
    request.session.destroy(err => {
        if (err) {
            //return a json object
            response.json({
                success : false,
                msg : 'There is a problem to deconnect!!',
                resultes : ''
            });
        }
        response.clearCookie("SESS_NAME")
        //return a json object
        response.json({
            success : true,
            msg : 'Deconnected!!',
            resultes : ''
        });
    });
});
/*logout end*/


module.exports = router;