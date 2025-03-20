import { describe, it, expect } from 'vitest';
import authReducer, {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout
} from '../authReducer';

describe('authReducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle loginRequest', () => {
    const nextState = authReducer(initialState, loginRequest());
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it('should handle loginSuccess', () => {
    const user = { id: 1, name: 'John Doe' };
    const nextState = authReducer(initialState, loginSuccess(user));
    
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.user).toEqual(user);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(null);
  });

  it('should handle loginFailure', () => {
    const error = 'Invalid credentials';
    const nextState = authReducer(initialState, loginFailure(error));
    
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(error);
    expect(nextState.isAuthenticated).toBe(false);
  });

  it('should handle logout', () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { id: 1, name: 'John Doe' },
      loading: false,
      error: null
    };
    
    const nextState = authReducer(loggedInState, logout());
    
    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.user).toBe(null);
  });
}); 