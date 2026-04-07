# PRD: Harmony Tử Vi - Phong Thuy, Tu Vi & Xem Ngay

## 1. Product Overview

**Ten san pham:** Harmony Tử Vi
**Vision:** Nen tang phong thuy, tu vi va xem ngay toan dien nhat cho nguoi Viet, ket hop tri tue co truyen voi cong nghe hien dai.
**Tagline:** "Luan menh - Chon ngay - An tam"

### Target Audience
- **Primary:** Nguoi Viet 25-55 tuoi, quan tam phong thuy/tu vi trong doi song
- **Secondary:** Gioi tre 18-30, tim hieu ban menh va xem ngay tot/xau cho su kien
- **Tertiary:** Viet kieu muon ket noi van hoa tam linh truyen thong

### Problem Statement
Cac ung dung hien tai (Lich Van Nien, lichngaytot.com) chi tap trung 1-2 tinh nang, thieu toan dien. Nguoi dung phai dung nhieu app/web khac nhau de:
- Tra lich am duong
- Xem tu vi ban menh
- Chon ngay tot xau
- Xem phong thuy nha cua

TuVi Ngay Moi giai quyet bang mot nen tang duy nhat, tich hop tat ca.

---

## 2. Core Features (6 Modules)

### Module 1: Lich Van Nien (Lunar-Solar Calendar)

**Muc dich:** Chuyen doi lich am-duong, hien thi thong tin Can Chi, tiet khi, ngay le.

**Tinh nang:**
- Chuyen doi am lich <-> duong lich (range: 1900-2100)
- Hien thi: Ngay Can Chi, Thang Can Chi, Nam Can Chi
- 24 tiet khi (Lap Xuan, Vu Thuy, Kinh Trap, Xuan Phan...)
- Ngay le am lich & duong lich Viet Nam
- Gio Hoang Dao trong ngay (12 gio Can Chi)

**Thuat toan cot loi:**
- Su dung thuat toan Ho Ngoc Duc cho chuyen doi am-duong lich
- Tinh Can Chi: Thien Can (10 can) x Dia Chi (12 chi) = chu ky 60 nam (Luc Thap Hoa Giap)
- Tinh tiet khi dua tren Sun's ecliptic longitude

**Du lieu Can Chi:**
```
Thien Can: Giap, At, Binh, Dinh, Mau, Ky, Canh, Tan, Nham, Quy
Dia Chi:   Ty, Suu, Dan, Mao, Thin, Ti, Ngo, Mui, Than, Dau, Tuat, Hoi
Ngu Hanh:  Kim, Moc, Thuy, Hoa, Tho
```

**Luc Thap Hoa Giap & Nap Am:**
```
Giap Ty - At Suu:    Hai Trung Kim  (Vang trong bien)
Binh Dan - Dinh Mao: Lo Trung Hoa   (Lua trong lo)
Mau Thin - Ky Ti:    Dai Lam Moc    (Go rung lon)
Canh Ngo - Tan Mui:  Lo Bang Tho    (Dat duong cai)
Nham Than - Quy Dau: Kiem Phong Kim (Vang mui kiem)
Giap Tuat - At Hoi:  Son Dau Hoa    (Lua tren nui)
Binh Ty - Dinh Suu:  Gian Ha Thuy   (Nuoc duoi khe)
Mau Dan - Ky Mao:    Thanh Thanh Tho (Dat thanh)
Canh Thin - Tan Ti:  Bach Lap Kim   (Vang trang suc)
Nham Ngo - Quy Mui:  Duong Lieu Moc (Go cay lieu)
Giap Than - At Dau:  Tuyen Trung Thuy (Nuoc trong gieng)
Binh Tuat - Dinh Hoi: Oc Thuong Tho (Dat tren noc)
Mau Ty - Ky Suu:     Tich Lich Hoa  (Lua set)
Canh Dan - Tan Mao:  Tung Bach Moc  (Go cay tung)
Nham Thin - Quy Ti:  Truong Luu Thuy (Nuoc chay dai)
Giap Ngo - At Mui:   Sa Trung Kim   (Vang trong cat)
Binh Than - Dinh Dau: Son Ha Hoa    (Lua duoi nui)
Mau Tuat - Ky Hoi:   Binh Dia Moc   (Go dong bang)
Canh Ty - Tan Suu:   Bich Thuong Tho (Dat tren vach)
Nham Dan - Quy Mao:  Kim Bach Kim   (Vang la vang)
Giap Thin - At Ti:   Phu Dang Hoa   (Lua ngon den)
Binh Ngo - Dinh Mui: Thien Ha Thuy  (Nuoc song troi)
Mau Than - Ky Dau:   Dai Dich Tho   (Dat cai lon)
Canh Tuat - Tan Hoi: Sai Xoan Kim   (Vang trang vong)
Nham Ty - Quy Suu:   Tang Do Moc    (Go cay dau)
Giap Dan - At Mao:   Dai Khe Thuy   (Nuoc khe lon)
Binh Thin - Dinh Ti: Sa Trung Tho   (Dat trong cat)
Mau Ngo - Ky Mui:    Thien Thuong Hoa (Lua tren troi)
Canh Than - Tan Dau: Thach Luu Moc  (Go cay luu)
Nham Tuat - Quy Hoi: Dai Hai Thuy   (Nuoc bien lon)
```

