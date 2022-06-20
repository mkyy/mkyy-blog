import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

const MainContainer = styled.main``;

const isuser = [];

async function getUserState() {
  try {
    await onAuthStateChanged(auth, user => {
      if (user) {
        isuser.push(user);
      } else {
        // User is signed out
        // ...
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const Layout = ({ children }) => {
  useEffect(() => {
    getUserState();
  }, []);

  return (
    <>
      <Header />
      <MainContainer>{children}</MainContainer>
      {/* <Footer /> */}
    </>
  );
};
export default Layout;
