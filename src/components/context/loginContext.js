import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const API = process.env.API_URL || 'https://lab32-401.herokuapp.com';

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            login: this.login,
            logout: this.logout,
            signup: this.signup,
            user: {},
        }
    }

    signup = async (username, password, email, role) => {
        
           const options = {
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                cache: 'no-cache',
              };
          
              axios.post(`${API}/signup`, { username, password, email, role }, options).then(res => {
                this.validateToken(res.token);
                }).catch(e => {
                    console.log('ERROR SIGNUP');
                    console.error
                });
           
        
    }


    login = async (username, password) => {

        const options = {
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' ,'Authorization': `Basic ${btoa(`${username}:${password}` )}`},

            cache: 'no-cache',
          };
      
          axios.post(`${API}/signin`, {}, options).then(res => {
            this.validateToken(res.token);
            }).catch(e => {
                console.log('ERROR SIGNUP');
                console.error
            });
       
    }

    logout = () => {
        this.setLoginState(false, null, {});
    }

    validateToken = token => {

        try {
            let user = jwt.verify(token, 'supersecret');
            this.setLoginState(true, token, user);

        } catch (ex) {
            this.logout();
            console.log("token Validation error")
        }
    }

    setLoginState = (loggedIn, token, user) => {
        cookie.save('auth', token);
        this.setState({ loggedIn, user, token });
    }

    componentDidMount() {
        const cookieToken = cookie.load('auth');
        const token = cookieToken || null;
        this.validateToken(token);
    }

    render() {
        return (
            <LoginContext.Provider value={this.state}>
                {this.props.children}
            </LoginContext.Provider>
        )
    }
}

export default LoginProvider;