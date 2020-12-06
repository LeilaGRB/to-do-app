import React,{Component} from 'react';
import  checkListeImage  from '../../public/images/check-liste.jpg';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';

//this class desplay the profil page
class Profil extends Component{

  constructor (props) {
      super(props);
      // call methode onChangeFirstName, whene we change the input value 
      this.onChange = this.onChange.bind(this);
      // call methode onSubmit, whene we click in submit button and all data is right
      this.onSubmit = this.onSubmit.bind(this);
      //initialise state
      this.state = {
          success : true,
          msg : null,
          firstName: JSON.parse(localStorage.getItem('user')).prenom,
          lastName : JSON.parse(localStorage.getItem('user')).nom,
          password:'',
          email:JSON.parse(localStorage.getItem('user')).email,
          avatar:'',
          sweet:'',
          errors : {
              firstName : '' ,
              lastName : '' ,
              password :'',
              email :''
          }
      }
      
  }

   //Methode onChanege used to insert input value in our state value
   onChange(e){
    this.setState( {[e.target.name] : e.target.value});
    if(e.target.name === "firstName" || e.target.name === "lasteName"){
        //test if we have error in first name or laste name
        this.setState( {errors:{ [e.target.name] : (e.target.value.length < 3)?'need mor than 3 caracters':''}});
    }else if(e.target.name === "password" ){
        //test if we have error in password or passwordConf or they are not same
        this.setState( {errors:{ [e.target.name] : (e.target.value.length < 6)?'need mor than 6 caracters or number or symbol':''}});
    }
  }

  onSubmit(){
    this.setState({sweet:'update'})
  }

  async updatePassword(){
      try {
        const result = await axios.put(process.env.REACT_APP_SERVERURL+'profil/updatePassword',{password:this.state.password},{headers: {
          authorization: localStorage.getItem('token')
        }});
          if(result.data.success){
            this.setState({password:'',sweet:'donne'})
          }else{
            this.setState({msg:result.data.msg,sweet:'error'})
          }
    } catch (error) {
        //if we have error, display error 
      console.error(error);
      this.setState({msg:'server error',sweet:'error'})
    }
  }
  async updateData(){
    try {
        let data =  {
            nom: this.state.lastName,
            prenom: this.state.firstName,
            email: this.state.email,
        }
        const result = await axios.put(process.env.REACT_APP_SERVERURL+'profil/updateProfile',data,{headers: {
          authorization: localStorage.getItem('token')
        }});
          if(result.data.success){
            localStorage.setItem('user', JSON.stringify(data));
            this.setState({sweet:'donne'})
          }else{
            this.setState({msg:result.data.msg,sweet:'error'})
          }
    } catch (error) {
        //if we have error, display error 
      console.error(error);
    }
  }
  onUpdate(){
        if(this.state.password !== '') {
          this.updatePassword()
        }
        if(JSON.parse(localStorage.getItem('user')).nom !== this.state.nom || JSON.parse(localStorage.getItem('user')).prenom !== this.state.prenom || JSON.parse(localStorage.getItem('user')).email !== this.state.email) {
          this.updateData()
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
      
      }else if(this.state.sweet === 'update'){
          //sweetAlert is displaye to confirme if we want to delete space
          return <SweetAlert  warning showCancel confirmBtnText="Confirm" confirmBtnBsStyle="danger" title="Confirm!!" onConfirm={this.onUpdate.bind(this)} onCancel={this.initSweetAlert.bind(this)} focusCancelBtn >You want update your profil ???</SweetAlert>;
    
        }else{
        //no sweetAlert to display
        return <div></div>;
      }
  }
  
  //Methode intSweetAlert to init a sweet value
  initSweetAlert(){
      this.setState({sweet : ''})
  }


  render () {
    return (
        <div className='home'>
        {this.sweetAlert()}
            <h1>Welcome in your ToDo profil</h1>
            <div>
            <form className="form-horizontal col-lg-offset-2 col-lg-8">
                <div className="form-group col-lg-12">
                  <img src={checkListeImage} alt='check-liste' />
                </div>
                <div className="form-group col-lg-6">
                    <label className="control-label">First Name:</label>
                    <input type="text"  value={this.state.firstName} onChange={this.onChange} className="form-control" pattern="[a-z A-Z]+" name='firstName' id="prenom" placeholder="Enter first name" required/>
                    <p>{this.state.errors.firstName}</p>
                </div>
                <div className="form-group col-lg-6 ">
                    <label className="control-label" >Last Name:</label>
                    <input type="text" value={this.state.lastName} className="form-control" pattern="[a-z A-Z]+" onChange={this.onChange} name='lastName' id="nom" placeholder="Enter last name" required />
                    <p>{this.state.errors.lastName}</p>
                </div>
                <div className="form-group col-lg-6">
                    <label className="control-label">Email:</label>
                    <input type="email"  value={this.state.email} className="form-control" pattern=".+@(gmail.com|yahoo.com|gmail.fr|yahoo.fr)" onChange={this.onChange} name='email' id="email" required/>
                    <p>{this.state.errors.email}</p>
                </div>
                <div className="form-group col-lg-6">
                    <label className="control-label " >Password:</label>
                    <input type="password" className="form-control" id="pwd" onChange={this.onChange} name='password' required placeholder="Enter password"/>
                    <p>{this.state.errors.password}</p>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="button" onClick={this.onSubmit} className="btn btn-warning">Update</button>
                    </div>
                </div>
             </form>
            </div>
        </div>
    )
  }
}

export default Profil;