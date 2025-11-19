import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, accessToken } = response.data.data;

      // بررسی نقش ادمین
      if (user.role !== 'admin') {
        setError('شما دسترسی به پنل مدیریت ندارید');
        setLoading(false);
        return;
      }

      login(user, accessToken);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطایی رخ داده است');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-50">
      <div className="max-w-md w-full">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            پنل مدیریت <span className="text-primary">کدبیات</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                ایمیل
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                رمز عبور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'در حال ورود...' : 'ورود'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