### Module 2: Luan Menh Ngu Hanh (Five Elements Destiny)

**Muc dich:** Xac dinh menh Ngu Hanh cua nguoi dung, phan tich tuong sinh tuong khac.

**Tinh nang:**
- Xac dinh menh Ngu Hanh tu nam sinh (Nap Am Luc Thap Hoa Giap)
- Phan tich tuong sinh tuong khac giua cac menh
- Tu van mau sac, huong, so may man theo menh
- Kiem tra do hop menh giua 2 nguoi (tinh duyen, hop tac)

**Ma tran Ngu Hanh:**
```
Tuong sinh: Moc -> Hoa -> Tho -> Kim -> Thuy -> Moc
Tuong khac: Moc -> Tho -> Thuy -> Hoa -> Kim -> Moc

Kim sinh Thuy, Thuy sinh Moc, Moc sinh Hoa, Hoa sinh Tho, Tho sinh Kim
Kim khac Moc, Moc khac Tho, Tho khac Thuy, Thuy khac Hoa, Hoa khac Kim
```

**Mau sac theo menh:**
```
Kim:  Trang, Xam, Bac, Vang dong
Moc:  Xanh la, Xanh luc, Nau
Thuy: Den, Xanh duong, Xanh dam
Hoa:  Do, Cam, Hong, Tim
Tho:  Vang, Nau dat, Be
```

**Huong tot theo menh:**
```
Kim:  Tay, Tay Bac
Moc:  Dong, Dong Nam
Thuy: Bac
Hoa:  Nam
Tho:  Dong Bac, Tay Nam, Trung Tam
```

### Module 3: Tu Vi Dau So (Purple Star Astrology)

**Muc dich:** La la so Tu Vi day du voi 14 chinh tinh va 12 cung.

**12 Cung Tu Vi:**
```
1.  Menh       - Ban chat, tinh cach
2.  Huynh De   - Anh chi em
3.  Phu The    - Hon nhan
4.  Tu Tuc     - Con cai
5.  Tai Bach   - Tai chinh
6.  Tat Ach    - Suc khoe
7.  Thien Di   - Di chuyen, xa nha
8.  No Boc     - Ban be, cap duoi
9.  Quan Loc   - Su nghiep
10. Dien Trach - Nha cua, bat dong san
11. Phuc Duc   - Phuc duc tich luy
12. Phu Mau    - Cha me
```

**14 Chinh Tinh:**
```
Nhom Tu Vi:   Tu Vi, Thien Co, Thai Duong, Vu Khuc, Thien Dong, Liem Trinh
Nhom Thien Phu: Thien Phu, Thai Am, Tham Lang, Cu Mon, Thien Tuong, Thien Luong, That Sat, Pha Quan
```

**Cac sao phu:**
- Tuan Tinh: Loc Ton, Hoa Tinh, Linh Tinh, Dia Khong, Dia Kiep...
- Phuc Tinh: Ta Phu, Huu Bat, Van Xuong, Van Khuc, Thien Khoi, Thien Viet...
- Hung Tinh: Kinh Duong, Da La, Hoa Ky...
- Dao Hoa: Hong Loan, Thien Hi, Dao Hoa...

