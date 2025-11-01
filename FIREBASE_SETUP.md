# 🔥 Firebase Setup Guide

Firebase makes it incredibly easy to deploy your Pollify app - no backend server needed!

## Step 1: Create Firebase Project (5 minutes)

1. **Go to Firebase Console**
   - Visit [console.firebase.google.com](https://console.firebase.google.com)
   - Click "Add project"

2. **Create Project**
   - Project name: `pollify` (or your preferred name)
   - (Optional) Enable Google Analytics
   - Click "Create project"
   - Wait for project creation (~30 seconds)

3. **Register Web App**
   - Click the web icon (`</>`) to add a web app
   - App nickname: `Pollify Web`
   - ✅ Check "Also set up Firebase Hosting"
   - Click "Register app"

4. **Copy Firebase Config**
   - You'll see a config object like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "pollify-xxxxx.firebaseapp.com",
     projectId: "pollify-xxxxx",
     storageBucket: "pollify-xxxxx.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:..."
   };
   ```
   - **Keep this page open** - you'll need these values!

## Step 2: Set Up Firestore Database

1. **Create Firestore Database**
   - In Firebase Console, go to "Build" → "Firestore Database"
   - Click "Create database"

2. **Choose Security Mode**
   - Select "Start in **test mode**" (for development)
   - Click "Next"

3. **Select Location**
   - Choose the region closest to you
   - Click "Enable"

4. **Update Security Rules** (Important!)
   - Go to "Rules" tab
   - Replace with these rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow anyone to read polls
       match /polls/{pollId} {
         allow read: if true;
         
         // Allow anyone to create polls
         allow create: if true;
         
         // Allow updates only if adding votes
         allow update: if request.resource.data.diff(resource.data).affectedKeys()
           .hasOnly(['votes', 'voterIds']);
       }
     }
   }
   ```
   - Click "Publish"

## Step 3: Configure Your App

1. **Create `.env.local` file** in your project root:
   ```env
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=pollify-xxxxx.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=pollify-xxxxx
   VITE_FIREBASE_STORAGE_BUCKET=pollify-xxxxx.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:...
   ```

   Replace the values with your Firebase config from Step 1!

2. **Install Firebase**
   ```bash
   npm install
   ```

## Step 4: Run Your App

```bash
npm run dev
```

Visit `http://localhost:5173` and you're done! 🎉

## Testing

1. **Create a poll** - Everything saves to Firebase automatically!
2. **Open in incognito** - Vote as a different user
3. **Check Firebase Console** - Go to Firestore Database to see your data

## Security Rules Explained

The rules we set up allow:
- ✅ Anyone can read polls (public access)
- ✅ Anyone can create polls (no auth needed)
- ✅ Anyone can vote (updates votes and voterIds only)
- ❌ No one can delete polls
- ❌ No one can modify poll questions or options

For production, these rules are fine since:
- Polls are meant to be public
- One vote per device is enforced in the app code
- No sensitive data is stored

## Firestore Data Structure

```
polls/ (collection)
  └── [pollId]/ (document)
      ├── pollId: "abc12345"
      ├── question: "What's your favorite color?"
      ├── options: ["Red", "Blue", "Green"]
      ├── multipleChoice: false
      ├── votes: { 0: 5, 1: 3, 2: 7 }
      ├── voterIds: ["voter_123...", "voter_456..."]
      └── createdAt: Timestamp
```

## Troubleshooting

### "Firebase: Error (auth/api-key-not-valid)"
- Check that your `.env.local` values are correct
- Make sure there are no spaces or quotes around values
- Restart your dev server: `npm run dev`

### "Missing or insufficient permissions"
- Go to Firestore → Rules
- Make sure you published the security rules above
- Wait a minute for rules to propagate

### "Cannot read polls"
- Check Firestore Database in Firebase Console
- Make sure the database is created
- Verify security rules allow reading

### Changes not reflecting?
- Clear browser cache and reload
- Check browser console for errors
- Verify `.env.local` is in the root directory (not `/src`)

## Next Steps

Once everything works locally:
- Deploy to production (see DEPLOYMENT.md)
- Your Firebase config will work in production too!
- No environment variables needed for deployment on most platforms

## Production Security (Optional)

For production, you might want to add:

1. **Rate Limiting** - Use Firebase App Check
2. **Abuse Prevention** - Monitor usage in Firebase Console
3. **Poll Expiration** - Add Cloud Functions to delete old polls
4. **Stricter Rules** - Limit poll creation rate

These are optional - the current setup works great for most use cases!

## Cost

Firebase free tier includes:
- ✅ 50,000 reads per day
- ✅ 20,000 writes per day
- ✅ 1 GB storage
- ✅ 10 GB bandwidth per month

This is **more than enough** for thousands of users! 🚀

## Support

Need help?
- [Firebase Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com)
- Check the browser console for error messages

