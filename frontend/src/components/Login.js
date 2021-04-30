import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import AuthService from '../services/authService'
import './Login.css';
import { Link } from 'react-router-dom'
export default class Login extends Component {
    
    state= {
        email: '',
        password: '',
        errorMsg: '',
        redirect:false
    }

    service = new AuthService()

    onChangeHandler = e => {
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
        
    }

    
    submitHandler = e => {
        e.preventDefault()
      
        this.service.login(this.state.email,this.state.password)
        .then(user=> {
            console.log(user)
            this.props.getTheUser(user)
            this.setState({
                redirect:true,
                email:'',
                password:''
            })
            
        })
        .catch(err=> {
            console.log(err.response)
            this.setState({
                errorMsg:err.response.data.message
            })
        })
    }
    
  
    render() {
        if(this.state.redirect){
            return <Redirect to='/homepage'></Redirect>
        }
        
       
       
       
        return (
            <div className='box'>
            <h2>Login</h2>
            <form onSubmit={this.submitHandler}>
            <div className='inputBox'>
                        <input type='text' name='email' placeholder='Email address' value={this.state.email} onChange={this.onChangeHandler}></input>
                        {/* <label>Email</label> */}
                    </div>
                    <div className='inputBox'>
                        <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.onChangeHandler}></input>
                        {/* <label>Password</label> */}
                    </div>
                    <button type='submit'>Create Account</button>
                    <p>Not account yet<Link to={'/'}>Create one here</Link></p>
            </form>
            {this.state.errorMsg}
                
            </div>
        )
    }
}
