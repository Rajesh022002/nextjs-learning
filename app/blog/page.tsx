'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Blog {
    _id: number;
    title: string;
    content: string;
    uploadDate: string;
    description: string;
    titleImage: string;
}

function Blog() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    'https://task.appsdeployer.com/api/web/blogs',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // Add any other headers as needed
                        },
                        body: JSON.stringify({
                            page_number: 1,
                            page_size: 10,
                        }), // Replace with your request data
                    },
                );

                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data.data); // Assuming 'data' contains the list of blogs
                } else {
                    console.error('Error fetching data:', response.statusText);
                    setBlogs([]);
                }
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
                setBlogs([]);
            }
        }

        fetchData(); // Call the async function immediately
    }, []); // Empty dependency array to run this effect once on mount
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        // const options = { day: 'numeric', month: 'short', year: 'numeric' };

        const day = date.getDate();
        const month = date.toLocaleDateString(undefined, { month: 'short' });
        const year = date.getFullYear();

        return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    };

    const getOrdinalSuffix = (number: any) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        return suffixes[lastDigit] || suffixes[lastTwoDigits] || suffixes[0];
    };
    function shorten(text: any, max: any) {
        return text && text.length > max
            ? text.slice(0, max).split(' ').slice(0, -1).join(' ')
            : text;
    }
    console.log('mn', blogs);
    return (
        <div>
            {blogs.map((blog, index) => (
                <div key={blog._id}>
                    <Link href={`/blog/${blog?._id}`}>
                        <div className="Allcards" key={index}>
                            <h3 className="mt-2 mb-2 lg:mt-4 text-3xl lg:text-3xl font-bold ">
                                {blog.title}
                            </h3>
                            <p className="mb-2">
                                Published on&nbsp;{formatDate(blog.uploadDate)}
                                &nbsp;by
                                <span className="text-danger ml-2 font-bold">
                                    Jaya Joshi
                                </span>
                            </p>
                            <div className="imagecardanddescription">
                                <Image
                                    src={
                                        'https://task.appsdeployer.com/api/' +
                                        blog.titleImage
                                    }
                                    fill
                                    alt="placeholder-blog"
                                    className="object-fit"
                                />

                                <p className="text-xl">
                                    {shorten(blog.description, 195)}

                                    <br />
                                    <span className="text-danger font-bold">
                                        Read More...
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Link>

                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Blog;
