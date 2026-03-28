import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="max-w-md">
        <div className="mb-6 text-8xl">404</div>
        <h1 className="mb-3 text-3xl font-bold text-gray-800">Trang không tìm thấy</h1>
        <p className="mb-8 text-gray-600">
          Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Trang này có thể đã bị xóa hoặc địa chỉ
          URL không chính xác.
        </p>

        <div className="flex gap-4">
          <Link
            href="/"
            className="flex-1 rounded-lg py-3 text-center font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Về trang chủ
          </Link>
          <Link
            href="/lich"
            className="flex-1 rounded-lg border-2 border-gray-300 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Lịch Vạn Niên
          </Link>
        </div>

        <div className="mt-12 text-6xl text-gray-200">☯</div>
      </div>
    </div>
  )
}
