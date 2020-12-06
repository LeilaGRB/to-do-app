import React,{Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

//this class desplay the header for connected user
class Header extends Component{

  async logout(){
    try {
        const result = await axios.get(process.env.REACT_APP_SERVERURL+'logout',{headers: {
          authorization: localStorage.getItem('token')
        }});
        console.log(result.data)
          if(result.data.success){
            localStorage.clear()
          }
    } catch (error) {
        //if we have error, display error 
      console.error(error);
    }
  }
  //methode to redirect to profil page
  renderRedirect = () => {
    if (!localStorage.getItem('token')) {
        return <Redirect to='/' />
    }
    return<div></div>
  }
    render () {
        return (
                <nav className="navbar navbar-default">
                  {this.renderRedirect()}
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="/">ToDo-App</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                      <li className="active"><a href="/profil">{JSON.parse(localStorage.getItem('user')).nom+' '+JSON.parse(localStorage.getItem('user')).prenom}</a></li>
                      <li><a href="/spaces">My spaces</a></li>
                      <li><a href="/sharedspaces">Shared spaces</a></li>
                      <li><a href="#logout" onClick={this.logout.bind(this)}>Logout</a></li>
                    </ul>
                  </div>
                </nav>
        )
    }
}

export default Header;