import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [loginInputs, setLoginInputs] = useState({ email: "", password: "" })
  const [registerInputs, setRegisterInputs] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate();

  const handleModal = () => setShowModal((prev) => !prev);

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const registerResponse = await axios.post("http://localhost:5000/register", registerInputs);
      const { token, user } = registerResponse.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.alert(registerResponse.data.message)
      setRegisterInputs({
        name: "",
        email: "",
        password: ""
      });
      window.location.href = "/home";
    
    } catch(error){
      window.alert(error.response.data.message)
    }

  };

  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post("http://localhost:5000/login", loginInputs)
      window.localStorage.setItem("PRODUCT_VAULT_TKN", loginResponse.data.token)
      setLoginInputs({
        email:"",
        password:""
      })
      navigate('/admin/products');
     
    } catch (error) {
      // console.log(error.response.data)
      window.alert(error.response.data.message)
    }
    // console.log(loginInputs)

  };

  return (
    <div className="homepage">
      <div className="container-fluid">
        <div className="left-section"></div>
        <div className="right-section">
          <div className="signin-box">
            <h2>SIGN IN</h2>
            <form>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter email" value={loginInputs.email} onChange={(e) => { setLoginInputs(prevState => ({ ...prevState, email: e.target.value })) }} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Password" value={loginInputs.password} onChange={(e) => { setLoginInputs(prevState => ({ ...prevState, password: e.target.value })) }} />
              </div>
              <button type="button" onClick={handleLogin} className="submit-btn" >
                LOGIN
              </button>
              <div className="register-section">
                <span>or</span>
                <button type="button" onClick={handleModal} className="outline-btn">
                  REGISTER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal-overlay" onClick={handleModal}></div>
          <div className="modal">
            <div className="modal-header">
              <h5>Register</h5>
              <span className="close" onClick={handleModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form >
                <div className="form-group" >
                  <label>Name</label>
                  <input type="text" placeholder="Enter name" name="formName" onChange={(e) => { setRegisterInputs(prevState => ({ ...prevState, name: e.target.value })) }}/>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter email" name="formEmail" onChange={(e) => { setRegisterInputs(prevState => ({ ...prevState, email: e.target.value })) }}/>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Password" name="formPassword" onChange={(e) => { setRegisterInputs(prevState => ({ ...prevState, password: e.target.value })) }}/>
                </div>
                <button type="submit" className="submit-btn" onClick={handleRegister}>
                  Register
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
