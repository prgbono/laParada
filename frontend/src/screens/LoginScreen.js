import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            name="email"
            placeholder="Email"
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            value={password}
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Entrar
          </button>
        </div>
        <div>
          <label />
          <div>
            Aún sin cuenta? <Link to="/login">Regístrate</Link>
          </div>
        </div>
      </form>
    </>
  );
}
