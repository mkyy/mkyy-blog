import styled from 'styled-components';
import Layout from '../components/Layout';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const LoginContainer = styled.div`
  max-width: 500px;
  margin-inline: auto;
  align-items: center;
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin } = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <Layout>
      <LoginContainer>
        <h1>Login</h1>
        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            placeholder={'Email'}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Senha'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type='submit'>Login</button>
        </form>
      </LoginContainer>
    </Layout>
  );
}
