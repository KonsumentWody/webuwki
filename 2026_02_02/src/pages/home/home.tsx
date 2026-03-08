import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../../types';
import './home.scss';

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <div className="home-grid">
            {posts.map(post => (
                <article key={post.id} className="post-card">
                    <div className="post-thumb" />
                    <div className="post-body">
                        <small>ID: {post.id}</small>
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