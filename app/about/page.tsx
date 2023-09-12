// pages/about.js
import React from 'react';
import Layout from '@/components/layout';
const About = () => {
    return (
        <div className="container mx-auto p-4">
            <Layout
                title="About Page"
                description="This is the About page of our website."
                ogImage="/About-image.jpg"
            ></Layout>
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                ac justo eget odio facilisis eleifend. Sed fringilla tincidunt
                justo vel auctor. Vivamus convallis justo vitae eleifend.
            </p>
            <p>
                Duis sit amet neque non sapien volutpat fringilla sed at quam.
                Vivamus euismod erat at tortor scelerisque, sit amet cursus nunc
                luctus.
            </p>
        </div>
    );
};

export default About;
