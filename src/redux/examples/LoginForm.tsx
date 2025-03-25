import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { 
  selectAuthLoading, 
  selectAuthError, 
  selectIsAuthenticated,
  selectUser,
  LoginCredentials 
} from '../slices/authSlice';
import { loginSaga } from '../sagas/authSaga';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch action để đăng nhập bằng Redux Saga
    dispatch(loginSaga(credentials));
  };

  if (isAuthenticated && user) {
    return (
      <div>
        <h2>Welcome, {user.username}!</h2>
        <p>You are logged in as {user.role}</p>
        <button onClick={() => dispatch({ type: 'auth/logoutSaga' })}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}; 