**Thuat toan An Sao Tu Vi:**
1. Xac dinh Cuc (Thuy Nhi Cuc, Moc Tam Cuc, Kim Tu Cuc, Tho Ngu Cuc, Hoa Luc Cuc) tu Menh va Ngu Hanh Nap Am
2. An Menh cung tu thang sinh va gio sinh
3. An Than cung tu thang sinh va gio sinh
4. An Tu Vi tu Cuc va ngay sinh (am lich)
5. An cac chinh tinh theo vi tri Tu Vi
6. An cac phu tinh theo Can Chi nam sinh, thang, ngay, gio

**Giai nghia:**
- Mieu/Vuong/Dac Dia/Binh Hoa/Ham Dia cho tung sao tai tung cung
- Sao tot o Mieu/Vuong tang cuong tot, o Ham Dia giam sut
- To hop sao: "Sat Pha Liem" (That Sat - Pha Quan - Liem Trinh), "Co Nguyet Dong Luong"...

### Module 4: Xem Ngay Tot Xau (Date Selection)

**Muc dich:** Chon ngay tot cho cac su kien quan trong.

**Tinh nang:**
- Xem ngay Hoang Dao / Hac Dao
- Chon ngay tot cho: Cuoi hoi, Khai truong, Dong tho, Nhap trach, Xuat hanh, Ky hop dong
- Loc ngay theo tuoi (tranh ngay Tam Nuong, Sat Chu, Thoi Dia...)
- Hien thi Truc (12 Truc Kien Tru) va Sao (28 Sao)

**12 Truc (Kien Tru):**
```
Kien, Tru, Man, Binh, Dinh, Chap, Pha, Nguy, Thanh, Thu, Khai, Be
```

**12 Gio Hoang Dao (theo ngay):**
```
Thanh Long, Minh Duong, Kim Quy, Thien Duc, Ngoc Duong, Tu Menh -> Hoang Dao (tot)
Bach Ho, Thien Lao, Huyen Vu, Cau Tran, Thien Hinh, Chu Tuoc -> Hac Dao (xau)
```

**28 Sao:**
```
Dong: Giac, Khang, De, Phong, Tam, Mi, Co
Bac: Dau, Nguu, Nu, Hu, Nguy, That, Bich
Tay: Khue, Lau, Vi, Mao, Tat, Chuy, Sam
Nam: Tinh, Quy, Lieu, Tinh, Truong, Duc, Chan
```

**Ngay kieng ky:**
- Tam Nuong: Ngay 3, 7, 13, 14, 18, 22, 23, 27 am lich
- Nguyet Ky: Ngay 5, 14, 23 am lich
- Sat Chu: Theo thang va dia chi ngay
- Thoi Dia: Mua Xuan ky ngay Binh Dinh, Mua Ha ky ngay Nham Quy...

### Module 5: Phong Thuy Ung Dung (Applied Feng Shui)

**Muc dich:** Tu van phong thuy nha o, van phong, noi that.

**Tinh nang:**
- Xac dinh Cung Menh (Dong Tu Menh / Tay Tu Menh) theo Bat Trach
- Tinh huong nha tot/xau theo cung menh
- Bat Trach: 8 huong (Sinh Khi, Thien Y, Dien Nien, Phuc Vi, Hoa Hai, Luc Sat, Ngu Quy, Tuyet Menh)
- Cuu Cung Phi Tinh: Tinh sao bay hang nam/thang/ngay
- Bo tri noi that theo phong thuy (phong ngu, phong khach, bep, ban lam viec)

**Bat Trach (8 Houses):**
```
Dong Tu Menh: Can, Khon, Gen, Doai  (cung Tay)
Tay Tu Menh:  Ly, Kham, Chan, Ton   (cung Dong)

Cong thuc tinh Cung Menh:
- Nam: (100 - 2 chu so cuoi nam sinh) / 9 -> lay so du
- Nu:  (2 chu so cuoi nam sinh - 4) / 9 -> lay so du
(Ap dung cho nguoi sinh truoc 2000, sau 2000 dieu chinh +/- 100)
```

