export default function CoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">آموزش‌ها</h1>
        <button className="btn btn-primary">
          افزودن آموزش جدید
        </button>
      </div>

      <div className="card p-6">
        <p className="text-dark-500 text-center">هنوز آموزشی ایجاد نشده است</p>
      </div>
    </div>
  );
}
