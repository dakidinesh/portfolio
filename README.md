# Dinesh Daki - Portfolio

A modern, responsive portfolio website built with React and Vite, featuring smooth animations, dark/light theme toggle, and an interactive mascot.

🔗 **Live Demo:** [dineshdaki.dev](https://dineshdaki.dev)

## ✨ Features

- **Responsive Design** - Optimized for desktop, tablet (iPad), and mobile devices
- **Dark/Light Theme** - Toggle between themes with persistent preference
- **Smooth Animations** - Powered by Framer Motion
- **Interactive Mascot** - A cute roaming character with various expressions
- **Time-based Greeting** - Dynamic greeting based on time of day
- **Loading Screen** - Animated intro when site loads
- **Back to Top Button** - Smooth scroll to top
- **Visitor Counter** - Track site visitors

## 📂 Sections

- **Home** - Hero section with intro and CTA buttons
- **Education** - Academic background with university logos
- **Experience** - Work history with company logos and highlights
- **Skills** - Technical skills organized by category with icons
- **Certifications** - AWS and IBM certifications
- **Projects** - Featured projects with descriptions and tech stack
- **Contact** - Contact form and social links

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** CSS3 with CSS Variables
- **Animations:** Framer Motion
- **Icons:** Devicon, Custom SVGs
- **Build Tool:** Vite
- **Package Manager:** npm

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dineshdaki/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── public/
│   └── resume.pdf
├── src/
│   ├── assets/
│   │   ├── csuf-logo.png
│   │   ├── gitam-logo.png
│   │   ├── replyquick-logo.png
│   │   └── phoenixglobal-logo.png
│   ├── components/
│   │   ├── BackToTop.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── Navigation.jsx
│   │   ├── RoamingMascot.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── index.js
│   ├── sections/
│   │   ├── FloatingElements.jsx
│   │   ├── Hero.jsx
│   │   └── index.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization

### Theme Colors

Edit the CSS variables in `src/App.css`:

```css
:root {
  --accent-primary: #00d4ff;
  --accent-secondary: #0099ff;
  --bg-primary: #050510;
  /* ... */
}
```

### Content

Update your information in `src/App.jsx`:
- Personal details in the `Hero` component
- Work experience in the `Experience` component
- Education in the `Education` component
- Skills in the `Skills` component
- Projects in the `Projects` component
- Certifications in the `Certifications` component

## 📱 Responsive Breakpoints

- **Desktop:** 1366px+
- **iPad Pro:** 1024px - 1366px
- **iPad:** 768px - 1024px
- **Mobile:** 480px - 768px
- **Small Mobile:** < 480px

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Dinesh Daki**
- LinkedIn: [linkedin.com/in/dineshdaki](https://www.linkedin.com/in/dineshdaki/)
- GitHub: [github.com/dineshdaki](https://github.com/dineshdaki)
- Email: dakidinesh0711@gmail.com

---

⭐ If you like this portfolio, give it a star on GitHub!
