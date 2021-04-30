
import Signup from './components/Signup';
import AuthService from './services/authService'
import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login';
import Homepage from './components/Homepage';

export default class App extends Component {
  state = {
    loggedInUser: null,
    
  }

  service = new AuthService()

  componentDidMount(){
   this.service.loggedin()
   .then(user => {
     this.setState({
      loggedInUser: user
     })
   })
   .catch(err => {
     console.log(err)
   })
  }

  getTheUser = user => {
    this.setState({
     loggedInUser: user
    })
  }
  
  
  render() {
    return (
      <div>
      
     
      {this.state.loggedInUser && (
        <div>
          {`Hi ${this.state.loggedInUser.firstname}`}
        </div>
      )} 
       <Switch>
       <Route exact path='/' component={Signup} />
       <Route exact  path="/login" render={() => <Login getTheUser={this.getTheUser} />} />
       
        <Route exact path='/homepage' render={()=>
       <Homepage getTheUser={this.getTheUser}/>
       }/>
      
       
       </Switch>
       
      </div>
    )
  }
}
