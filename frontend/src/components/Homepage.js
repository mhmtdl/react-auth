import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthService from '../services/authService'
export default class Homepage extends Component {
    

    service = new AuthService()

    logout = () => {
      
      this.service.logout()
      .then(response => {
         console.log(response)
         this.props.getTheUser(null)
      })
      .catch(err => {
          console.log(err)
      })
    }
    render() {
        return (
            <div>
           
                <Link to='/login' onClick ={this.logout}>Logout</Link>
            </div>
        )
    }
}
