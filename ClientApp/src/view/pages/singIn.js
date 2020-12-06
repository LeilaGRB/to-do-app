import React,{Component} from 'react';
import '../../public/css/home.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

//this class desplay the singIn page
class SingIn extends Component{

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
            password:'',
            email:'',
            redirect:false,
            errors : {
                password :'',
                email :''
            }
        }
    }
    
    //Methode onChanege used to insert input value in our state value
    onChange(e){
        this.setState( {[e.target.name] : e.target.value});
        if(e.target.name === "password"){
            //test if we have error in password or passwordConf or they are not same
            this.setState( {errors:{ [e.target.name] : (e.target.value.length < 6)?'need mor than 6 caracters or number or symbol': ''}});
        }
    }

    //to send the right data to the API and connect
    async onSubmit(e){
        e.preventDefault()
            try {
                let data =  {
                    email: this.state.email,
                    password:this.state.password
                }
                const result = await axios.post(process.env.REACT_APP_SERVERURL+'auth/singIn',data);
                localStorage.setItem('token', result.data.resultes.token);
                localStorage.setItem('user', JSON.stringify(result.data.resultes.user));
                this.setState({redirect: true})
            } catch (error) {
                //if we have error, display error 
              console.error(error);
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
            <h1>Sing In</h1>
            <form onSubmit={this.onSubmit} className="form-horizontal col-lg-offset-2 col-lg-8">
                <div className="form-group">
                    <label className="control-label col-sm-2">Email:</label>
                    <div className="col-sm-10">
                        <input type="email" onChange={this.onChange} className="form-control" pattern=".+@(gmail.com|yahoo.com|gmail.fr|yahoo.fr)" id="email" name='email' placeholder="Enter email" autoFocus required/>
                        <p>{this.state.errors.email}</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2">Password:</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="pwd" name='password' onChange={this.onChange} minlength="6" autoFocus placeholder="Enter password" required/>
                        <p>{this.state.errors.password}</p>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn">sing In</button>
                    </div>
                </div>
             </form>
        </div>
    )
  }
}

export default SingIn;