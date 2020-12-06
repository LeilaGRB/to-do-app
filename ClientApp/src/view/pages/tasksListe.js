import React,{Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
var TasksTable = require('react-data-components').DataTable;

//this class desplay the task liste
class Tasks extends Component{

    constructor (props) {
        super(props);
        // call methode onChange, whene we change the input value 
        this.onChange = this.onChange.bind(this);
        // call methode onSubmit, whene we click in submit button and all data is right
        this.onSubmit = this.onSubmit.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        //initialise state
        this.state = {
            success : true,
            msg : null,
            toDoTaskTitle:'',
            toDoTask:'',
            tasksListe:[],
            droit :(this.props.location.pathname.split('/')[1]=== "spaces")?true : false,
            redirect:false,
            spaceId:this.props.location.pathname.split('/')[2],
            columns : [
                { title: 'Task title', prop: 'toDoTaskTitle'  },
                { title: 'Task content', prop: 'toDoTask' },
                { title: '', prop: 'idToDoTask' },
            ],
            sweet:''
        }
        //call methoode getTasks to get all tasks for this space
        this.getTasks()
    }
    
    //methode getSpaces 
    async getTasks(){
        try {
            const result = await axios.get(process.env.REACT_APP_SERVERURL+'tasks/'+this.state.spaceId,{headers: {
                authorization: localStorage.getItem('token')
              }});
            this.setState({tasksListe : result.data.resultes})
        } catch (error) {
            //if we have error, display error 
          this.setState({sweet : 'error', msg :'server error to get data'})
        }
    }

    
    //Methode sweetAlert to display a sweetAlert
    sweetAlert(){
  
        if(this.state.sweet === 'donne'){
          //sweetAlert is displaye if we added new space
          return <SweetAlert success title="Success" onConfirm={this.initSweetAlert.bind(this)}>{this.state.msg}</SweetAlert>;
    
        }else if(this.state.sweet === 'error'){
          //sweetAlert is displaye an error
          return <SweetAlert error title="Error :(" onConfirm={this.initSweetAlert.bind(this)}>{this.state.msg}</SweetAlert>;
        
        }else if(this.state.sweet === 'delete'){
          //sweetAlert is displaye to confirme if we want to delete space
          return <SweetAlert  warning showCancel confirmBtnText="Confirm" confirmBtnBsStyle="danger" title="Confirm!!" onConfirm={this.onDelete.bind(this)} onCancel={this.initSweetAlert.bind(this)} focusCancelBtn >You want delete this space ???</SweetAlert>;
    
        }else if(this.state.sweet === 'update'){
            //sweetAlert is displaye to confirme if we want to delete space
            return <SweetAlert  warning showCancel confirmBtnText="Confirm" confirmBtnBsStyle="danger" title="Confirm!!" onConfirm={this.onUpdate.bind(this)} onCancel={this.initSweetAlert.bind(this)} focusCancelBtn >You want update this space ???</SweetAlert>;
      
          }else{
          //no sweetAlert to display
          return <div></div>;
        }
    }
    
    //Methode intSweetAlert to init a sweet value
    initSweetAlert(){
        this.setState({sweet : ''})
    }

    //Methode onChanege used to insert input value in our state value
    onChange(e){
       this.setState( {[e.target.name] : e.target.value});
    }

    //to send the right data to the API for add new space
    async onSubmit(e){
        e.preventDefault()
            try {
                const result = await axios.post(process.env.REACT_APP_SERVERURL+'tasks/add',{
                    toDoTaskTitle: this.state.toDoTaskTitle,
                    toDoTask: this.state.toDoTask,
                    idToDoSpace : this.state.spaceId
                },{headers: {
                    authorization: localStorage.getItem('token')
                  }});
                if(result.data.success){
                    let liste = this.state.tasksListe
                    liste.push({idToDoTask :result.data.resultes ,idToDoSpace:this.state.spaceId, toDoTaskTitle :this.state.toDoTaskTitle, toDoTask :this.state.toDoTask})
                    this.setState({ msg:result.data.msg, tasksListe : liste,sweet : 'donne'})
                }else{
                    this.setState({sweet : 'error', msg:result.data.msg})
                }
            } catch (error) {
                //if we have error, display error 
              console.error(error);
              this.setState({sweet : 'error', msg :'server error'})
            }
        
    }

    //methode onConfirm to confirm update or delete
    onConfirm(id,methode){
        this.setState({sweet : methode , id :id})
    }
    //methode onConfirm to confirm update from inout
    onConfirmUpdate(e,id,methode){
        if(e.target.firstChild.nodeValue !== this.state.tasksListe[id][methode].props.children) this.setState({sweet : 'update' , id :id, [methode] :e.target.firstChild.nodeValue})
    }

    //nethode onUpdate to update task
    async onUpdate(){
        if(this.state.toDoTaskTitle !== '' || this.state.toDoTask !== ''){
            try {
                const result = await axios.put(process.env.REACT_APP_SERVERURL+'tasks/update',{
                    toDoTaskTitle: (this.state.toDoTaskTitle !== '')?this.state.toDoTaskTitle:this.state.tasksListe[this.state.id].toDoTaskTitle.props.children,
                    toDoTask: (this.state.toDoTask !== '')?this.state.toDoTaskTitle:this.state.tasksListe[this.state.id].toDoTask.props.children,
                    id : this.state.tasksListe[this.state.id].key
                },{headers: {
                    authorization: localStorage.getItem('token')
                  }});
                if(result.data.success){
                    if(this.state.toDoTaskTitle !== '')this.state.tasksListe[this.state.id].toDoTaskTitle.props.children = this.state.toDoTaskTitle
                    if(this.state.toDoTask !== '')this.state.tasksListe[this.state.id].toDoTask.props.children = this.state.toDoTask
                    this.setState({ msg:result.data.msg,toDoTaskTitle :'',toDoTask:'',sweet : 'donne'})
                }else{
                    this.setState({sweet : 'error', msg:result.data.msg})
                }
            } catch (error) {
                //if we have error, display error 
              console.error(error);
              this.setState({sweet : 'error', msg :'server error'})
            }
        }else{
            this.setState({ msg:'Nothing changed',sweet : 'error'})
        }
    }

    // onDelete mothode to delete task
    async onDelete(){
        try {
            const result = await axios.delete(process.env.REACT_APP_SERVERURL+'tasks/delete/'+this.state.tasksListe[this.state.id].key,{headers: {
                authorization: localStorage.getItem('token')
              }});
              if(result.data.success){
                  this.setState({sweet : 'donne', msg:result.data.msg , tasksListe :this.state.tasksListe.filter(el => el.idToDoTask !== this.state.tasksListe[this.state.id].idToDoTask)})
              }else{
                  this.setState({sweet : 'error', msg:result.data.msg})
              }
        } catch (error) {
            //if we have error, display error 
          this.setState({sweet : 'error', msg :'server error'})
        }
    }


    //methode to desplay tasks liste
tasksListe = () => {
    let  keys = []
    let newListe =[]
    this.state.tasksListe.map((task, i) => {
            newListe[i]={key:task.idToDoTask}
            keys.push(i)
            newListe[i].toDoTaskTitle=<div onBlur={(e)=>this.onConfirmUpdate(e,i,'toDoTaskTitle')} contentEditable={this.state.droit}>
                {task.toDoTaskTitle}
            </div>
            newListe[i].toDoTask=<div onBlur={(e)=>this.onConfirmUpdate(e,i,'toDoTask')} contentEditable={this.state.droit}>
                {task.toDoTask}
            </div>
            newListe[i].idToDoTask= (this.state.droit)?<div className='edit_delete'>
                    <button type='button' onClick={()=>this.onConfirm(i,'update')} className='btn btn-warning'>
                            <span className="glyphicon glyphicon-pencil"></span>
                    </button> 
                    <button type='button' onClick={()=>this.onConfirm(i,'delete')}  className='btn btn-danger'>
                            <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </div> : <div></div>
        return keys
    })
    return <TasksTable
        keys='keys'
        columns={this.state.columns}
        initialData={newListe}
        initialPageLength={10}
        />
}

    getInputForNewTask(){
        if(!this.state.droit) return<h1>ToDo tasks liste</h1>
        else return<div>
            <h1>My ToDo tasks liste</h1>
                <div className='col-lg-offset-3 col-lg-9  col-lg-offset-3 col-lg-8 col-xs-offset-1 col-xs-10'>
                    <form onSubmit={this.onSubmit} className='form-group'>
                        <div className='col-lg-3 col-xs-3'>
                            <input className='form-control' onChange={this.onChange} name='toDoTaskTitle' placeholder="Enter task title" type='text' required autoFocus/>
                        </div>
                        <div className='col-lg-8 col-sm-7 col-xs-6'>
                            <input className='form-control' onChange={this.onChange} name='toDoTask' placeholder="Enter task content" type='text' required autoFocus/>
                        </div>
                        <div className='col-lg-1 col-sm-2 col-xs-3'>
                            <button type='submit' className='btn btn-success'>
                                <span className="glyphicon glyphicon-plus"></span> New Task
                            </button>
                        </div>
                    </form>
                </div>
        </div>
    }
    render () {
        return (
            <div className='spacesListe'>
            {this.sweetAlert()}
            {this.getInputForNewTask()}
                <div className='col-lg-12'>
                            {this.tasksListe()}
                </div>
            </div>
        )
    }
}

export default Tasks;