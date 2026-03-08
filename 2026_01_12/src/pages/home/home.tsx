import React from 'react';
import { Link } from 'react-router-dom';
// Poprawiony import typu:
import type { Post } from '../../types';
import './home.scss';

const MOCK_POSTS: Post[] = [
    {
        id: '1',
        title: 'React Server Components',
        excerpt: 'Nowa era budowania aplikacji...',
        category: 'Frontend',
        date: '08.03.2026',
        content: 'Pełna treść posta o React Server Components.'
    },
    {
        id: '2',
        title: 'TypeScript 5.0 Tips',
        excerpt: 'Jak pisać bezpieczniejszy kod...',
        category: 'Backend',
        date: '07.03.2026',
        content: 'Pełna treść posta o TypeScript 5.0.'
    }
];

const Home: React.FC = () => {
    return (
        <div className="home-grid">
            {MOCK_POSTS.map(post => (
                <article key={post.id} className="post-card">
                    <div className="post-thumb" />
                    <div className="post-body">
                        <small>{post.category} • {post.date}</small>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <Link to={`/post/${post.id}`} className="btn-link">Czytaj dalej →</Link>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default Home;