# 🚀 Deployment Guide - Firebase

Deploy your Pollify app to the web in minutes with Firebase Hosting!

## Prerequisites

- Firebase project set up (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
- Firebase CLI installed
- Your app working locally

## Option 1: Firebase Hosting (Recommended) - 5 Minutes

Firebase Hosting is fast, secure, and has a generous free tier.

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

This will open your browser for authentication.

### Step 3: Initialize Firebase Hosting

```bash
firebase init hosting
```

Answer the prompts:
- **What do you want to use as your public directory?** `dist`
- **Configure as a single-page app?** `Yes`
- **Set up automatic builds with GitHub?** `No` (for now)
- **File dist/index.html already exists. Overwrite?** `No`

### Step 4: Build Your App

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

### Step 5: Deploy!

```bash
firebase deploy
```

🎉 **Done!** Your app is now live!

You'll get a URL like: `https://pollify-xxxxx.web.app`

### Update Your App

Whenever you make changes:
```bash
npm run build
firebase deploy
```

---

## Option 2: Vercel - Ultra Fast

Vercel is another excellent option with automatic deployments from GitHub.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
vercel
```

Follow the prompts, and you're done!

### Set Environment Variables

```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
```

### Connect to GitHub (Auto-Deploy)

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables in settings
4. Every push to `main` auto-deploys!

---

## Option 3: Netlify

### Quick Deploy

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist` folder

### GitHub Integration

1. Connect your repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Environment variables:
   - Add all `VITE_FIREBASE_*` variables
4. Deploy!

---

## Environment Variables for Production

All hosting platforms need these environment variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Important:** These values are the same as in your `.env.local` file!

---

## Custom Domain

### Firebase Hosting

```bash
firebase hosting:channel:deploy production --only hosting
```

Then in Firebase Console:
1. Go to Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration steps

### Vercel

1. Go to project settings → Domains
2. Add your custom domain
3. Update DNS records as shown

### Netlify

1. Go to Domain settings
2. Add custom domain
3. Update nameservers or DNS records

---

## Performance Optimization

Your app is already optimized, but here are some tips:

### 1. Enable Caching

Firebase Hosting automatically caches static assets.

### 2. Use CDN

All options (Firebase, Vercel, Netlify) use global CDNs by default.

### 3. Monitor Performance

- Firebase Console → Analytics
- Vercel → Analytics
- Netlify → Analytics

---

## Security Best Practices

### Firebase Security Rules

Make sure your Firestore rules are set correctly (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /polls/{pollId} {
      allow read: if true;
      allow create: if true;
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['votes', 'voterIds']);
    }
  }
}
```

### Environment Variables

- ✅ Firebase config can be public (it's protected by security rules)
- ✅ No API keys need to be secret
- ✅ Security is enforced by Firestore rules

---

## Monitoring and Analytics

### Firebase Analytics

1. Go to Firebase Console → Analytics
2. Enable Google Analytics (if not already)
3. View user activity, popular polls, etc.

### Custom Events

Add tracking to your app:
```javascript
import { logEvent } from 'firebase/analytics';
logEvent(analytics, 'poll_created');
```

---

## Troubleshooting

### Build Fails

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

- Make sure variables start with `VITE_`
- Rebuild after changing variables
- Check platform-specific syntax

### Firebase Rules Error

```bash
# Update rules
firebase deploy --only firestore:rules
```

### 404 on Refresh

Make sure your hosting is configured for SPA:
- Firebase: `"rewrites": [{"source": "**", "destination": "/index.html"}]`
- Vercel: Handled automatically
- Netlify: Add `_redirects` file with `/* /index.html 200`

---

## Costs

### Firebase Hosting (Free Tier)
- ✅ 10 GB storage
- ✅ 360 MB/day data transfer
- ✅ Free SSL certificate
- ✅ Custom domain

### Firestore (Free Tier)
- ✅ 50,000 reads/day
- ✅ 20,000 writes/day
- ✅ 1 GB storage

### Vercel (Hobby)
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Custom domains

### Netlify (Free)
- ✅ 100 GB bandwidth/month
- ✅ Continuous deployment
- ✅ Custom domains

**For a polling app with moderate traffic, the free tiers are more than enough!**

---

## CI/CD (Advanced)

### GitHub Actions + Firebase

Create `.github/workflows/firebase-hosting.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches: [main]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

---

## Scaling

Your app can handle thousands of users on the free tier. If you need more:

1. **Upgrade Firebase** - Pay-as-you-go is very reasonable
2. **Add Caching** - Use Firebase Hosting CDN
3. **Optimize Queries** - Firestore queries are already efficient
4. **Add Rate Limiting** - Use Firebase App Check

---

## Support

- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

## Quick Reference

| Platform | Deploy Command | Auto-Deploy | Free Tier |
|----------|---------------|-------------|-----------|
| Firebase | `firebase deploy` | ✅ (with GitHub Actions) | ✅ Generous |
| Vercel | `vercel --prod` | ✅ (GitHub integration) | ✅ Excellent |
| Netlify | `netlify deploy --prod` | ✅ (GitHub integration) | ✅ Great |

---

**Congratulations! Your Pollify app is now live! 🎉**
