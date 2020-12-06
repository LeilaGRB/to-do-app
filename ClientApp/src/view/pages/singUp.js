import React,{Component} from 'react';
import '../../public/css/home.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

//this class desplay the sing Up page
class SingUp extends Component{

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
            firstName: '',
            lastName : '',
            password:'',
            passwordConf:'',
            email:'',
            redirect:false,
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
        }else if(e.target.name === "password" || e.target.name === "passwordConf"){
            //test if we have error in password or passwordConf or they are not same
            this.setState( {errors:{ [e.target.name] : (e.target.value.length < 6)?'need mor than 6 caracters or number or symbol': (this.state.password.length >= 6 && this.state.passwordConf.length >= 6 && this.state.password !== this.state.passwordConf) ?'the pssword not same':''}});
        }
    }

    //to send the right data to the API and creat new user
    async onSubmit(e){
        e.preventDefault()
        if(this.state.password === this.state.passwordConf){
            try {
                let data =  {
                    nom : this.state.lastName,
                    prenom :  this.state.firstName,
                    email: this.state.email,
                    password:this.state.password
                }
                const result = await axios.post(process.env.REACT_APP_SERVERURL+'auth/singUp',data);
                localStorage.setItem('token', result.data.resultes.token);
                localStorage.setItem('user', JSON.stringify({
                    nom : this.state.lastName,
                    prenom :  this.state.firstName,
                    email: this.state.email
                }));
                this.setState({redirect: true})
            } catch (error) {
                //if we have error, display error 
              console.error(error);
            }
        }
    }

    //methode to redirect to profil page
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

  render () {
    return (
        <div className='home'>
            {this.renderRedirect()}
            <h1>Sing Up</h1>
            <form onSubmit={this.onSubmit} className="form-horizontal col-lg-offset-2 col-lg-8">
                <div className="form-group col-lg-6">
                    <label className="control-label">First Name:</label>
                    <input type="text" onChange={this.onChange} className="form-control" pattern="[a-z A-Z]+" name='firstName' id="prenom" placeholder="Enter first name" required autoFocus/>
                    <p>{this.state.errors.firstName}</p>
                </div>
                <div className="form-group col-lg-6 ">
                    <label className="control-label" >Last Name:</label>
                    <input type="text" className="form-control" pattern="[a-z A-Z]+" onChange={this.onChange} name='lastName' id="nom" placeholder="Enter last name" required autoFocus/>
                    <p>{this.state.errors.lastName}</p>
                </div>
                <div className="form-group col-lg-6">
                    <label className="control-label " >Password:</label>
                    <input type="password" className="form-control" id="pwd" onChange={this.onChange} name='password' required autoFocus placeholder="Enter password"/>
                    <p>{this.state.errors.password}</p>
                </div>
                <div className="form-group col-lg-6">
                    <label className="control-label " >Password Confirmation:</label>
                    <input type="password" className="form-control" onChange={this.onChange} id="pwdConfirmation" name='passwordConf' required autoFocus placeholder="Enter password confirmation"/>
                    <p>{this.state.errors.passwordConf}</p>
                </div>
                <div className="form-group col-lg-6">
                    <label className="control-label">Email:</label>
                    <input type="email" className="form-control" pattern=".+@(gmail.com|yahoo.com|gmail.fr|yahoo.fr)" onChange={this.onChange} name='email' id="email" placeholder="Enter email" autoFocus/>
                    <p>{this.state.errors.email}</p>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn">sing Up</button>
                    </div>
                </div>
             </form>
        </div>
    )
  }
}

export default SingUp;