**8 Huong cua moi Cung:**
```
Kham (1): Sinh Khi=DN, Thien Y=D, Dien Nien=N, Phuc Vi=B, Hoa Hai=TB, Luc Sat=DB, Ngu Quy=TN, Tuyet Menh=T
Khon (2): Sinh Khi=DB, Thien Y=T, Dien Nien=TB, Phuc Vi=TN, Hoa Hai=D, Luc Sat=N, Ngu Quy=B, Tuyet Menh=DN
Chan (3): Sinh Khi=N, Thien Y=DN, Dien Nien=D, Phuc Vi=D, Hoa Hai=TN, Luc Sat=TB, Ngu Quy=T, Tuyet Menh=DB
Ton (4):  Sinh Khi=B, Thien Y=N, Dien Nien=DN, Phuc Vi=DN, Hoa Hai=T, Luc Sat=TN, Ngu Quy=DB, Tuyet Menh=TB
Doai (7): Sinh Khi=TB, Thien Y=DB, Dien Nien=TN, Phuc Vi=T, Hoa Hai=D, Luc Sat=DN, Ngu Quy=N, Tuyet Menh=B
Can (6):  Sinh Khi=T, Thien Y=DB, Dien Nien=TN, Phuc Vi=TB, Hoa Hai=DN, Luc Sat=D, Ngu Quy=N, Tuyet Menh=B
Gen (8):  Sinh Khi=TN, Thien Y=T, Dien Nien=TB, Phuc Vi=DB, Hoa Hai=B, Luc Sat=DN, Ngu Quy=D, Tuyet Menh=N
Ly (9):   Sinh Khi=D, Thien Y=B, Dien Nien=N, Phuc Vi=N, Hoa Hai=DB, Luc Sat=T, Ngu Quy=TB, Tuyet Menh=TN
```

**Cuu Cung Phi Tinh:**
```
9 Sao: Nhat Bach, Nhi Hac, Tam Bich, Tu Luc, Ngu Hoang, Luc Bach, That Xich, Bat Bach, Cuu Tu
Cac sao bay theo quy do Lac Thu, thay doi theo nam/thang/ngay/gio
Tot: Nhat Bach (Thuy), Tu Luc (Moc), Luc Bach (Kim), Bat Bach (Tho)
Xau: Nhi Hac (Tho), Tam Bich (Moc), Ngu Hoang (Tho), That Xich (Kim)
Trung tinh: Cuu Tu (Hoa)
```

### Module 6: Tu Vi Hang Ngay (Daily Horoscope)

**Muc dich:** Cung cap du bao hang ngay dua tren tu vi va phong thuy.

**Tinh nang:**
- Du bao 5 linh vuc: Tong quan, Tinh cam, Su nghiep, Tai chinh, Suc khoe
- Diem so 1-10 cho tung linh vuc
- Mau sac may man, huong xuat hanh, gio tot trong ngay
- Du bao theo 12 con giap (Ty, Suu, Dan, Mao, Thin, Ti, Ngo, Mui, Than, Dau, Tuat, Hoi)

**Thuat toan:**
- Ket hop Cuu Cung Phi Tinh ngay + Dia Chi ngay + 28 Sao + Truc Kien Tru
- Map tuong tac giua sao ngay va cung menh nguoi dung
- Scoring system based on: tuong sinh (+), tuong khac (-), hoang dao (+2), hac dao (-2)

---

## 3. Data Structures

### Calendar Data Schema
```typescript
interface LunarDate {
  day: number;        // 1-30
  month: number;      // 1-12 (co thang nhuan)
  year: number;
  isLeapMonth: boolean;
  canDay: number;     // 0-9 (Thien Can)
  chiDay: number;     // 0-11 (Dia Chi)
  canMonth: number;
  chiMonth: number;
  canYear: number;
  chiYear: number;
  canHour: number[];  // 12 gio trong ngay
  chiHour: number[];
  solarTerm?: string; // Tiet khi (neu co)
}

interface SolarDate {
  day: number;
  month: number;
  year: number;
  dayOfWeek: number;  // 0=CN, 1=T2...
}

interface DayInfo {
  solar: SolarDate;
  lunar: LunarDate;
  hoangDao: string[];     // Cac gio hoang dao
  hacDao: string[];       // Cac gio hac dao
  truc: string;           // 1 trong 12 truc
  sao28: string;          // 1 trong 28 sao
  ngayKy: string[];       // Tam Nuong, Nguyet Ky...
  festivals: string[];    // Ngay le
}
```

