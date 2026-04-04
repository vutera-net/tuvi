# TuVi Ngay Moi - Production Deployment Checklist

**Target Environment:** Vercel (Serverless)
**Database:** Neon PostgreSQL (Serverless)
**Cache:** Upstash Redis (Serverless)
**Current Status:** Ready for deployment

---

## Phase 1: Infrastructure Setup

### Vercel Project Setup
- [ ] Create Vercel project (connect GitHub repo)
- [ ] Configure production domain (tuvi-ngay-moi.vercel.app or custom)
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking integration (Sentry)
- [ ] Configure Git deployment (auto-deploy on push to main)

**Steps:**
```bash
# Vercel CLI login and link
vercel login
vercel link

# Deploy
vercel deploy --prod
```

### Neon PostgreSQL Setup
- [ ] Create Neon project
- [ ] Create production database
- [ ] Get connection string (DATABASE_URL)
- [ ] Enable SSL (required for Neon)
- [ ] Set connection pool (25 connections for Vercel)
- [ ] Configure backup retention (7 days)

**Connection String Format:**
```
postgresql://user:password@host.neon.tech/dbname?sslmode=require
```

### Upstash Redis Setup
- [ ] Create Upstash Redis database (US-East region)
- [ ] Get REST API URL and token
- [ ] Set TTL policy (86400 seconds = 1 day)
- [ ] Enable HTTPS

**Environment Variables:**
```
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## Phase 2: Environment Configuration

### Vercel Environment Variables
Create in Vercel Dashboard -> Settings -> Environment Variables

**Database & Auth:**
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<generate new 32+ char random string>
NEXTAUTH_URL=https://yourdomain.com
AUTH_TRUST_HOST=true
```

**Stripe (Production Keys):**
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY=price_...
NEXT_PUBLIC_STRIPE_VIP_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_VIP_YEARLY=price_...
```

**Google OAuth (Optional):**
```
GOOGLE_CLIENT_ID=<get from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<get from Google Cloud Console>
```

**Cache & Analytics:**
```
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
SENTRY_DSN=https://<key>@sentry.io/<project>
NEXT_PUBLIC_SENTRY_DSN=<same as above>
```

**Application Config:**
```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_NAME=TuVi Ngay Moi
CRON_SECRET=<generate new random string for cron jobs>
```

---

## Phase 3: Database Migration & Seeding

### Run Prisma Migrations

```bash
# Connect to production database first
export DATABASE_URL=<your-neon-connection-string>

# Run migrations
npx prisma migrate deploy

# Or if first time deploying:
npx prisma migrate reset --skip-generate --skip-seed

# Seed initial data
npx prisma db seed
```

### Verify Database
```bash
# Check connection
npx prisma db push

