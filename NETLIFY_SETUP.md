# 🚀 Netlify Deploy Kılavuzu

## Step 1: Netlify'a Git
1. https://netlify.com adresine git
2. "Log in" → GitHub ile giriş yap (ortakai2025 hesabı)
3. "Add new site" → "Import an existing project" seç

## Step 2: GitHub Repo Bağla
1. "GitHub" provider seç
2. Authorization yap
3. Repository: **arya-yaz** seç

## Step 3: Build Settings
```
Build command:    npm run build
Publish directory: dist
Functions directory: netlify/functions
```

## Step 4: Ortam Değişkenleri
1. "Site settings" → "Build & deploy" → "Environment"
2. **Add environment variable:**
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-your-actual-key-here`
   
   (Claude API anahtarını https://console.anthropic.com/ adresinden al)

## Step 5: Deploy!
- "Deploy site" butonuna tıkla
- Otomatik build ve deploy başlayacak
- ~2-3 dakika içinde siteniz canlı olacak

## Step 6: Canlı Site
1. Netlify Dashboard → "arya-yaz" → "Live site URL"
2. Tarayıcıda aç ve test et
3. Code push yap → otomatik redeploy

---

**Ek Bilgi:**
- Her `git push` sonrasında Netlify otomatik build ve deploy edecek
- `netlify.toml` zaten konfigüre edildi (build settings)
- `netlify/functions/claude-proxy.js` Anthropic API'ye secure proxy yapacak
