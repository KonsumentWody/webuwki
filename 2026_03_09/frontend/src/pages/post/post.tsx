import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './post.scss';


interface Comment {
    id: number;
    autor: string;
    tresc: string;
    wpisId: number;
}

interface Post {
    id: number;
    tytul: string;
    tresc: string;
    kategoriaId?: number;
    kategoria?: { nazwa: string };
    komentarze?: Comment[];
}

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();


    const postQuery = useQuery<Post>({
        queryKey: ['post', id],
        queryFn: () => fetch(`http://localhost:3000/posts/${id}`).then(res => {
            if (!res.ok) throw new Error('Nie znaleziono posta');
            return res.json();
        }),
    });

    if (postQuery.isLoading) return <div className="container">Ładowanie posta...</div>;
    if (postQuery.error) return <div className="container">Wystąpił błąd podczas ładowania.</div>;

    const post = postQuery.data;

    return (
        <article className="post-view">
            <Link to="/" className="back-link">← Wróć do listy</Link>

            <header>

                <h1>{post?.tytul}</h1>
                <div className="meta">
                    Kategoria: <strong>{post?.kategoria?.nazwa || 'Ogólna'}</strong>
                </div>
            </header>

            <div className="post-content">

                <p>{post?.tresc}</p>
            </div>

            <section className="comments-section">
                <h3>Komentarze ({post?.komentarze?.length || 0})</h3>
                <div className="comments-list">
                    {post?.komentarze?.map(comment => (
                        <div key={comment.id} className="comment-item">
                            <strong>{comment.autor}</strong>
                            <p>{comment.tresc}</p>
                        </div>
                    ))}
                    {post?.komentarze?.length === 0 && <p>Brak komentarzy. Bądź pierwszy!</p>}
                </div>
            </section>
        </article>
    );
};


export default PostPage;