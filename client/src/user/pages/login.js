import React from 'react';
import '../../assets/styles/styleUser/styleUserPages/login.css';

function Login() {
    return (
        <div dir='rtl'>
             <h2 className='bsd'>בס"ד</h2>
        <div className="login-container" >
           
            <h2>כניסה לחשבון</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">שם משתמש</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">סיסמה</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className="login-button">כניסה</button>
                <a href="#" className="forgot-password">שכחת סיסמה?</a>
            </form>
        </div>
        </div>
    );
}

export default Login;
