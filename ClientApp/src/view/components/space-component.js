import React,{Component} from 'react';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
var GuestsTable = require('react-data-components').DataTable;

//this class desplay the space components
class Space extends Component{

    constructor (props) {
        super(props);
        this.state = {
            success : true,
            msg : null,
            newUser:'',
            guestsListe:[],
            state:false,
            columns : [
                { title: 'Guest Email', prop: 'name'  },
                { title: 'Guest Name', prop: 'email'  },
                { title: '', prop: 'cancel' },
            ],
            sweet:''
        }
        //call methode get to get guests liste
        this.get()
    }
    //methode get 
    async get(){
        try {
            const result = await axios.get(process.env.REACT_APP_SERVERURL+'sharedspaces/'+this.props.id,{headers: {
                authorization: localStorage.getItem('token')
              }});
            this.setState({guestsListe : result.data.resultes})
        } catch (error) {
            //if we have error, display error 
          console.error(error);
          this.setState({sweet : 'error', msg :'server error to get data'})
        }
    }

    //Methode onChanege used to insert input value in our state value
    onChange(e){
        this.setState( {[e.target.name] : e.target.value});
    }


    // onDelete mothode to delete guest
    async onDelete(){
        try {
            const result = await axios.delete(process.env.REACT_APP_SERVERURL+'sharedspaces/delete/'+this.state.id,{headers: {
                authorization: localStorage.getItem('token')
              }});
              if(result.data.success){
                  this.setState({sweet : 'donne', msg:result.data.msg , guestsListe :this.state.guestsListe.filter(el => el.id !== this.props.id)})
              }else{
                  this.setState({sweet : 'error', msg:result.data.msg})
              }
        } catch (error) {
            //if we have error, display error 
          console.error(error);
          this.setState({sweet : 'error', msg :'server error'})
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
          return <SweetAlert  warning showCancel confirmBtnText="Confirm" confirmBtnBsStyle="danger" title="Confirm!!" onConfirm={this.onDelete.bind(this)} onCancel={this.initSweetAlert.bind(this)} focusCancelBtn >You want delete this guest ???</SweetAlert>;
    
        }else{
          //no sweetAlert to display
          return <div></div>;
        }
    }
    
    //Methode intSweetAlert to init a sweet value
    initSweetAlert(){
        this.setState({sweet : ''})
    }
    
    //methode onAddUser for share a space with auther users
    async onAddUser(id){
        try {
            const result = await axios.post(process.env.REACT_APP_SERVERURL+'sharedspaces/add',{
                id : id,
                email: this.state.newUser,
            },{headers: {
                authorization: localStorage.getItem('token')
              }});
            if(result.data.success){
                console.log(result.data)
                let liste = this.state.guestsListe
                liste.push({id :result.data.resultes.id,nom:result.data.resultes.nom,prenom:result.data.resultes.prenom , email :this.state.newUser})
                this.setState({ msg:result.data.msg, guestsListe : liste, newUser:'',sweet : 'donne'})
            }else{
                console.log(result.data.msg)
                this.setState({sweet : 'error', msg:result.data.msg})
            }
        } catch (error) {
            //if we have error, display error 
          console.error(error);
          this.setState({sweet : 'error', msg :'server error'})
        }
    }

    // methode onConf to creat sweet for confirmation of  delete
    onConfirm(id){
        this.setState({sweet : 'delete' , id:id})
    }
    //methode to desplay guests liste
guestsListe = () => {
    let  keys = []
    let newListe =[]
    this.state.guestsListe.map((guest, i) => {
            newListe[i]={key:guest.id}
            keys.push(i)
            newListe[i].email=guest.email
            newListe[i].name=guest.nom +' '+guest.prenom
            newListe[i].cancel= <div>
                    <button type='button' onClick={()=>this.onConfirm(guest.id)}  className='btn btn-danger'>
                            <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </div>
        return keys
    })
    return <GuestsTable
        keys='keys'
        columns={this.state.columns}
        initialData={newListe}
        initialPageLength={10}
        />
}

    getButton(){
        if(!this.props.droit)return <div></div>
        else return<div>
            <button id='delete' type='button' onClick={()=>this.props.onConf(null,this.props.id,'delete')}  className='btn btn-danger'>
                        <span className="glyphicon glyphicon-remove"></span>
            </button>
                    {/*-- Trigger the modal with a button --*/}
            <button id='share' type='button'  data-toggle="modal" data-target={"#"+this.props.id} className='btn btn-info'>
                        <span className="glyphicon glyphicon-user"></span>
            </button>
        </div>
    }


    render () {
        return (
            <div className='col-lg-3 col-sm-4 col-xs-6 space'>
            {this.sweetAlert()}
                <div className='element' onDoubleClick={()=>this.props.onSpaceClick(this.props.id)}>
                    {this.getButton()}
                    {/*<!-- Modal-->*/}
                    <div class="modal fade" id={this.props.id}  role="dialog">
                        <div class="modal-dialog modal-lg">
                        
                        {/*<!-- Modal content-->*/}
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">&times;</button>
                                    <h2 class="modal-title">The Guest Users For This Space </h2>
                                </div>
                                <div class="modal-body">
                                    <div>
                                        <h4 >Share your space withe user</h4>
                                        <div >
                                            <form className='form-group'>
                                                <div>
                                                    <input className='form-control'name='newUser' type='email' placeholder="Enter guest email" onChange={(e)=>this.onChange(e)} required/>
                                                    <button type='button' onClick={()=>this.onAddUser(this.props.id)} className='btn btn-success'>
                                                        <span className="glyphicon glyphicon-plus"></span> New Guest
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <h4>Guests Users Liste</h4>
                                        {this.guestsListe()}
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                    <h3 onBlur={(e)=>this.props.onConf(e,this.props.index,'update')} contentEditable={this.props.droit}  >{this.props.obj }</h3>
                </div>
            </div>
        )
    }
}

export default Space;