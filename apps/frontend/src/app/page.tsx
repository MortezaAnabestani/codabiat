import Link from 'next/link';
import { Book, FileText, Code, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-dark-100">
        <nav className="container-custom py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              <span className="text-primary">کدبیات</span>
            </h1>

            <div className="flex items-center gap-6">
              <Link href="/courses" className="hover:text-primary transition-colors">
                آموزش‌ها
              </Link>
              <Link href="/articles" className="hover:text-primary transition-colors">
                مقالات
              </Link>
              <Link href="/auth/login" className="btn btn-outline">
                ورود
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-dark-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              یادگیری برنامه‌نویسی و
              <br />
              <span className="text-primary">ادبیات الکترونیک</span>
            </h2>
            <p className="text-xl text-dark-600 mb-10">
              پلتفرمی برای آموزش تعاملی برنامه‌نویسی و کشف دنیای ادبیات دیجیتال
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link href="/courses" className="btn btn-primary text-lg">
                شروع یادگیری
              </Link>
              <Link href="/about" className="btn btn-outline text-lg">
                درباره ما
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container-custom">
          <h3 className="text-3xl font-bold text-center mb-12">ویژگی‌های کدبیات</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-dark-900" />
              </div>
              <h4 className="text-xl font-bold mb-3">اجرای کد در مرورگر</h4>
              <p className="text-dark-600">
                کدهای آموزشی را مستقیماً در مرورگر اجرا کنید و نتیجه را مشاهده کنید
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-dark-900" />
              </div>
              <h4 className="text-xl font-bold mb-3">محتوای جامع و ساختاریافته</h4>
              <p className="text-dark-600">
                آموزش‌های گام‌به‌گام از مبتدی تا پیشرفته در قالب کتاب‌های تعاملی
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-dark-900" />
              </div>
              <h4 className="text-xl font-bold mb-3">ادبیات الکترونیک</h4>
              <p className="text-dark-600">
                آشنایی با هنر ادبی دیجیتال و تعامل میان کد، متن و خلاقیت
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900 text-white">
        <div className="container-custom text-center">
          <h3 className="text-3xl font-bold mb-6">آماده شروع یادگیری هستید؟</h3>
          <p className="text-xl mb-8 text-dark-300">
            همین حالا ثبت‌نام کنید و به جامعه یادگیرندگان ما بپیوندید
          </p>
          <Link href="/auth/register" className="btn btn-primary text-lg">
            ثبت‌نام رایگان
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-dark-100">
        <div className="container-custom text-center text-dark-600">
          <p>© {new Date().getFullYear()} کدبیات. تمامی حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  );
}
