# Aibek Zhumabekov - Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features a clean design with 3D elements, SEO optimization, and accessibility best practices.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and functional components
- **Performance Optimized**: Vite for fast development and optimized builds
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **3D Interactive Elements**: Three.js integration for engaging visuals
- **SEO Optimized**: Dynamic meta tags with React Helmet Async
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Error Handling**: Comprehensive error boundaries and graceful fallbacks
- **Type Safety**: JSDoc comments for better code documentation
- **Modern Tooling**: ESLint, Prettier, and modern development practices

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS 4.x
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Build Tool**: Vite
- **Icons**: React Icons, Heroicons
- **SEO**: React Helmet Async
- **UI Components**: Headless UI

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Loading)
│   ├── layout/         # Layout components
│   ├── ErrorBoundary.jsx
│   ├── SEO.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── Logo.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── hooks/              # Custom React hooks
│   └── useLocalStorage.js
├── constants/          # Configuration and constants
│   ├── siteConfig.js
│   └── socialLinks.js
├── utils/              # Utility functions
│   └── index.js
├── App.jsx             # Main app component
└── main.jsx           # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aibekz/portfolio.git
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

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Customization

### Site Configuration

Edit `src/constants/siteConfig.js` to update:
- Personal information
- Site metadata
- Contact details

### Social Links

Modify `src/constants/socialLinks.js` to update social media links and icons.

### Styling

The project uses Tailwind CSS. Customize the design by:
- Editing `tailwind.config.js` for theme customization
- Modifying component styles in individual files
- Adding custom CSS in `src/App.css`

## 🔧 Key Improvements Made

### Performance
- Lazy loading for 3D components with Suspense
- Optimized bundle splitting
- Preconnect hints for external resources

### SEO & Accessibility
- Dynamic meta tags for each page
- Proper semantic HTML structure
- ARIA labels and keyboard navigation
- Screen reader friendly content

### Code Quality
- Error boundaries for graceful error handling
- Custom hooks for reusable logic
- Comprehensive utility functions
- JSDoc documentation
- Consistent code organization

### User Experience
- Loading states for better perceived performance
- Responsive design for all devices
- Smooth transitions and animations
- Intuitive navigation

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

Aibek Zhumabekov - [aibek.zhumabekov@outlook.com](mailto:aibek.zhumabekov@outlook.com)

Project Link: [https://github.com/aibekz/portfolio](https://github.com/aibekz/portfolio)

Website: [https://aibekz.com](https://aibekz.com)
