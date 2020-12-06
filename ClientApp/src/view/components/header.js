import React,{Component} from 'react';

//this class desplay the header for user not connected
class Header extends Component{
    render () {
        return (
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="/">ToDo-App</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                      <li className="active"><a href="/singIn">SingIn</a></li>
                      <li><a href="/singUp">SingUp</a></li>
                    </ul>
                  </div>
                </nav>
        )
    }
}

export default Header;