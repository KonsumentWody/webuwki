import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Post } from '../../types';
import './home.scss';

const fetchPosts = async (): Promise<Post[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
};

const Home: React.FC = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) return <div className="container">Ładowanie postów...</div>;
    if (error) return <div className="container">Wystąpił błąd podczas pobierania danych.</div>;

    return (
        <div className="home-grid">
            {posts?.slice(0, 20).map(post => (
                <article key={post.id} className="post-card">
                    <div className="post-thumb" />
                    <div className="post-body">
                        <small>Post #{post.id}</small>
                        <h3>{post.title}</h3>
                        <p>{post.body.substring(0, 100)}...</p>
                        <Link to={`/post/${post.id}`} className="btn-link">Czytaj więcej →</Link>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default Home;