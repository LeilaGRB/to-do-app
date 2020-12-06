  //get the database connection
  let connexion = require('../config/db');

// calss todoSharedSpace for space shared
class todoSharedSpace{

    /**  Method get spaces chared */
       //this methode get spaces chared
        static get(input,CallBack){

            //insert new space in data base
            connexion.query("SELECT sharedspace.idSpace as id,todospaces.spaceName from sharedspace JOIN todospaces ON  sharedspace.idSpace= todospaces.idToDoSpace WHERE sharedspace.idGuest =?", [input], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                     CallBack(result); //send data
                }
            });

        }
    /**  Method get spaces chared end */

    /**  Method get user of spaces chared */
       //this methode get user of spaces chared
        static getUser(input,CallBack){

            //insert new space in data base
            connexion.query("SELECT users.email,users.nom,users.prenom, sharedspace.idSharedSpace as id from users JOIN sharedspace ON  sharedspace.idGuest= users.idUser WHERE sharedspace.idSpace =?", [input], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                     CallBack(result); //send data
                }
            });

        }
    /**  Method get user of spaces chared end */

    /**  Method get guests of spaces shared */
       //this methode get guests of spaces shared
        static getGuest(input,CallBack){

            //insert new space in data base
            connexion.query("SELECT todotask.toDoTaskTitle,todotask.toDoTask  from sharedspace JOIN todotask ON  sharedspace.idSpace= todotask.idToDoSpace WHERE sharedspace.idSpace =?", [input], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                     CallBack(result); //send data
                }
            });

        }
    /**  Method get guests of spaces shared end */

    /**  Method add guest begin */
       //this methode to add new guest
        static add(inputs,CallBack){
            connexion.query("SELECT * from users WHERE email =? AND idUser <> ?", [inputs.email,inputs.me], (err, result) => {
                if (err) {
                    CallBack("error");
                }else if (result.length === 0) {
                    CallBack("notExist"); // si the email exist 
                }else {
                    //insert new guest in data base
                    connexion.query("INSERT INTO sharedspace (idGuest, idSpace) VALUES (?,?)", [result[0].idUser,inputs.id], (err, res) => {
                        if (err) {
                            CallBack("error");
                        } else {
                             CallBack({id:res.insertId,nom:result[0].nom,prenom:result[0].prenom}); //data inserted
                        }
                    });
                }
            });

        }
    /**  Method add tasks end */
    
    /**  Method delete Guest begin */
       //this methode to update guest
       static delete(input,CallBack){
            //delete guest in data base
            connexion.query("DELETE FROM sharedspace WHERE (idSharedSpace =?) ", [input], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                    CallBack("donne"); //data deleted
                }
            });

        }
    /**  Method delete guest end */

}

module.exports = todoSharedSpace;