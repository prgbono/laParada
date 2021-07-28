import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) props.history.push(redirect);
    // FIXME: <Redirect to={redirect} />;
  }, [props.history, redirect, userInfo]);

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Login</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
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
