import Link from 'next/link';
import styled from 'styled-components';
import { Button, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { auth } from '../services/firebase';

const HeaderContainer = styled.header`
  height: 70px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  .container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-title {
    font-family: 'Amatic SC', cursive;
    color: var(--golden);
    &:hover {
      cursor: pointer;
    }
  }
`;

const Header = () => {
  const { user, isAdmin, handleSignOut } = useContext(UserContext);

  return (
    <HeaderContainer>
      <Container className='container'>
        <Link href='/'>
          <h1 className='logo-title'>mkyy blog</h1>
        </Link>
        <div>
          {user ? (
            <DropdownButton id={'dropdown-user-button'} title={user.displayName}>
              {isAdmin && <Dropdown.Item href='/posts/create'>Criar post</Dropdown.Item>}
              <Dropdown.Item href='/profile/$'>Perfil</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSignOut()}>Sair</Dropdown.Item>
            </DropdownButton>
          ) : (
            <Link href='/login'>
              <Button className='btn-login'>Login</Button>
            </Link>
          )}
        </div>
      </Container>
    </HeaderContainer>
  );
};
export default Header;
