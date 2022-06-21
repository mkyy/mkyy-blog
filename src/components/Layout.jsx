import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

const MainContainer = styled.main`
  background-color: #353275;
  /* this padding is for Header */
  padding-top: 70px;

  .header-wrapper {
    display: flex;
    align-items: center;
    svg {
      width: 70px;
      height: 70px;
      fill: var(--golden);
    }
    h1 {
      color: var(--golden);
      font-family: 'Prompt';
      font-weight: 700;
    }
  }

  .post-principal {
    height: 300px;
    overflow: hidden;
    background: linear-gradient(0deg, #282355, #3a246a);
    border-radius: 5px;

    .img {
      height: 200px;
    }

    .title {
      color: var(--golden);
      font-family: 'Dosis';
      font-size: 24px;
      font-weight: 700;
    }

    .body {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      color: #fbfbfd;
      font-family: 'Oxygen';
    }
  }

  .post-generic {
    height: 150px;
    background: linear-gradient(0deg, #282355, #3a246a);
    border-radius: 5px;

    .img {
      height: 120px;
    }

    .title {
      color: var(--golden);
      font-family: 'Dosis';
      font-size: 24px;
      font-weight: 700;
    }

    .body {
      color: #fbfbfd;
      font-family: 'Oxygen';
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  );
};
export default Layout;
