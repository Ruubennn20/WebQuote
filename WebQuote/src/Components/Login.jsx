import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simular autenticação
    if (email === "admin@webquote.pt" && password === "admin") {
      onLogin(true);
      navigate("/form-admin");
    } else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button id="button1" type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
