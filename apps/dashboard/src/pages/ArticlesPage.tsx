export default function ArticlesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">مقالات</h1>
        <button className="btn btn-primary">
          افزودن مقاله جدید
        </button>
      </div>

      <div className="card p-6">
        <p className="text-dark-500 text-center">هنوز مقاله‌ای ایجاد نشده است</p>
      </div>
    </div>
  );
}
