import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Post, User, Comment } from '../../types';
import './post.scss';

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        // 1. Pobierz dane posta
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then((postData: Post) => {
                setPost(postData);
                // 2. Pobierz dane autora na podstawie userId z posta
                return fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
            })
            .then(res => res.json())
            .then(userData => setUser(userData));

        // 3. Pobierz komentarze do posta
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(res => res.json())
            .then(commentData => setComments(commentData));
    }, [id]);

    if (!post) return <p>Ładowanie...</p>;

    return (
        <article className="post-view">
            <Link to="/" className="back-link">← Wróć do listy</Link>

            <header>
                <h1>{post.title}</h1>
                <div className="meta">
                    {user && <span>Autor: <strong>{user.name}</strong> ({user.email})</span>}
                </div>
            </header>

            <div className="post-content">
                <p>{post.body}</p>
            </div>

            <section className="comments-section" style={{ marginTop: '3rem' }}>
                <h3>Komentarze ({comments.length})</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {comments.map(comment => (
                        <li key={comment.id} style={{ background: '#fff', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                            <strong>{comment.email}</strong> napisał:
                            <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>{comment.body}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
};

export default PostPage;