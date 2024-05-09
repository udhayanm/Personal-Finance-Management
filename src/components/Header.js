import React from 'react';
import { signInWithGoogle, signOut } from '../firebase';
import useUser from '../hooks/useUser';
import Navbar from './Navbar';

function Header() {
    const user = useUser();
    const isUserSignedIn = user !== null;

    function handleSignInClick() {
        signInWithGoogle();
    }

    return (
        <header>
            {isUserSignedIn ? (
                <>
                    <div className="user">
                        <img src={user.photoURL} alt="User" />
                        <strong>{user.displayName}</strong>
                        <small>{user.email}</small>
                    </div>
                    <Navbar signOut={signOut} />
                </>
            ) : (
               <button className="signInButton" onClick={handleSignInClick}>Sign In</button>
            )}
        </header>
    );
}

export default Header;
