import { UserProvider } from '../context/UserContext';
import Head from 'next/head';
import GlobalStyles from '../styles/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mkyy Blog | Home</title>
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
