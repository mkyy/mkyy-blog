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
    align-items: flex-end;
    justify-content: flex-start;
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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

  .btn-container {
    display: flex;

    button {
      transition: 0.5s ease-out;
      background: var(--golden);
      color: #333;
      border: 2px solid var(--golden);

      a {
        text-decoration: none;
        color: #333;
      }

      &:hover {
        background: transparent;

        a {
          color: var(--golden);
        }
      }
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
