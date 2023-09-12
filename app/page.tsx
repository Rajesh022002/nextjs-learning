// pages/index.js
import React from 'react';
import Layout from '@/components/layout';
const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Layout
                title="Home Page"
                description="This is the Home page of our website."
                ogImage="/Home-image.jpg"
            ></Layout>
            <h1 className="text-6xl font-bold text-center mb-4">Blog</h1>
            <p className="text-xl text-center">
                Welcome to our blog page. Here you&#39;ll find interesting
                articles about various topics.
            </p>
        </div>
    );
};

export default Home;
