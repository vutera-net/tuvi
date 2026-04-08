export function CtaBanner() {
  return (
    <div className="not-prose my-12 overflow-hidden rounded-2xl bg-zinc-900 text-white shadow-2xl">
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }} />

      <div className="relative px-8 py-10 md:px-12">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: 'var(--color-secondary)' }}
        />

        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-yellow-400">
              Công cụ miễn phí
            </p>
            <h3 className="mb-3 font-serif text-2xl font-bold leading-snug">
              Bạn thuộc mệnh gì?<br />Năm nay vận hạn ra sao?
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              Nhập ngày sinh để xem mệnh Ngũ Hành, lá số Tử Vi cá nhân và dự báo vận hạn hôm nay — ngay lập tức, không cần đăng ký.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:min-w-[180px]">
            <a
              href="/xem-menh"
              className="block rounded-full py-3 text-center text-sm font-bold text-zinc-900 transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              Xem Mệnh Ngũ Hành
            </a>
            <a
              href="/tu-vi"
              className="block rounded-full border border-zinc-600 py-3 text-center text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white"
            >
              Lập Lá Số Tử Vi
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
