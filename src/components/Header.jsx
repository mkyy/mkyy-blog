import Link from 'next/link';
import styled from 'styled-components';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { auth } from '../services/firebase';

const HeaderContainer = styled.header`
  background-color: #4b4e6d;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .logo-title {
    font-family: 'Amatic SC', cursive;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Header = () => {
  const { user, handleSignOut } = useContext(UserContext);

  return (
    <HeaderContainer>
      <Link href='/'>
        <h1 className='logo-title'>mkyy blog</h1>
      </Link>
      <div>
        {user ? (
          <DropdownButton id={'dropdown-user-button'} title={user.displayName}>
            <Dropdown.Item href='#/action-1'>Perfil</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSignOut()}>Sair</Dropdown.Item>
          </DropdownButton>
        ) : (
          <Link href='/login'>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </HeaderContainer>
  );
};
export default Header;
