import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useIsOpen from '../hooks/useIsOpen';
import useOutsideClick from '../hooks/useOutsideClick';

// Component for active links in the navbar
function ActiveLink({ href, children, handleToggle }) {
    // Get the current location
    const location = useLocation().pathname;
    // Check if the link is active based on the current location
    const isActive = location === href;

    return (
        // Render a Link component with the appropriate styling based on isActive
        <Link to={href} className={isActive ? 'active' : ''} onClick={handleToggle}>
            {children}
        </Link>
    );
}

// Navbar component
function Navbar({ signOut }) {
    // Reference for the navbar element
    const refNavBar = useRef();
    // State for controlling the navbar's open/close state
    const [isOpen, handleToggle] = useIsOpen();
    // Hook for handling clicks outside the navbar to close it
    useOutsideClick({ val: isOpen, ref: refNavBar, handler: handleToggle });

    return (
        <>
            {/* Button for toggling the navbar on mobile */}
            <button
                className="nav-toggle"
                aria-controls={refNavBar}
                aria-expanded={isOpen}
                onClick={handleToggle}
            >
                <span className="sr-only">Menu</span>
                <div className="bar1" />
                <div className="bar2" />
                <div className="bar3" />
            </button>

            {/* Navbar menu */}
            <nav id="navbar" ref={refNavBar} data-visible={isOpen}>
                <ul>
                    {/* Render each navigation item with an ActiveLink component */}
                    <li>
                        <ActiveLink href="/" handleToggle={handleToggle}>Expense</ActiveLink>
                    </li>
                    <li>
                        <ActiveLink href="/investments" handleToggle={handleToggle}>Investments</ActiveLink>
                    </li>
                    <li>
                        <ActiveLink href="/earnings" handleToggle={handleToggle}>Earnings</ActiveLink>
                    </li>
                    <li>
                        <ActiveLink href="/bank" handleToggle={handleToggle}>Bank</ActiveLink>
                    </li>
                    <li>
                        <ActiveLink href="/summary" handleToggle={handleToggle}>Summary</ActiveLink>
                    </li>
                    <li>
                        {/* Button for signing out */}
                        <button onClick={signOut}>Sign Out</button>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
