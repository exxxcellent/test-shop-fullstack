import { Route, Routes } from 'react-router';
import HomePage from './pages/home';
import CategoryPage from './pages/category';

export default function App() {
    return (
        <div className="flex flex-col min-h-screen gap-2">
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/category/:id"
                    element={<CategoryPage />}
                />
            </Routes>
        </div>
    );
}
