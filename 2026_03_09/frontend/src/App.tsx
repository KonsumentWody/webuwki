import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/home';
import PostPage from './pages/post/post';
import Categories from './pages/categories/categories';
import './styles/global.scss';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="post/:id" element={<PostPage />} />
                    <Route path="categories" element={<Categories />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;