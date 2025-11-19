export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">داشبورد</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-dark-600 mb-2">کل آموزش‌ها</h3>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-dark-600 mb-2">کل مقالات</h3>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-dark-600 mb-2">کل کاربران</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
