  //get the database connection
let connexion = require('../config/db');
  // sha1 to clank the password
var sha1 = require('sha1');

// calss user for all user data ( insert, update, delete and also authentification)
class user{

    /**  Method singUp begin */
       //this methode to creat new user
        static singUp(inputs,CallBack){

            //check if the email does not exist
            connexion.query("SELECT * FROM users WHERE email =? ", [inputs.email], (err, result) => {
                if (err) {
                    CallBack("error");
                } else if (typeof result[0] !== "undefined" && result[0].email === inputs.email) {
                     CallBack("exist"); // si the email exist 
                } else {
                    //clank the password
                    let password = sha1(inputs.password);
                    //if the email does not exist we crate new user 
                    connexion.query("INSERT INTO users (nom, prenom, email, password) VALUES (?,?,?,?)", [inputs.nom, inputs.prenom, inputs.email, password], (err, result) => {
                        if (err) {
                            CallBack('error');
                        }else{
                            CallBack(result.insertId);
                        }
                    });
                }
            });

        }
    /**  Method singUp end */

    /**  Method singIn begin */
       //this methode to connect and get user profile data
       static singIn(inputs,CallBack){

            //check if is the right user and get their profil data
            connexion.query("SELECT idUser,nom,prenom,email FROM users WHERE email =? AND password =? ", [inputs.email, sha1(inputs.password)], (err, result) => {
                if (err) {
                    //if is not the right user o wrong data ro error in serveur
                    CallBack("error");
                } else {
                    //if is the right user 
                    CallBack(result[0]);
                } 
            });

        }
    /**  Method singIn end */

    /**  Method profilDataUpdate begin */
       //this methode to update profil data (name , adress)
        static profilDataUpdate(inputs,CallBack){

            //update profile name and email
            connexion.query("UPDATE users SET nom=? AND prenom=? AND email=? WHERE (idUser =?) ", [inputs.nom, inputs.prenom, inputs.email, inputs.id], (err, result) => {
                if (err) {
                    //if data not updated
                    CallBack("error");
                } else {
                    //if data  updated
                    CallBack('donne');
                } 
            });

        }
    /**  Method profilDataUpdate end */

    /**  Method profilPasswordUpdate begin */
        //this methode to update password
        static profilPasswordUpdate(inputs,CallBack){

            //update the user password
            connexion.query("UPDATE users SET password=? WHERE (idUser =?) ", [sha1(inputs.password),inputs.id], (err, result) => {
                if (err) {
                    //if data not updated
                    CallBack("error");
                } else {
                    //if data  updated
                    CallBack('donne');
                } 
            });

        }
    /**  Method profilPasswordUpdate end */

    /**  Method profilAvatarUpdate begin */
        //this methode to update profil avatar
        static profilAvatarUpdate(inputs,CallBack){

            //update profile avatar
            connexion.query("UPDATE users SET avatar=? WHERE (idUser =?) ", [inputs.avatar, inputs.id], (err, result) => {
                if (err) {
                    //if data not updated
                    CallBack("error");
                } else {
                    //if data  updated
                    CallBack('donne');
                } 
            });

        }
    /**  Method profilAvatarUpdate end */

}

module.exports = user;