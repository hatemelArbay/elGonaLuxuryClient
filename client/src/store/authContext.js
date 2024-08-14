import { createContext } from 'react';

const AuthContext = createContext({
  email: '',
  userId: '',
  token: '',
  role:'',
  login: (email, userId, token,role) => {
    
  },
  logout: () => {},
});

export default AuthContext;
