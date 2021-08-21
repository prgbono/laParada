import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [frontError, setFrontError] = useState(false);
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const submitHandler = e => {
    e.preventDefault();
    if (confirmPassword !== password) setFrontError(true);
    else {
      setFrontError(false);
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) props.history.push(redirect);
  }, [props.history, redirect, userInfo]);

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Alta de cliente</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {frontError && (
          <MessageBox variant="danger">Las contraseñas no coinciden</MessageBox>
        )}
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            value={name}
            name="name"
            placeholder="Nombre"
            required
            onChange={e => setName(e.target.value)}
          />
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
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            value={confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Crea mi cuenta
          </button>
        </div>
        <div>
          <label />
          <div>
            Si ya tienes cuenta{' '}
            <Link to={`/login?redirect=${redirect}`}>entra aquí</Link>
          </div>
        </div>
      </form>
    </>
  );
}
