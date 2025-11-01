# Deployment Guide

This guide will help you deploy Schrödinger's Cat website to production.

---

## 🚀 Quick Start: Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Domain name (optional, Vercel provides free subdomain)

### Step 1: Prepare Your Repository

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Verify build works locally**:
   ```bash
   npm run build
   npm start  # Test production build
   ```

### Step 2: Deploy to Vercel

1. **Create Vercel Account**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Your Project**:
   - Click "Add New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Build Settings**:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto)
   - Output Directory: `.next` (auto)
   - Install Command: `npm install` (auto)

4. **Add Environment Variables**:
   
   Copy all variables from your `.env.local` to Vercel's dashboard:
   
   **Required**:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   NEXT_PUBLIC_SITE_NAME="Schrödinger's Cat"
   ```
   
   **If using Supabase**:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
   
   **If using Resend**:
   ```bash
   RESEND_API_KEY=your_resend_api_key
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```
   
   **If using Analytics**:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   
   **If using Payments**:
   ```bash
   FANBASIS_API_KEY=your_fanbasis_key
   PAYPAL_CLIENT_ID=your_paypal_id
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-5 minutes
   - Your site is live! 🎉

### Step 3: Configure Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to Project → Settings → Domains
   - Add your domain (e.g., `schrodingers-cat.com`)

2. **Update DNS**:
   - Add Vercel's nameservers to your domain registrar
   - Or add CNAME: `cname.vercel-dns.com`

3. **SSL is Automatic**:
   - Vercel automatically provisions SSL certificates
   - HTTPS enabled by default

---

## 🔧 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify newsletter signup works
- [ ] Test product browsing
- [ ] Check mobile responsiveness
- [ ] Verify analytics tracking
- [ ] Test 404 and error pages
- [ ] Confirm SEO metadata works
- [ ] Run Lighthouse audit (should score > 90)

---

## 🌍 Alternative Deployment Options

### Railway.app
- Good for: Full control, database included
- Setup: Similar to Vercel, connects to GitHub
- Cost: Free tier available

### DigitalOcean App Platform
- Good for: Scaling, managed services
- Setup: Connect repository, auto-detects Next.js
- Cost: Starts at $12/month

### Self-Hosted (Advanced)
- Good for: Maximum control
- Requirements: VPS, domain, SSL
- Options: DigitalOcean Droplet, AWS EC2, Hetzner
- Setup: Manual Next.js deployment + PM2/Nginx

---

## 🔐 Security Headers

Already configured in `next.config.js`:
- ✅ X-Content-Type-Options
- ✅ X-Frame-Options
- ✅ X-XSS-Protection
- ✅ Strict-Transport-Security
- ✅ Referrer-Policy
- ✅ Permissions-Policy

---

## 📊 Monitoring & Analytics

### Vercel Analytics
- Built-in analytics in Vercel dashboard
- Page views, performance metrics
- Free tier includes core metrics

### Google Analytics 4
- Already integrated in `components/Analytics.tsx`
- Track custom events automatically
- View in GA4 dashboard

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Check logs in Vercel dashboard
# Common issues:
- Missing environment variables
- TypeScript errors
- Import errors
```

### Environment Variables Not Working
- Restart deployment after adding variables
- Check variable names (case-sensitive)
- Ensure `NEXT_PUBLIC_` prefix for client-side

### Slow Loading
- Check image optimization
- Verify static generation
- Monitor Core Web Vitals in Vercel

---

## 📈 Performance Optimization

Already implemented:
- ✅ Next.js Image optimization
- ✅ Code splitting
- ✅ Static generation where possible
- ✅ Compression enabled
- ✅ Security headers
- ✅ Edge caching (Vercel)

---

**🎉 You're Live!** Your Schrödinger's Cat website is now accessible to the world!

