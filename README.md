# Threshold Realty — Lab website

Files
- index.html   Landing page: hero video, listings, mortgage calculator (X-factor), X-factor note in footer
- guide.html   Second page: First-Time Buyer Guide
- styles.css   Shared styles for both pages
- chat.js      Chatbot widget, loaded on both pages (Chatling Lab 3 bot)
- skyline.js   Draws the Dallas skyline at the top of both pages
- listings.js  Sample home listings + the ZIP code/price/bedroom filters
- fonts/       Alfa Slab One + Archivo (free, open-license fonts)
- media/       Put your video here

Video
media/hero-video.mp4 is a 5-second AI-generated clip (made by Claude) that loops seamlessly.
To swap in a different clip, save it as media/hero-video.mp4. It plays automatically, muted, on a loop.

Change the chatbot
Open chat.js and change CHATBOT_URL on line 9.

Rubric map
1. AI video ............ index.html, hero (media/hero-video.mp4)
2. Autoplay loop ....... <video autoplay muted loop playsinline>
3. Second page ......... "Explore the Buyer Guide" button -> guide.html
4. Chatbot ............. chat.js on index.html and guide.html
5. X-factor ............ Mortgage calculator + description at bottom of index.html
