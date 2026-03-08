import React from 'react';

const Categories: React.FC = () => {
    const cats = ['Frontend', 'Backend', 'UI/UX', 'DevOps'];

    return (
        <div>
            <h2>Kategorie</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                {cats.map(c => (
                    <div key={c} style={{ background: '#fff', padding: '1rem 2rem', borderRadius: '50px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        {c}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;