### Tu Vi Chart Schema
```typescript
interface TuViChart {
  userInfo: {
    name: string;
    gender: 'male' | 'female';
    birthDate: LunarDate;
    birthHour: number;      // 0-11 (12 dia chi)
  };
  cuc: string;              // Thuy/Moc/Kim/Tho/Hoa + so Cuc
  menh: string;             // Nap Am Ngu Hanh
  cungMenh: number;         // Vi tri cung Menh (0-11)
  cungThan: number;         // Vi tri cung Than
  palaces: Palace[];        // 12 cung
}

interface Palace {
  name: string;             // Ten cung
  position: number;         // 0-11
  diaChi: string;           // Dia chi cua cung
  mainStars: Star[];        // Chinh tinh
  minorStars: Star[];       // Phu tinh
}

interface Star {
  name: string;
  brightness: 'mieu' | 'vuong' | 'dacDia' | 'binhHoa' | 'hamDia';
  isGood: boolean;
}
```

### Phong Thuy Schema
```typescript
interface PhongThuyProfile {
  cungMenh: string;         // Kham, Khon, Chan, Ton, Can, Doai, Gen, Ly
  nhomMenh: 'dong' | 'tay'; // Dong tu menh / Tay tu menh
  huongTot: Direction[];     // Sinh Khi, Thien Y, Dien Nien, Phuc Vi
  huongXau: Direction[];     // Hoa Hai, Luc Sat, Ngu Quy, Tuyet Menh
}

interface Direction {
  name: string;              // Ten huong (Sinh Khi, Thien Y...)
  direction: string;         // B, N, D, T, DB, DN, TB, TN
  description: string;
  usage: string;             // Nen dung cho gi
}

interface CuuCungResult {
  year: number;
  month: number;
  centerStar: number;       // 1-9
  grid: number[][];         // Ma tran 3x3 Cuu Cung
  analysis: string;
}
```

---

## 4. Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + shadcn/ui
- **State Management:** Zustand (lightweight, phù hợp cho client state)
- **Charts/Visualization:** D3.js hoac Canvas API (cho la so Tu Vi)
- **Animation:** Framer Motion (cho UI transitions)
- **Icons:** Lucide React + custom SVG (Ngu Hanh icons)

### Backend
- **Runtime:** Node.js (Next.js API Routes / Server Actions)
- **Database:** PostgreSQL (Neon/Supabase for serverless)
- **ORM:** Prisma
- **Cache:** Redis (Upstash for serverless) - cache ket qua tinh toan theo ngay
- **Auth:** NextAuth.js v5

### Key Libraries
- **`amlich`** (npm) - Chuyen doi am duong lich, thuat toan Ho Ngoc Duc
- **`iztro`** (npm) - Tu Vi Dau So engine (Zi Wei Dou Shu), ho tro tieng Viet
- **`lunar-calendar-ts-vi`** (npm) - Lich am tieng Viet
- **`date-fns`** - Xu ly ngay thang

### Infrastructure
- **Hosting:** Vercel (toi uu cho Next.js)
- **Database:** Neon PostgreSQL (serverless, auto-scaling)
- **Cache:** Upstash Redis
- **CDN:** Vercel Edge Network
- **Analytics:** Vercel Analytics + Google Analytics 4
- **Error Tracking:** Sentry

---

## 5. Architecture

### System Architecture
```
[Client Browser]
      |
      v
[Vercel Edge Network / CDN]
      |
      v
[Next.js App Router]
  ├── Server Components (SSR/SSG)
  │   ├── Calendar pages (ISR - revalidate daily)
  │   ├── Daily horoscope (ISR - revalidate daily)
  │   └── Static content pages (SSG)
  ├── Client Components
  │   ├── Tu Vi chart interactive
  │   ├── Phong thuy compass
  │   └── Date picker/selector
  └── API Routes / Server Actions
      ├── /api/calendar - Lunar conversion
      ├── /api/tuvi - Tu Vi chart calculation
      ├── /api/ngaytot - Date selection
      ├── /api/phongthuy - Feng shui analysis
      └── /api/daily - Daily horoscope
          |
          v
  [Calculation Engine Layer]
  ├── LunarEngine (amlich + custom)
  ├── TuViEngine (iztro + custom)
  ├── DateSelectionEngine (custom)
  └── FengShuiEngine (custom)
          |
          v
  [Data Layer]
  ├── PostgreSQL (user data, saved charts)
  ├── Redis (daily cache, calculation cache)
  └── Static JSON (lookup tables, Nap Am, 28 Sao...)
```

