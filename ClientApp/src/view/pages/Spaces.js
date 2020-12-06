import React,{Component} from 'react';
import '../../public/css/spaces.css';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Redirect } from 'react-router-dom';
import Space from '../components/space-component'

//this class desplay the spaces page
class Spaces extends Component{

    constructor (props) {
        super(props);
        // call methode onChange, whene we change the input value 
        this.onChange = this.onChange.bind(this);
        // call methode onSubmit, whene we click in submit button to add new space
        this.onSubmit = this.onSubmit.bind(this);
        // call methode onDelete, whene we want delete space 
        this.onDelete = this.onDelete.bind(this);
        this.onConf = this.onConf.bind(this);
        //initialise state
        this.state = {
            success : true,
            msg : null,
            droit :(this.props.location.pathname.split('/')[1]=== "spaces")?true : false,
            newSpace:'',
            spacesListe:[],
            redirect:false,
            state:false,
            sweet:''
        }
        //call methoode getSpaces to get all spaces for this user
        this.getSpaces()
    }

    // onDelete mothode to delete space
    async onDelete(){
        try {
            const result = await axios.delete(process.env.REACT_APP_SERVERURL+'spaces/delete/'+this.state.id,{headers: {
                authorization: localStorage.getItem('token')
              }});
              if(result.data.success){
                  this.setState({sweet : 'donne', msg:result.data.msg , spacesListe :this.state.spacesListe.filter(el => el.id !== this.state.id)})
              }else{
                  this.setState({sweet : 'error', msg:result.data.msg})
              }
        } catch (error) {
            //if we have error, display error 
          console.error(error);
          this.setState({sweet : 'error', msg :'server error'})
        }
    }


    //methode getSpaces 
    async getSpaces(){
        try {
            const result = await axios.get(process.env.REACT_APP_SERVERURL+''+this.props.location.pathname.split('/')[1],{headers: {
                authorization: localStorage.getItem('token')
              }});
            this.setState({spacesListe : result.data.resultes})
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

    //to send the right data to the API for add new space
    async onSubmit(e){
        e.preventDefault()
            try {
                const result = await axios.post(process.env.REACT_APP_SERVERURL+'spaces/add',{
                    spaceName: this.state.newSpace,
                },{headers: {
                    authorization: localStorage.getItem('token')
                  }});
                if(result.data.success){
                    let liste = this.state.spacesListe
                    liste.push({id :result.data.result , spaceName :this.state.newSpace})
                    this.setState({ msg:result.data.msg, spacesListe : liste, newSpace:'',sweet : 'donne'})
                }else{
                    this.setState({sweet : 'error', msg:result.data.msg})
                }
            } catch (error) {
                //if we have error, display error 
              console.error(error);
              this.setState({sweet : 'error', msg :'server error'})
            }
        
    }

    // methode onConf to creat sweet for confirmation of update  or delete
    onConf(e ,id,methode){
        if(!e)this.setState({sweet : methode , id :id})
        else{
            if(e.target.firstChild.nodeValue !== this.state.spacesListe[id].spaceName){
                this.setState({sweet : methode , id :id, newSpace:e.target.firstChild.nodeValue})
            }
        }
    }

    //nethode onUpdate to update space
    async onUpdate(){
        try {
            console.log(this.state.newSpace)
                const result = await axios.put(process.env.REACT_APP_SERVERURL+''+this.props.location.pathname.split('/')[1]+'/update',{
                    spaceName : this.state.newSpace,
                    id : this.state.spacesListe[this.state.id].id
                },{headers: {
                    authorization: localStorage.getItem('token')
                  }});
                if(result.data.success){
                    this.state.spacesListe[this.state.id].spaceName =this.state.newSpace
                    this.setState({ msg:result.data.msg,newSpace:'',sweet : 'donne'})
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
          return <SweetAlert  warning showCancel confirmBtnText="Confirm" confirmBtnBsStyle="danger" title="Confirm!!" onConfirm={this.onDelete} onCancel={this.initSweetAlert.bind(this)} focusCancelBtn >You want delete this space ???</SweetAlert>;
    
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

    //nethode change the state of redirection value
    onSpaceClick(id){
        this.setState({id:id,redirect:true})
    }
    //methode to redirect to profil page
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.props.location.pathname+'/'+this.state.id} />
        }
    }
        //methode to desplay spaces liste
    spacesListe = () => {
        return this.state.spacesListe.map((space, i) => {
          //use Option component to display spaces liste option in select
            return <Space obj={space.spaceName} state ={this.state.state} index={i} id={space.id} key={i} droit={this.state.droit} onSpaceClick={this.onSpaceClick.bind(this)}  onConf={this.onConf.bind(this)}  />;
        });
    }
    getAddSpaceParet(){
        if(!this.state.droit) return <h1>ToDo shared spaces sliste</h1>
        return<div>
            <h1>My ToDo spaces liste</h1>
            <div className='col-lg-offset-4 col-lg-7  col-lg-offset-3 col-lg-8 col-xs-offset-1 col-xs-10'>
                <form onSubmit={this.onSubmit} className='form-group'>
                    <div className='col-lg-8'>
                        <input className='form-control' onChange={this.onChange} name='newSpace' type='text' required autoFocus/>
                    </div>
                    <div className='col-lg-2'>
                        <button type='submit' className='btn btn-success'>
                            <span className="glyphicon glyphicon-plus"></span> New Space
                        </button>
                    </div>
                </form>
            </div>
        </div>
    }

  render () {
    return (
        <div className='spacesListe'>
            {this.renderRedirect()}
                {this.sweetAlert()}
                {this.getAddSpaceParet()}
            <div className='col-lg-12'>
                {this.spacesListe()}
            </div>
        </div>
    )
  }
}

export default Spaces;