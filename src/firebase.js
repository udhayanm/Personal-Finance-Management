import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: "AIzaSyCIfXXN9icKiLcDte4su_QTi7C2fSWw5bA",
	authDomain: "personal-finance-managem-8ba11.firebaseapp.com",
	projectId: "personal-finance-managem-8ba11",
	storageBucket: "personal-finance-managem-8ba11.appspot.com",
	messagingSenderId: "486248215921",
	appId: "1:486248215921:web:85187b0476d2620177f2d0",
	measurementId: "G-1EDWP8TGQ5"
  };

  const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export const signInWithGoogle = () => {
	signInWithPopup(auth, new GoogleAuthProvider())
		.then(res => console.log('Sign In with Google done!'))
		.catch(err => console.log(err)
	);
}

export const signOut = () => {
	auth.signOut()
		.then(res => console.log('Successfully Sign Out.'))
		.catch(err => console.log(err)
	);
}