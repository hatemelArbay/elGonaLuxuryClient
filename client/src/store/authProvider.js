import AuthContext from "./authContext";
import {useState} from 'react';



const Authprovider = (props) => {
  const [userId, setId] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const authContext = {
        email: email,
        userId: userId,
        token: token,
        role: role,
        login: (email,userId, token,role) => {
          
          setEmail(email);
            setId(userId);
            setToken(token);
            setRole(role);
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', role);
            console.log('Logging in:', email, userId, token, role);
          },
        logout: () => { 
          setEmail('');
          setId('');
          setToken('');
          setRole('');
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('token', token);
          sessionStorage.removeItem('role', role);
        }
      };
      
  
    return (
      <AuthContext.Provider value={authContext}>
        {props.children}
      </AuthContext.Provider>
    );
  };
  
  export default Authprovider;
  