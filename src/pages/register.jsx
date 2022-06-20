import styled from 'styled-components';
import Layout from '../components/Layout';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const RegisterContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
  }
`;

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { handleRegister } = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();
    handleRegister(email, password, name);
  };

  return (
    <Layout>
      <RegisterContainer>
        <h1>Register</h1>

        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor='displayName'>Nome</label>
          <input
            type='text'
            id='displayName'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Email'
            value={email}
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

          <button type='submit'>Registrar</button>
        </form>
      </RegisterContainer>
    </Layout>
  );
}
