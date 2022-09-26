import * as React from 'react';
import Login from './components/Login/Login'
import TopicPage from '../src/components/TopicPage/TopicPage'
import './App.css';

class App extends React.Component {
  state = {
    appselect: true,
    userdata:{}
  }

  constructor(props){
    super(props)
    this.setLogin = this.setLogin.bind(this)
    this.setTopicPage = this.setTopicPage.bind(this)
    this.setUserdata = this.setUserdata.bind(this)
  }

  setUserdata = (data) =>{
    this.setState({
      userdata:data
    })
  }

  setLogin = () =>{
    this.setState({
      appselect:true
    })
  }

  setTopicPage = () =>{
    this.setState({
      appselect:false
    })
  }

  render(){
    return (
      <div>
          {
            this.state.appselect?
            <div className='App-header'>
            <Login setTopicPage = {this.setTopicPage} setUserdata = {this.setUserdata}/>
            </div>
            :''
          }
  
          {
            !this.state.appselect?
            <div className='App-header'>
            <TopicPage setLogin = {this.setLogin} userdata = {this.state.userdata}/>
            </div>
            :''
          }
        
      </div>
    );
  }
  
}

export default App;
