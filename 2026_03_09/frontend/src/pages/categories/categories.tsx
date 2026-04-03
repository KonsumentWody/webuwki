import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface Post {
    id: number;
    tytul: string;
    tresc: string;
}

interface Category {
    id: number;
    nazwa: string;
    wpisy?: Post[];
}

const Categories: React.FC = () => {
    const { data: categories, isLoading, error } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: () => fetch('http://localhost:3000/categories').then(res => {
            if (!res.ok) throw new Error('Błąd pobierania kategorii');
            return res.json();
        }),
    });

    if (isLoading) return <div className="container">Ładowanie kategorii...</div>;
    if (error) return <div className="container">Wystąpił błąd: {(error as Error).message}</div>;

    return (
        <div>
            <h2>Kategorie w bazie</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                {categories?.map((category) => (
                    <div
                        key={category.id}
                        style={{
                            background: '#fff',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            border: '1px solid #eee'
                        }}
                    >
                        {category.nazwa}
                        <small style={{ marginLeft: '8px', color: '#888' }}>
                            ({category.wpisy?.length || 0})
                        </small>
                    </div>
                ))}
                {categories?.length === 0 && <p>Brak zdefiniowanych kategorii.</p>}
            </div>
        </div>
    );
};
export default Categories;