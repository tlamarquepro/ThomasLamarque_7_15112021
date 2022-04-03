import React from 'react';
import Navigation from '../Nav';

const Erreur = () => {
    return (
        <><Navigation />
        <div className='ctnr-error'>
            <h1>Désolé !</h1> 
            <h2>La page que vous recherchez est introuvable.</h2>
        </div></>
    );
};

export default Erreur;