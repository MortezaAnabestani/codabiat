import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Book, FileText, LogOut, Home } from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: 'داشبورد', href: '/', icon: Home },
    { name: 'آموزش‌ها', href: '/courses', icon: Book },
    { name: 'مقالات', href: '/articles', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-dark-50" dir="rtl">
      {/* Sidebar */}
      <aside className="fixed right-0 top-0 h-full w-64 bg-dark-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">کدبیات</span>
          </h1>
        </div>

        <nav className="px-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-dark-900'
                    : 'hover:bg-dark-800'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-dark-400">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-dark-800 rounded-md transition-colors"
              title="خروج"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="mr-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
