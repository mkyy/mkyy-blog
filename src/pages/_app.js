import { UserProvider } from '../context/UserContext';
import Head from 'next/head';
import GlobalStyles from '../styles/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>mkyy blog</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <UserProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