### Caching Strategy
- **ISR (Incremental Static Regeneration):** Trang lich ngay, tu vi hang ngay - revalidate moi 24h
- **Redis Cache:** Ket qua tinh toan Tu Vi (key: birthdate+hour+gender), Phong thuy (key: year+gender), Ngay tot (key: date)
- **Browser Cache:** Static assets, lookup tables
- **TTL:** Daily content = 24h, Tu Vi chart = 30 days, Static data = 365 days

### API Design
```
GET  /api/calendar?date=2024-01-15          -> Thong tin ngay
GET  /api/calendar/month?year=2024&month=1  -> Thong tin ca thang
POST /api/tuvi/chart                        -> Tao la so Tu Vi
GET  /api/tuvi/daily?zodiac=ty              -> Tu vi hang ngay theo con giap
POST /api/ngaytot/search                    -> Tim ngay tot cho su kien
GET  /api/ngaytot/check?date=2024-01-15     -> Kiem tra 1 ngay cu the
POST /api/phongthuy/battrach                -> Tinh Bat Trach
POST /api/phongthuy/cuucung                 -> Tinh Cuu Cung Phi Tinh
GET  /api/phongthuy/huong?cung=kham         -> Lay huong tot/xau
```

---

## 6. Monetization

### Freemium Tiers

**Free Tier:**
- Lich van nien (xem ngay, chuyen doi am duong)
- Xem menh Ngu Hanh co ban
- Xem ngay tot/xau co ban (khong loc theo tuoi)
- Tu vi hang ngay (tong quan)
- Gioi han 3 lan la so Tu Vi/thang
- Quang cao hien thi

**Premium Tier (99,000 VND/thang hoac 799,000 VND/nam):**
- La so Tu Vi chi tiet khong gioi han
- Giai nghia Tu Vi chi tiet (moi cung, moi sao)
- Xem ngay tot loc theo tuoi
- Phong thuy nha cua chi tiet (Bat Trach + Cuu Cung)
- Kiem tra hop menh 2 nguoi
- Tu vi hang ngay chi tiet (5 linh vuc + diem so)
- Khong quang cao
- Luu lich su tra cuu

**VIP Tier (199,000 VND/thang hoac 1,499,000 VND/nam):**
- Tat ca Premium
- Tu van phong thuy ca nhan hoa (AI-powered)
- Du bao nam/thang chi tiet
- Xuat PDF la so Tu Vi
- Thong bao push ngay tot hang ngay
- Uu tien ho tro

### Revenue Streams
1. **Subscriptions** (primary) - 60% revenue
2. **Display Ads** (Google AdSense) - free tier - 25% revenue
3. **One-time purchases** - Xuat PDF la so: 49,000 VND/lan - 10% revenue
4. **Affiliate** - Vat pham phong thuy, sach tu vi - 5% revenue

---

## 7. SEO Strategy

### Target Keywords
```
Primary (high volume):
- "xem ngay tot xau" (33,100/thang)
- "lich van nien" (27,100/thang)
- "tu vi" (22,200/thang)
- "phong thuy" (14,800/thang)
- "xem menh" (9,900/thang)

Long-tail:
- "xem ngay tot xau thang [X] nam [Y]"
- "tu vi [con giap] nam [Y]"
- "menh [ngu hanh] hop mau gi"
- "phong thuy nha huong [X]"
- "ngay tot cuoi hoi thang [X]"
```

### SEO Architecture
- **Dynamic routes:** `/lich/[year]/[month]/[day]` - trang cho moi ngay
- **Static pages:** `/tu-vi/[con-giap]/nam-[year]` - 12 con giap x N nam
- **Phong thuy:** `/phong-thuy/menh-[ngu-hanh]` - 5 trang menh
- **Blog:** `/blog/[slug]` - Bai viet phong thuy, tu vi, chia se kien thuc

### Structured Data (JSON-LD)
- FAQPage schema cho cac trang hoi dap
- Article schema cho blog posts
- BreadcrumbList cho navigation
- WebApplication schema cho app

### Technical SEO
- Server-side rendering (Next.js SSR/SSG)
- Sitemap.xml tu dong generate
- robots.txt
- Canonical URLs
- Vietnamese hreflang tags
- Core Web Vitals optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Open Graph + Twitter Cards cho social sharing

---

## 8. Key Libraries & References

