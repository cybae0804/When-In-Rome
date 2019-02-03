import React from 'react';
import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';
import AboutUs from './about_us';

export default props => (
    <div id='aboutUsPage'>
        <Header noSearch title='About Us'/>
        <AboutUs />
        <Footer />
    </div>
);