import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Post, User, Comment } from '../../types';
import './post.scss';

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();


    const postQuery = useQuery<Post>({
        queryKey: ['post', id],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json()),
    });


    const userQuery = useQuery<User>({
        queryKey: ['user', postQuery.data?.userId],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/users/${postQuery.data?.userId}`).then(res => res.json()),
        enabled: !!postQuery.data?.userId,
    });


    const commentsQuery = useQuery<Comment[]>({
        queryKey: ['comments', id],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(res => res.json()),
    });

    if (postQuery.isLoading) return <div className="container">Ładowanie posta...</div>;

    return (
        <article className="post-view">
            <Link to="/" className="back-link">← Wróć do listy</Link>

            <header>
                <h1>{postQuery.data?.title}</h1>
                <div className="meta">
                    {userQuery.isLoading ? 'Ładowanie autora...' : (
                        <span>Autor: <strong>{userQuery.data?.name}</strong> (@{userQuery.data?.username})</span>
                    )}
                </div>
            </header>

            <div className="post-content">
                <p>{postQuery.data?.body}</p>
            </div>

            <section className="comments-section">
                <h3>Komentarze ({commentsQuery.data?.length || 0})</h3>
                {commentsQuery.isLoading ? <p>Ładowanie komentarzy...</p> : (
                    <div className="comments-list">
                        {commentsQuery.data?.map(comment => (
                            <div key={comment.id} className="comment-item">
                                <strong>{comment.email}</strong>
                                <p>{comment.body}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </article>
    );
};

export default PostPage;