### Primary Dependencies
| Library | Purpose | License |
|---------|---------|---------|
| `next` 14+ | Framework | MIT |
| `typescript` | Type safety | Apache-2.0 |
| `tailwindcss` | Styling | MIT |
| `@shadcn/ui` | UI components | MIT |
| `prisma` | ORM | Apache-2.0 |
| `zustand` | State management | MIT |
| `iztro` | Tu Vi Dau So engine | MIT |
| `amlich` | Lunar calendar (Ho Ngoc Duc) | MIT |
| `lunar-calendar-ts-vi` | Vietnamese lunar calendar | MIT |
| `date-fns` | Date utilities | MIT |
| `d3` | Chart visualization | ISC |
| `framer-motion` | Animations | MIT |
| `next-auth` | Authentication | ISC |
| `sentry` | Error tracking | MIT |

### Reference Materials
- Ho Ngoc Duc - Vietnamese Lunar Calendar Algorithm: http://www.informatik.uni-leipzig.de/~duc/amlich/
- iztro documentation: https://docs.iztro.com
- Tu Vi Dau So theory & calculation methods
- Bat Trach Minh Canh (Eight Mansions Feng Shui)
- Lac Thu Cuu Cung (Lo Shu Nine Palaces)

---

## 9. Database Schema (Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String?   @unique
  name          String?
  image         String?
  birthDate     DateTime?
  birthHour     Int?      // 0-11 (12 dia chi)
  gender        String?   // male/female
  lunarBirth    Json?     // Stored lunar date
  subscription  String    @default("free") // free/premium/vip
  subExpiresAt  DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  charts        TuViChart[]
  searches      SearchHistory[]
  accounts      Account[]
  sessions      Session[]
}

model TuViChart {
  id          String   @id @default(cuid())
  userId      String
  name        String   // Ten nguoi duoc la so
  birthDate   Json     // Lunar date
  birthHour   Int
  gender      String
  chartData   Json     // Full chart result
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])

  @@index([userId])
}

model SearchHistory {
  id        String   @id @default(cuid())
  userId    String
  type      String   // calendar/tuvi/ngaytot/phongthuy
  query     Json     // Search parameters
  result    Json?    // Cached result
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])

  @@index([userId, type])
}

model DailyHoroscope {
  id        String   @id @default(cuid())
  date      DateTime @db.Date
  zodiac    String   // ty/suu/dan/mao/thin/ti/ngo/mui/than/dau/tuat/hoi
  content   Json     // { tong_quan, tinh_cam, su_nghiep, tai_chinh, suc_khoe, scores }
  createdAt DateTime @default(now())

  @@unique([date, zodiac])
  @@index([date])
}

model DailyCalendar {
  id          String   @id @default(cuid())
  date        DateTime @db.Date @unique
  lunarData   Json     // Full lunar date info
  dayInfo     Json     // Hoang dao, truc, sao28, ngay ky...
  createdAt   DateTime @default(now())

  @@index([date])
}
```

---

## 10. UI/UX Guidelines

### Design Principles
- **Vietnamese aesthetic:** Mau do/vang truyen thong, hoa tiet Oriental
- **Mobile-first:** 70%+ traffic tu mobile
- **Fast:** Target LCP < 2s, toi uu cho 3G connections
- **Accessible:** Font size toi thieu 16px, contrast ratio > 4.5:1
- **Trust:** Giao dien chuyen nghiep, khong spam, trinh bay khoa hoc

### Color Palette
```
Primary:    #C41E3A (Do truyen thong)
Secondary:  #DAA520 (Vang Kim)
Background: #FFF8F0 (Kem nhat)
Text:       #2D2D2D (Xam dam)
Accent:     #006400 (Xanh la - Moc)
Info:       #1E3A5F (Xanh duong dam - Thuy)

Ngu Hanh Colors:
Kim:  #C0C0C0
Moc:  #228B22
Thuy: #1E90FF
Hoa:  #DC143C
Tho:  #DAA520
```

### Key Pages
1. **Trang chu** - Overview, daily highlight, quick tools
2. **Lich Van Nien** - Calendar view (thang/nam), chi tiet ngay
3. **Xem Menh** - Input form -> Ket qua Ngu Hanh chi tiet
4. **La So Tu Vi** - Input form -> Interactive chart visualization
5. **Xem Ngay Tot** - Date range picker -> Filtered results
6. **Phong Thuy** - Input form -> Huong nha, bo tri analysis
7. **Tu Vi Hang Ngay** - 12 tabs con giap, noi dung hang ngay
8. **Blog** - Bai viet kien thuc phong thuy, tu vi
