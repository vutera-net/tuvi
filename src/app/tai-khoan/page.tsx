import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Tài khoản | Harmony Tử Vi',
  description: 'Xem các lá số Tử Vi đã lưu của bạn.',
}

const ANMENH_URL = 'https://anmenh.vutera.net'

export default async function TaiKhoanPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/dang-nhap?next=/tai-khoan')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      createdAt: true,
      charts: {
        orderBy: { createdAt: 'desc' },
        take: 20,
        select: {
          id: true,
          label: true,
          gender: true,
          birthDate: true,
          createdAt: true,
        },
      },
    },
  })

  if (!user) redirect('/dang-nhap')

  const memberSince = new Date(user.createdAt).toLocaleDateString('vi-VN', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="border-b border-red-100 bg-white py-10">
        <div className="mx-auto max-w-4xl px-4">
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
            Tài Khoản
          </p>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            {user.name || user.email}
          </h1>
          <p className="mt-1 text-sm text-gray-500">Thành viên từ {memberSince}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">

          {/* Saved charts */}
          <div className="md:col-span-2">
            <h2 className="mb-4 font-serif text-xl font-bold text-gray-900">
              Lá số đã lưu ({user.charts.length})
            </h2>

            {user.charts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center">
                <p className="text-4xl mb-3">⭐</p>
                <p className="font-medium text-gray-700">Chưa có lá số nào</p>
                <p className="mt-1 text-sm text-gray-500">Lập lá số Tử Vi để lưu lại kết quả</p>
                <Link
                  href="/tu-vi"
                  className="mt-4 inline-block rounded-full px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  Lập lá số →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {user.charts.map((chart) => {
                  const bd = chart.birthDate as { day?: number; month?: number; year?: number } | null
                  const bdText = bd ? `${bd.day}/${bd.month}/${bd.year}` : '—'
                  const createdAt = new Date(chart.createdAt).toLocaleDateString('vi-VN')
                  return (
                    <div
                      key={chart.id}
                      className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{chart.label}</p>
                        <p className="text-sm text-gray-500">
                          {(chart.gender as string) === 'male' ? 'Nam' : 'Nữ'} · Sinh {bdText} · Lưu {createdAt}
                        </p>
                      </div>
                      <Link
                        href="/tu-vi"
                        className="text-sm font-medium hover:underline"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        Xem lại →
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* AnMenh CTA */}
            <div
              className="rounded-2xl p-5 text-white"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #C41E3A)' }}
            >
              <p className="text-xs font-medium uppercase tracking-wide opacity-75">AnMenh</p>
              <p className="mt-1 font-bold">Phân tích cá nhân hóa sâu hơn</p>
              <p className="mt-1 text-xs opacity-75">
                Theo giờ sinh · Chu kỳ Đại Vận · Cảnh báo cá nhân
              </p>
              <a
                href={ANMENH_URL}
                className="mt-4 inline-block rounded-full bg-white px-4 py-2 text-xs font-semibold transition hover:bg-yellow-50"
                style={{ color: '#7C3AED' }}
              >
                Tạo hồ sơ tại AnMenh →
              </a>
            </div>

            {/* Account info */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-gray-700">Tài khoản</p>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
              <div className="mt-4 space-y-2">
                <Link
                  href="/tu-vi"
                  className="block text-center rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-red-50"
                  style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                >
                  Lập lá số mới
                </Link>
                <form action="/api/auth/signout" method="POST">
                  <button
                    type="submit"
                    className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
                  >
                    Đăng xuất
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
