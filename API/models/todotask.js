  //get the database connection
  let connexion = require('../config/db');

// calss todoTask for task 
class todoTask{

    /**  Method get tasks */
       //this methode get tasks
        static get(input,CallBack){
            connexion.query("SELECT * from todotask  WHERE idToDoSpace =?", [input], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                     CallBack(result); //send data
                }
            });

        }
    /**  Method get tasks end */

    /**  Method add tasks begin */
       //this methode to add new task
        static add(inputs,CallBack){
            //insert new task in data base
            connexion.query("INSERT INTO todotask (toDoTaskTitle, toDoTask, idToDoSpace) VALUES (?,?,?)", [inputs.toDoTaskTitle,inputs.toDoTask,inputs.idToDoSpace], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                     CallBack(result.insertId); //data inserted
                }
            });

        }
    /**  Method add tasks end */
    
    /**  Method update task begin */
       //this methode to update task
       static update(inputs,CallBack){
            //update task in data base
            connexion.query("UPDATE todotask SET toDoTaskTitle=? AND toDoTask=? WHERE (idToDoTask =?) ", [inputs.toDoTaskTitle,inputs.toDoTask, inputs.id], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                    CallBack("donne"); //data updated
                }
            });

        }
    /**  Method update task end */
    
    /**  Method delete task begin */
       //this methode to update task
       static delete(input,CallBack){
            //delete space in data base
            connexion.query("DELETE FROM todotask WHERE (idToDoTask =?) ", [input], (err, result) => {
                if (err) {
                    CallBack("error");
                } else {
                    CallBack("donne"); //data deleted
                }
            });

        }
    /**  Method delete task end */

}

module.exports = todoTask;