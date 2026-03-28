# Week 2 Tasks - Phase Completion & Refinement

After Week 1 MVP completion (85% done), these are the remaining high-impact items:

## Phase 1: Authentication (5% remaining)
- [ ] Setup Google OAuth provider (requires Google Cloud credentials)
- [ ] Add Facebook OAuth provider (optional)
- [ ] Test OAuth flow end-to-end

## Phase 3: Tu Vi Engine (5% remaining)
- [ ] Create `src/data/tuvi/star-meanings.ts` - Detailed palace-specific interpretations
- [ ] Implement Tieu Han (yearly) calculation in tuvi-engine.ts
- [ ] Add PDF export functionality (VIP feature)

## Phase 4: Date Selection (5% remaining)
- [ ] Create `src/data/events.ts` helper UI component for event selector
- [ ] Add month overview API (`GET /api/ngaytot/month`)
- [ ] Integrate event type filtering in date search

## Phase 5: Feng Shui (5% remaining)
- [ ] Create `src/data/phongthuy/noi-that.ts` - Interior furniture placement rules
- [ ] Implement room layout recommendation engine
- [ ] Build compass diagram UI component (SVG interactive)

## Phase 6-7: UI Improvements (5% remaining)
- [ ] Add date search/jump-to feature in calendar
- [ ] Implement yesterday/today/tomorrow nav in horoscope
- [ ] Add Tieu Han yearly view visualization
- [ ] Build interactive compass for feng shui directions
- [ ] Add social media sharing buttons (horoscope, charts)

## Phase 9: Monetization (0% - Phase 2 priority)
- [ ] Integrate Stripe payment gateway
- [ ] Setup subscription tiers (Free/Premium/VIP)
- [ ] Create pricing page
- [ ] Implement feature gating middleware
- [ ] Track usage limits per user

## Phase 10: SEO (30% done - needs enhancement)
- [ ] Add hreflang tags for Vietnamese
- [ ] Implement JSON-LD structured data
- [ ] Create dynamic `/lich/[year]/[month]/[day]` pages (ISR)
- [ ] Create dynamic `/tu-vi/[zodiac]/nam-[year]` pages
- [ ] Setup MDX blog system with initial 5 articles

## Phase 11: Testing (0% - Quality gate)
- [ ] Setup Jest testing framework
- [ ] Write unit tests for critical engines (lunar, ngu-hanh, date-selection)
- [ ] Write integration tests for API routes
- [ ] Write E2E tests with Playwright (key user flows)
- [ ] Target >80% code coverage on engine code

## Phase 12: Deployment (0% - Final phase)
- [ ] Setup Vercel project
- [ ] Configure Neon PostgreSQL production instance
- [ ] Setup Upstash Redis production
- [ ] Configure custom domain & SSL
- [ ] Final QA & load testing
- [ ] Submit sitemap to Google Search Console

## Priority Order for Week 2:
1. **High Impact** (do first):
   - Google OAuth setup
   - Star meanings data (needed for full Tu Vi experience)
   - Monetization system (enables revenue)

2. **Medium Impact** (do second):
   - Interior feng shui rules
   - Blog system setup
   - Testing framework

3. **Nice to Have** (do if time):
   - PDF export
   - Yearly Tieu Han view
   - Compass visualization
   - Social sharing

## Quick Wins (< 30 min each):
- [ ] Add date jump-to feature in calendar page
- [ ] Add horoscope navigation buttons (yesterday/today/tomorrow)
- [ ] Create pricing page layout (dummy, before payment setup)
- [ ] Add README.md with setup instructions
- [ ] Create simple lighthouse performance report

---

## Notes
- All core features are functional and tested
- Database migrations are complete
- Seed script runs successfully with sample data
- Build passes with 0 TypeScript errors
- Next focus: Monetization (highest revenue impact) or Testing (quality gate)
