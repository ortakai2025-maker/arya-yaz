# 🚀 Netlify Deploy — Hızlı Yol (5 dakika)

## Adım 1: Tarayıcıda Aç
```
https://netlify.com → "Log in" → GitHub ile giriş
```

## Adım 2: Yeni Site Ekle
1. Dashboard → **"Add new site"**
2. **"Import an existing project"** seç
3. **"GitHub"** provider seç
4. Authorization ver
5. **arya-yaz** repository seç

## Adım 3: Build Settings (Otomatik Doluyor)
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `netlify/functions` ✅

*(Bu ayarlar netlify.toml'den otomatik yüklenecek)*

## Adım 4: Deploy!
1. **"Deploy site"** butonuna tıkla
2. Build başlayacak (~2-3 dakika)
3. Deploy tamamlanınca URL verilecek

## Adım 5: Ortam Değişkeni Ekle
1. Netlify Dashboard → **"Site settings"**
2. **"Build & deploy"** → **"Environment"**
3. **"Add environment variable":**
   ```
   Key:   ANTHROPIC_API_KEY
   Value: sk-ant-... (Claude API key)
   ```
4. **Redeploy** butonuna tıkla

## ✅ Bitir!
- Canlı URL'yi git (example: `arya-yaz-xxx.netlify.app`)
- Tarayıcıda aç → Welcome mesajını gör
- Git push yap → Otomatik redeploy

---

**İyi haber:** `netlify.toml` ve `netlify/functions/` zaten konfigüre edildi! 🎉
