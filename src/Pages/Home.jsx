import React from 'react';
import SlideBanner from '../Components/SlideBanner';
import RecentStore from '../Components/RecentStore';


const recentStoresPromise = fetch('http://localhost:5000/recent-stores').then(res => res.json());

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <SlideBanner></SlideBanner>
            <RecentStore recentStoresPromise={recentStoresPromise}></RecentStore>
        </div>
    );
};

export default Home;