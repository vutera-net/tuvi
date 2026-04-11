# Deployment Checklist - Harmony Tử Vi

**Target:** Vercel + Neon PostgreSQL + Upstash Redis  
**Cập nhật:** 8 tháng 4, 2026

---

## Phase 1: Infrastructure Setup

### Vercel
- [ ] Tạo Vercel project (kết nối GitHub repo)
- [ ] Bật Vercel Analytics
- [ ] Cấu hình Git deploy (auto-deploy khi push main)
- [ ] Setup Sentry integration

```bash
vercel login
vercel link
vercel deploy --prod
```

### Neon PostgreSQL
- [ ] Tạo Neon project + database
- [ ] Lấy connection string (`DATABASE_URL`)
- [ ] Bật SSL (bắt buộc với Neon)
- [ ] Connection pool: 25 connections (cho Vercel)
- [ ] Backup retention: 7 ngày

```
postgresql://user:password@host.neon.tech/dbname?sslmode=require
```

### Upstash Redis
- [ ] Tạo Upstash Redis database (US-East region)
- [ ] Lấy REST URL + token
- [ ] TTL policy: 86400s (1 ngày)

---

## Phase 2: Environment Variables

Thêm vào Vercel Dashboard → Settings → Environment Variables:

```bash
# Database & Auth
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<random 32+ chars>
NEXTAUTH_URL=https://yourdomain.com
AUTH_TRUST_HOST=true

# Cache
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Stripe (production keys)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY=price_...
NEXT_PUBLIC_STRIPE_VIP_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_VIP_YEARLY=price_...

# Google OAuth (tùy chọn)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Analytics & Monitoring
SENTRY_DSN=https://...
NEXT_PUBLIC_SENTRY_DSN=https://...

# App Config
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_NAME=Harmony Tử Vi
CRON_SECRET=<random string>
```

---

## Phase 3: Database Migration

```bash
# Kết nối production DB
export DATABASE_URL=<neon-connection-string>

# Chạy migrations
npx prisma migrate deploy

# Verify
npx prisma db push --skip-generate
```

---

## Phase 4: Stripe Setup

### Tạo Products & Prices trong Stripe Dashboard

| Tier | Billing | Giá VND | ~USD |
|------|---------|---------|------|
| Premium | Monthly | 99,000 | ~$4 |
| Premium | Yearly | 799,000 | ~$32 |
| VIP | Monthly | 199,000 | ~$8 |
| VIP | Yearly | 1,499,000 | ~$60 |

### Webhook Endpoint

1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Subscribe events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Lấy signing secret → thêm vào `STRIPE_WEBHOOK_SECRET`

---

## Phase 5: Custom Domain

1. Thêm domain trong Vercel project settings
2. Cấu hình DNS: CNAME `cname.vercel.com`
3. SSL auto-provisioned trong vòng 24h

---

## Phase 6: Pre-Launch Testing

### Performance
- [ ] Lighthouse audit (target: 90+ tất cả categories)
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Load test API: `npx artillery quick --count 100 --num 10 https://domain.com/api/calendar`

### Functional
- [ ] Auth flow: đăng ký, đăng nhập, đăng xuất
- [ ] Payment flow: checkout → Stripe → subscription update → webhook
- [ ] Feature gating: Free (3 lá số/tháng), Premium (không giới hạn), VIP
- [ ] Tất cả 6 core features hoạt động

### Security
- [ ] SSL certificate valid
- [ ] HSTS header
- [ ] CSP headers
- [ ] Không lộ sensitive data trong error messages

---

## Phase 7: Monitoring

- [ ] Sentry: tạo project, thêm DSN vào env
- [ ] Google Search Console: add property, submit sitemap
  ```
  https://yourdomain.com/sitemap.xml
  ```
- [ ] Google Analytics 4: tạo property, thêm tracking ID
- [ ] Vercel Analytics: bật trong project settings

---

## Phase 8: Launch Checklist

- [ ] Build passing (0 errors)
- [ ] Tất cả env vars đã set
- [ ] Database migrations applied
- [ ] Stripe payments hoạt động (test card)
- [ ] Cron job chạy được (`/api/cron/daily-horoscope`)
- [ ] Monitoring active
- [ ] Sitemap submitted to Google

---

## Chi phí ước tính (hàng tháng)

| Dịch vụ | Tier | Chi phí |
|---------|------|---------|
| Vercel | Pro | $20 |
| Neon PostgreSQL | Pro | $15 |
| Upstash Redis | Starter | $5 |
| Domain (.com) | - | ~$1/tháng |
| Stripe | % commission | Variable |
| **Tổng** | | **~$41/tháng** |

Break-even: ~40 Premium subscribers/tháng

---

## Troubleshooting

**Database không connect:**
```bash
psql $DATABASE_URL -c "SELECT 1"
```

**Stripe webhook không trigger:**
- Verify endpoint URL accessible
- Check `STRIPE_WEBHOOK_SECRET` đúng
- Dùng Stripe CLI để test: `stripe listen --forward-to https://domain.com/api/webhooks/stripe`

**Performance chậm:**
- Check Vercel Analytics
- Monitor Redis cache hit rates
- Review database query times (Prisma)
