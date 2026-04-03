import React from 'react';

import { Link } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import './home.scss';


interface Post {
    id: number;
    tytul: string;
    tresc: string;
    kategoria?: {
        nazwa: string;
    };
}

const fetchPosts = async (): Promise<Post[]> => {

    const res = await fetch('http://localhost:3000/posts');
    if (!res.ok) throw new Error('Błąd sieci');
    return res.json();
};

const Home: React.FC = () => {
    const { data: posts, isLoading, error } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) return <div className="container">Ładowanie postów...</div>;
    if (error) return <div className="container">Wystąpił błąd.</div>;

    return (
        <div className="home-grid">
            {posts?.map((post) => (
                <article key={post.id} className="post-card">
                    <div className="post-thumb" />
                    <div className="post-body">
                        <small>Kategoria: {post.kategoria?.nazwa || 'Ogólna'}</small>
                        <h3>{post.tytul}</h3>
                        <p>{post.tresc.substring(0, 100)}...</p>
                        <Link to={`/post/${post.id}`} className="btn-link">Czytaj więcej →</Link>
                    </div>
                </article>
            ))}
        </div>
    );
};


export default Home;