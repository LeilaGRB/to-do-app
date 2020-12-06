  //get the database connection
  let connexion = require('../config/db');

// calss todoSpace for task space
class todoSpace{

    /**  Method get space begin */
       //this methode get spaces
        static get(input,CallBack){

            connexion.query("SELECT idToDoSpace as id, spaceName from todospaces  WHERE editorId =?", [input], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                     CallBack(result); //send data
                }
            });

        }
    /**  Method get space end */

    /**  Method add space begin */
       //this methode to add new space
        static add(inputs,CallBack){
            //insert new space in data base
            connexion.query("INSERT INTO todospaces (editorId, spaceName) VALUES (?,?)", [inputs.id, inputs.spaceName], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                     CallBack(result.insertId); //data inserted
                }
            });

        }
    /**  Method add space end */
    
    /**  Method update space begin */
       //this methode to update space
       static update(inputs,CallBack){
            //update space in data base
            connexion.query("UPDATE todospaces SET spaceName=? WHERE (idToDoSpace =?) ", [inputs.spaceName, inputs.id], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                    CallBack("donne"); //data updated
                }
            });

        }
    /**  Method update space end */
    
    /**  Method delete space begin */
       //this methode to update space
       static delete(input,CallBack){
            //delete space in data base
            connexion.query("DELETE FROM todospaces WHERE (idToDoSpace =?) ", [input], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                    CallBack("donne"); //data deleted
                }
            });

        }
    /**  Method delete space end */

}

module.exports = todoSpace;