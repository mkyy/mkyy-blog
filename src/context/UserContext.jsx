import { ADMIN_INFO } from '../../data.env';
import { createContext, useState } from 'react';
import { auth } from '../services/firebase';
import { database } from '../services/firebase';
import { get, push, ref } from 'firebase/database';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  updateProfile,
  browserLocalPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import Router from 'next/router';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  onAuthStateChanged(auth, userCredentials => {
    const adminUID = ADMIN_INFO.uid;
    userCredentials ? setUser(userCredentials) : setUser(null);

    if (user !== null && user.uid === adminUID) {
      setIsAdmin(true);
    }
  });

  const isLoggedIn = () => {
    if (user !== null) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = (email, password) => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then(userCredentials => {
        if (userCredentials.user.uid === ADMIN_INFO.uid) {
          console.log('Admin logged in');
          setIsAdmin(true);
        }
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      })
      .finally(() => {
        Router.push('/');
      });
  };

  const handleRegister = (email, password, name) => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      return createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL:
              'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
          });
        })
        .catch(error => {
          console.log('error', error);
          const errorMessage = error.message;
          console.log(errorMessage);
        })
        .finally(() => {
          Router.push('/');
        });
    });
  };

  const handleSignOut = () => {
    auth.signOut();
    if (Router.pathname === '/') {
      Router.reload();
    } else {
      Router.push('/');
    }
  };

  const createPost = post => {
    const reference = ref(database, 'posts/');
    get(reference).then(posts => {
      const newPost = {
        ...post,
        id: posts.key,
      };
      push(reference, newPost);
    });

    Router.push('/');
  };

  const createComment = (base_ref, comment) => {
    const reference = ref(database, `${base_ref}/comments`);
    get(reference).then(coms => {
      const newCom = {
        ...comment,
        author: user.displayName,
      };
      push(reference, newCom);
    });
  };

  return (
    <UserContext.Provider
      value={{
        handleLogin,
        handleRegister,
        createPost,
        handleSignOut,
        user,
        isAdmin,
        createComment,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
