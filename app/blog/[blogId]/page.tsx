// pages/blogs/index.tsx

import React from 'react';
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next';

interface Blog {
    _id: number;
    title: string;
    content: string;
    created_on: string;
    blog_content: any;
}

interface BlogListingPageProps {
    blog: Blog;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;
    const { blogId } = params as { blogId: string };
    console.log('object');
    try {
        const response = await fetch(
            `https://task.appsdeployer.com/api/web/blog/${blogId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers as needed
                },
            },
        );

        if (!response.ok) {
            return {
                notFound: true, // Handle 404 error
            };
        }

        const data = await response.json();
        const blog = data.data as Blog;

        return {
            props: {
                blog,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            notFound: true, // Handle 404 error
        };
    }
};
const BlogListingPage: React.FC<BlogListingPageProps> = ({
    blog,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString(undefined, { month: 'short' });
        const year = date.getFullYear();
        return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    };

    const getOrdinalSuffix = (number: number) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;
        return suffixes[lastDigit] || suffixes[lastTwoDigits] || suffixes[0];
    };
    console.log('jjf');
    return (
        <div>
            <h1>Blog Listing Page</h1>
            <ul>
                {blog?.map((blogItem: any) => (
                    <div className="container" key={blogItem._id}>
                        <div className="row ">
                            <div className="col-sm-8 container">
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <h1 className="mb-2">{blogItem.title}</h1>
                                </div>
                                <p className="mb-2">
                                    Published on&nbsp;
                                    {formatDate(blogItem.created_on)}
                                    &nbsp;
                                    <span className="text-danger ml-2 font-bold">
                                        Jaya Joshi
                                    </span>
                                </p>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: blogItem.blog_content,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default BlogListingPage;
