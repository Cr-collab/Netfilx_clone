import React from 'react';
import './Header.css';

export default ({black}) =>
{
    return (

        <header className={black ? 'black' : ''} >
            <div className='header--logo'>
                 <a href='/'>
                     CRISFLIX
                 </a>
            </div>

            <div className='header--user'>
            ☻︎
            </div>
        </header>

    );
}