import React,{Component} from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from '../view/pages/Home';
import SingIn from '../view/pages/singIn';
import SingUp from '../view/pages/singUp';
import Spaces from '../view/pages/Spaces';
import Profil from '../view/pages/profile';
import Tasks from '../view/pages/tasksListe';
import Header from '../view/components/header';
import AuthHeader from '../view/components/auth-header';


class Routers extends Component{
  //methode to chander header
  header = () => {
    console.log('hed')
      if (!localStorage.getItem('token')) {
          return <Header/>
      }
      return <AuthHeader/>
  }

    render(){     
        return(
            <Router>
              <div>
                {/***** nav bare begin******/}
                {this.header() }
                {/***** nav bare end******/}
                 
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                {/***** if our path is racin '/' we display component Home******/}
                  <Route exact path='/' component={Home}/> 
                {/***** if our path is  '/singIn' we display component SingIN******/}
                  <Route exact path='/singIn' component={SingIn}/> 
                {/***** if our path is '/singUp' we display component SingUp******/}
                  <Route exact path='/singUp' component={SingUp}/> 
                {/***** if our path is '/profil' we display component Profil******/}
                  <Route exact path='/profil' component={Profil}/> 
                {/***** if our path is '/spaces' we display component Sspaces******/}
                  <Route exact path='/spaces' component={Spaces}/> 
                {/***** if our path is '/spaces/id' we display component Task******/}
                  <Route exact path='/spaces/:id' component={Tasks}/> 
                {/***** if our path is '/shared-space' we display component SsharedSpace******/}
                  <Route exact path='/sharedspaces' component={Spaces}/> 
                {/***** if our path is '/shared-space/id' we display component SsharedSpace******/}
                  <Route exact path='/sharedspaces/:id' component={Tasks}/> 
                </Switch>
              </div>
            </Router>
        )  
    }
}

export default Routers;