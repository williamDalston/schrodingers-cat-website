# Deployment Guide for Schrödinger's Cat Website

This guide will walk you through deploying your Next.js site to production.

---

## 🚀 Quick Deploy: Vercel (Recommended - 5 Minutes)

**Vercel is the easiest and best option for Next.js apps.**

### Step 1: Test Build Locally

First, make sure everything builds:

```bash
# Install dependencies (if not done)
npm install

# Test the build
npm run build

# If build succeeds, you're ready! ✅
```

### Step 2: Deploy to Vercel

**Option A: GitHub Integration (Recommended)**

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**:
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings ✅

3. **Add Environment Variables**:
   - In Vercel dashboard → Your Project → Settings → Environment Variables
   - Add the variables below (see Environment Variables section)

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-5 minutes
   - Your site is LIVE! 🎉

**Option B: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

### Step 3: Get Your URL

After deployment, Vercel gives you:
- **Production URL**: `your-project.vercel.app`
- **Preview URLs**: For every PR/branch

---

## 🔐 Environment Variables

### Required for Basic Functionality

Add these in **Vercel Dashboard → Settings → Environment Variables**:

```bash
# Site Configuration (REQUIRED)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME="Schrödinger's Cat"
```

### Optional: Supabase (Database)

Only add if you want database features (newsletter, progress tracking):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Setup**: [supabase.com](https://supabase.com) → Create project → Copy URL and keys

### Optional: Resend (Email)

Only add if you want newsletter email functionality:

```bash
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

**Setup**: [resend.com](https://resend.com) → Create API key → Use `onboarding@resend.dev` for testing

### Optional: Google Analytics

Only add if you want analytics:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Setup**: [analytics.google.com](https://analytics.google.com) → Create GA4 property

### Optional: Payments (Future)

```bash
FANBASIS_API_KEY=xxx
PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx
```

---

## ✅ Pre-Deployment Checklist

Before deploying, verify:

- [ ] **Build works locally**: `npm run build` succeeds
- [ ] **No TypeScript errors**: Check for any `tsc` errors
- [ ] **Environment variables set**: At minimum, `NEXT_PUBLIC_SITE_URL`
- [ ] **Git is clean**: Code committed and pushed
- [ ] **Test locally**: `npm start` works and site looks good

---

## 🌐 Custom Domain Setup (Optional)

### Step 1: Buy a Domain

- **Recommendations**: Namecheap, Google Domains, Cloudflare
- **Cost**: ~$10-15/year

### Step 2: Add to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `schrodingerscat.com`)
4. Follow DNS instructions

### Step 3: Configure DNS

Vercel will show you DNS records to add. Usually:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Add these in your domain registrar's DNS settings.

### Step 4: SSL (Automatic)

Vercel automatically provisions SSL certificates. Wait 5-10 minutes after DNS setup.

---

## 🔍 Verify Deployment

After deployment, test:

1. **Visit your site**: Check it loads correctly
2. **Test pages**: Visit `/paradoxes`, `/articles`, `/puzzles`
3. **Check console**: Open browser DevTools → Console (no errors)
4. **Mobile test**: Check responsive design
5. **Speed test**: [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 🛠️ Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Solution: Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

**Error: "TypeScript errors"**
```bash
# Check specific errors
npm run build
# Fix errors shown
```

**Error: "Environment variable not found"**
- Check Vercel dashboard → Settings → Environment Variables
- Make sure variables are added for **Production** environment
- Redeploy after adding variables

### Site Works But Features Don't

**Newsletter doesn't work:**
- Check `RESEND_API_KEY` is set in Vercel
- Verify Resend account is active
- Check email in Resend dashboard

**Database features don't work:**
- Check Supabase variables are set
- Verify Supabase project is active
- Check Supabase dashboard for errors

### Domain Not Working

**DNS not propagating:**
- Wait up to 48 hours (usually < 1 hour)
- Use [dnschecker.org](https://dnschecker.org) to check propagation
- Verify DNS records match Vercel's instructions exactly

---

## 📊 Post-Deployment

### Monitor Your Site

1. **Vercel Analytics** (free):
   - Automatic in Vercel dashboard
   - Shows traffic, performance

2. **Google Analytics** (if configured):
   - Track user behavior
   - Monitor page views

3. **Vercel Logs**:
   - View function logs
   - Debug API routes

### Set Up Continuous Deployment

Vercel automatically:
- ✅ Deploys on every `git push` to main
- ✅ Creates preview deployments for PRs
- ✅ Runs builds automatically

No additional setup needed!

---

## 🔄 Update Your Site

To update after deployment:

```bash
# Make changes locally
git add .
git commit -m "Update content"
git push origin main

# Vercel automatically deploys! ✨
```

Check Vercel dashboard for deployment status.

---

## 🎯 Alternative Deployments

### Netlify

```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Self-Hosted (VPS/Server)

```bash
# Build
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm i -g pm2
pm2 start npm --name "schrodingers-cat" -- start
```

### Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📝 Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Production
npm run build           # Build for production
npm start               # Run production build locally

# Testing
npm run lint            # Check code quality
npm test                # Run tests
```

### Environment Variables Priority

1. **Production**: Vercel dashboard (Production environment)
2. **Preview**: Vercel dashboard (Preview environment)
3. **Development**: `.env.local` file (local only)

---

## 🎉 You're Live!

Once deployed, your site is:
- ✅ Accessible worldwide
- ✅ SSL secured (HTTPS)
- ✅ CDN accelerated (fast loading)
- ✅ Auto-scaling (handles traffic)

**Share your site and celebrate! 🚀**

---

## 📞 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

## 🚨 Important Notes

1. **`.env.local` is NOT deployed**: Only add secrets to Vercel dashboard
2. **GitHub secrets ≠ Vercel secrets**: Add separately to Vercel
3. **Free tier limits**: Check Vercel's free tier limits if needed
4. **Backup your code**: Keep GitHub repository synced

---

**Ready to deploy? Start with Step 1: Test Build Locally!**
