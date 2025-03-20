import React from 'react';
import {BannerSection} from "../components/BannerSection";

const HomePage = () => {
    return (
        <div className="home-page">
            {/* Page content */}
            <BannerSection />
            <h1>Welcome to TymeX</h1>
            <p>This is the home page content</p>
        </div>
    );
};

export default HomePage;