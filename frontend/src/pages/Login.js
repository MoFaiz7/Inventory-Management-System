import React, { useState } from 'react'
import './Signup.css'
import Button from 'react-bootstrap/Button';
import { useLogin } from '../hooks/useLogin';

const Login = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();



    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(username, password);

        await login(username, password);
    }

    return (
        <div className='page'>

            <div className="main_Box">
                <div className="left">

                    <p className='head'>Login</p>
                    <label htmlFor="username" className='colwhite fntsz' >Username</label><br />
                    <input type="text" name="username" id="username" className='inpts colwhite' autoComplete='off' value={username} onChange={(e) => { setUsername(e.target.value) }} />



                    <label htmlFor="passwd" className='colwhite fntsz' >Password</label><br />
                    <input type="password" name="passwd" id="passwd" className='inpts colwhite' autoComplete='off' value={password} onChange={(e) => { setPassword(e.target.value) }} />

                    {/* <Button variant="contained" style={{ "width": "100%", "marginTop": "15px" }} onClick={handleSubmit} >Submit</Button> */}
                    <Button disabled={isLoading} variant="primary" style={{ "width": "100%", "marginTop": "15px" }} onClick={handleLogin} >Log In</Button>
                    {error && <div className="error">{error}</div>}
                </div>

                <div className="right">
                    <figure>
                        <img className='loginImg' src="/images/login.svg" alt="all" />
                    </figure>
                </div>

            </div>

        </div>
    )
}

export default Login