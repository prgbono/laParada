import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // TODO: make a hook. Duplicated in RegisterScreen
  const [passwordMatch, setPasswordMatch] = useState(true);

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  useEffect(() => {
    if (!user) {
      console.log(
        'ProfileScreen useEffect, !user, hago RESET y dispatch(detailsUser), user: ',
        user,
      );
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo));
    } else {
      // BUG: [KPF-231] Change the user and get into /profile again. Data retrieved in inputs is not correct.
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo, user]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) setPasswordMatch(false);
    else {
      setPasswordMatch(true);
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Mi cuenta</h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox />}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Los cambios han sido guardados correctamente
              </MessageBox>
            )}
            {!passwordMatch && (
              <MessageBox variant="danger">
                Las contraseñas no coinciden
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                value={name}
                placeholder="Nombre"
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
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Contraseña"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Guardar
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}