# View schema
npx prisma studio
```

---

## Phase 4: Stripe Configuration

### Create Stripe Products & Prices

1. **Premium Tier:**
   - Monthly: 99,000 VND (~$4 USD)
   - Yearly: 799,000 VND (~$32 USD)

2. **VIP Tier:**
   - Monthly: 199,000 VND (~$8 USD)
   - Yearly: 1,499,000 VND (~$60 USD)

### Setup Webhook Endpoint

1. Go to Stripe Dashboard -> Developers -> Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Subscribe to events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Get webhook signing secret
5. Add to Vercel environment: `STRIPE_WEBHOOK_SECRET`

### Test Webhook

```bash
# Using Stripe CLI
stripe listen --forward-to https://yourdomain.com/api/webhooks/stripe
```

---

## Phase 5: Custom Domain Setup

### Configure Domain DNS

For Vercel-provided domain:
- No additional setup needed

For custom domain:
1. Add domain in Vercel project settings
2. Update DNS provider with Vercel nameservers OR CNAME:
   - CNAME: `cname.vercel.com`
3. SSL automatically provisioned within 24 hours
4. Enable in Vercel dashboard

---

## Phase 6: Pre-Launch Testing

### Performance Testing
- [ ] Run Lighthouse audit (target: 90+)
  ```bash
  npm run build
  npx lighthouse https://yourdomain.com --view
  ```

- [ ] Check Core Web Vitals (Vercel Analytics)
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

- [ ] Load test API endpoints
  ```bash
  npx artillery quick --count 100 --num 10 https://yourdomain.com/api/calendar
  ```

### Functional Testing
- [ ] Test authentication flow
  - Sign up with email/password
  - Google OAuth (if configured)
  - Login and logout

- [ ] Test payment flow
  - Create checkout session (free -> premium)
  - Complete Stripe payment (use test cards)
  - Verify subscription updated
  - Test webhook (payment_succeeded)

- [ ] Test feature gating
  - Free tier: Limited Tu Vi charts (3/month)
  - Premium tier: Unlimited Tu Vi, age filter enabled
  - VIP tier: All features, PDF export available

- [ ] Test core features
  - Calendar conversion (lunar/solar)
  - Tu Vi chart generation
  - Date selection/Ngay Tot
  - Feng Shui analysis
  - Daily horoscope

### Security Testing
- [ ] SSL certificate valid
- [ ] HSTS header set
- [ ] CSP headers configured
- [ ] No sensitive data in errors
- [ ] Rate limiting configured

**Check headers:**
```bash
curl -I https://yourdomain.com | grep -E "Strict-Transport|Content-Security"
```

---

## Phase 7: Monitoring & Analytics

### Sentry Configuration
1. Create Sentry project
2. Get DSN
3. Add to Vercel environment
4. Test error reporting

### Google Search Console
- [ ] Add property
- [ ] Submit sitemap
  ```
  https://yourdomain.com/sitemap.xml
  ```
- [ ] Request indexing for key pages
- [ ] Monitor search performance

### Google Analytics 4
- [ ] Create GA4 property
- [ ] Add tracking ID to app
- [ ] Test tracking
- [ ] Set up conversion goals

### Vercel Analytics
- [ ] Enable in project settings
- [ ] Monitor:
  - Response times
  - Error rates
  - Edge cache hit rates

---

## Phase 8: Launch Checklist

### Final Verification
- [ ] All tests passing
- [ ] No build warnings
- [ ] Environment variables set
- [ ] Database backups configured
- [ ] Monitoring active
- [ ] Uptime monitoring configured

### Marketing Launch
- [ ] Landing page ready
- [ ] Social media accounts created
- [ ] Initial content/blog posts written
- [ ] Email list signup enabled
- [ ] Analytics tracking verified

### Post-Launch Monitoring (First Week)
- [ ] Monitor Sentry for errors
- [ ] Check Vercel Analytics for performance
- [ ] Monitor Stripe payments
- [ ] Verify cron jobs running
- [ ] Check database performance
- [ ] Monitor Redis cache hit rates

---

## Phase 9: Ongoing Operations

### Daily Checks
- Error rate (< 0.1%)
- Response time (P95 < 2s)
- Stripe payments processing
- Cron jobs running successfully

### Weekly Tasks
- Review analytics
- Check user feedback
- Monitor performance metrics
- Review error logs

### Monthly Tasks
- Backup verification
- Database optimization
- Cost analysis (Vercel, Neon, Upstash)
- Security updates

---

## Deployment Commands Reference

```bash
# Build locally
npm run build

# Deploy to Vercel
vercel deploy --prod

# View logs
vercel logs

# Database operations
npx prisma migrate deploy
npx prisma db push
npx prisma studio

# Test mode
npm run dev
```

---

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check Prisma
npx prisma db push --skip-generate
```

### Stripe Webhook Not Triggering
- Verify webhook endpoint URL is accessible
- Check Stripe webhook signature verification
- Ensure `STRIPE_WEBHOOK_SECRET` is correct

### Payment Not Processing
- Verify Stripe API keys are correct
- Check price IDs exist in Stripe Dashboard
- Confirm webhook is receiving events
- Check database for order records

### Performance Issues
- Check Vercel Analytics for bottlenecks
- Monitor database query times
- Check Redis cache hit rates
- Review Edge function execution time

---

## Estimated Costs (Monthly)

| Service | Tier | Est. Cost |
|---------|------|-----------|
| Vercel | Pro | $20 |
| Neon PostgreSQL | Pro | $15 |
| Upstash Redis | Starter | $5 |
| Stripe | % Commission | Variable |
| Domain | .com | $12/year |
| **Total** | | ~$50/month |

---

## Success Criteria

✅ Website accessible at domain
✅ Database migrations completed
✅ Stripe payments processing
✅ Authentication working
✅ Analytics installed
✅ Error tracking active
✅ Page load time < 2.5s
✅ Uptime monitoring configured
✅ Backup strategy verified

---

**Deployment Owner:** [Your Name]
**Last Updated:** 2026-03-28
**Next Review:** After first week in production
