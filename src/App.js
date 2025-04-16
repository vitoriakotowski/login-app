// App.js
import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    const validEmail = "eduardo.lino@pucpr.br";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {
      setMessage("Acessado com sucesso!");
    } else {
      setMessage("Usuário ou senha incorretos!");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Login</h1>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <button onClick={handleLogin}>Acessar</button>
      </div>
      <p style={{ marginTop: "1rem" }}>{message}</p>
    </div>
  );
}

export default App;
