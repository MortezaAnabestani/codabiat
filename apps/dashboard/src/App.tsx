import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import CoursesPage from './pages/CoursesPage';
import ArticlesPage from './pages/ArticlesPage';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          isAuthenticated ? (
            <DashboardLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="articles" element={<ArticlesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
