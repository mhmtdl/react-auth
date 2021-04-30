import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import AuthService from '../services/authService'
import './Signup.css';

export default class Signup extends Component {
    
    state = {
        firstname: '',
        surname: '',
        email:'',
        confirmmail: '',
        password:'',
        redirect:false,
        
      
    }

    service = new AuthService()

    handleChange = e => {
        const {name,value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.service.signup(this.state.firstname,this.state.surname,this.state.email,this.state.confirmmail,this.state.password)
        .then(response=> {
            console.log(response)
            this.setState({
                redirect:true,
                firstname:'',
                surname:'',
                email:'',
                confirmmail:'',
                password:'',
                errorMsg: '',
              

            })
        })
        .catch(err => {
            console.log(err.response)
            this.setState({
                errorMsg:err.response.data.message
            })

        })
       
       
    }
    
   
    
    render() {
       
      
        if(this.state.redirect) {
            return <Redirect to = '/login'></Redirect>
        }
       
      
        return (
          
           <div className='box'>
                <h2>Create Your Account</h2>
                <form onSubmit={this.handleFormSubmit}>
                    <div className='inputBox'>
                        <input type='text' name='firstname' placeholder='First name' value={this.state.firstname} onChange={this.handleChange}></input>
                        {/* <label>Firstname</label> */}
                    </div>
                    <div className='inputBox'>
                        <input type='text' name='surname' placeholder='Surname' value={this.state.surname} onChange={this.handleChange}></input>
                        {/* <label>Surname</label> */}
                    </div>
                    <div className='inputBox'>
                        <input type='text' name='email' placeholder='Email address' value={this.state.email} onChange={this.handleChange}></input>
                        {/* <label>Email</label> */}
                    </div>
                    <div className='inputBox'>
                        <input type='text' name='confirmmail' placeholder='Confirm Email address' value={this.state.confirmmail} onChange={this.handleChange}></input>
                        {/* <label>Email</label> */}
                    </div>
                    <div className='inputBox'>
                        <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange}></input>
                        {/* <label>Password</label> */}
                    </div>
                    <div className='inputBox'>
                        <input type='password' name='password' placeholder='Repeat your password' value={this.state.password} onChange={this.handleChange}></input>
                        {/* <label>Password</label> */}
                    </div>
                   
                    <button type='submit'> Create Account</button>
                </form>
                {this.state.errorMsg}
            </div>
            
        )
    }
}
