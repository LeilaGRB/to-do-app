import React,{Component} from 'react';
import  checkListeImage  from '../../public/images/check-liste.jpg';
import '../../public/css/home.css';

//this class desplay the page home
class App extends Component{

  render () {
    return (
        <div className='home'>
            <h1>Welcome in ToDo</h1>
            <p>ToDo allows you to organize your tasks by a check liste</p>
            <img src={checkListeImage} alt='check-liste' />
        </div>
    )
  }
}

export default App;