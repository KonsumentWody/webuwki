import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './post.scss'; // Brakujący import!

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <article className="post-view">
            <Link to="/" className="back-link" style={{ display: 'inline-block', marginBottom: '2rem', color: '#0984e3', fontWeight: 600 }}>
                &larr; Wróć do strony głównej
            </Link>

            <header>
                <h1>Tytuł artykułu o ID: {id}</h1>
                <div className="meta">
                    <span>Autor: Admin</span>
                    <span>•</span>
                    <span>Opublikowano: 8 marca 2026</span>
                </div>
            </header>

            <div className="post-content">
                <p>Tutaj znajdzie się pełna treść Twojego posta o identyfikatorze <strong>{id}</strong>.</p>
                <p>Teraz ten komponent korzysta już poprawnie z pliku <code>post.scss</code>, więc wszystkie marginesy, cienie i animacje wczytywania (fadeIn) zadziałają automatycznie!</p>
            </div>
        </article>
    );
};

export default PostPage;