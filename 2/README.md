# Grab&Go Landing Page

A modern, interactive one-page landing site designed in the style of Grab&Go.pt with bold orange branding, smooth animations, and engaging user interactions.

## 🎯 Features

### **Design & Branding**
- **Bold Orange Color Scheme**: Primary color #FF5F00 with clean light backgrounds
- **Modern Typography**: Inter font family for clean, professional look
- **Minimal-Clean Aesthetic**: Following Grab&Go design principles
- **Vector Illustrations**: Custom CSS-drawn vending machine and UI elements

### **Hero Section**
- **Full-width Vending Machine**: Illustrated kiosk with subtle morph animation
- **Day/Night Mode**: Automatic transition every 10 seconds
- **Real-time Clock**: Live time display on vending machine screen
- **Scroll Indicator**: Minimal "scroll to explore" with bounce animation
- **Parallax Background**: Floating elements with different speeds

### **Interactive Elements**
- **Custom Cursor**: Circular highlight effect on hoverable elements
- **Scroll Progress Bar**: Top progress indicator tracking page position
- **Smooth Animations**: GSAP-powered scroll-triggered animations
- **Hover Effects**: Subtle transforms and micro-animations

### **Sections & Content**
- **Features Grid**: 4 key benefits with animated icons
- **How It Works**: 3-step process with interactive illustrations
- **Location Map**: Animated map pins with location details
- **Call-to-Action**: Engaging CTA section with gradient background
- **Footer**: Contact info, social links, and company details

### **Animations & Effects**
- **Scroll-Triggered**: Elements reveal as user scrolls
- **Parallax Layers**: Background elements move at different speeds
- **Sticky Sections**: Step-by-step content blocks
- **Map Animations**: Pin drops and marker fade-ins
- **Micro-animations**: Icons pulsing, hover bounces, looped effects

## 🚀 Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Interactive functionality and animations
- **GSAP**: Professional animation library
- **ScrollTrigger**: Advanced scroll-based animations
- **Font Awesome**: Icons for enhanced visual appeal
- **Google Fonts**: Inter font family

## 📁 File Structure

```
grabandgo-landing/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript with GSAP animations
└── README.md          # This file
```

## 🎨 Design System

### **Color Palette**
- **Primary Orange**: #FF5F00
- **Primary Dark**: #E55400
- **Primary Light**: #FF7A33
- **Secondary**: #2C3E50
- **Text Dark**: #2C3E50
- **Text Light**: #7F8C8D
- **Background Light**: #FFFFFF
- **Background Gray**: #F8F9FA

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Hierarchy**: Clear typographic scale

### **Animations**
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Duration**: 0.3s for micro-interactions
- **Scroll Triggers**: 80% viewport entry
- **Performance**: Optimized for 60fps

## 🎭 Key Animations

### **Hero Section**
- **Title Animation**: Staggered slide-in from bottom
- **Vending Machine**: Slide-in from right with morph effects
- **Background Elements**: Scale and fade-in with delays
- **Day/Night Toggle**: Automatic color transitions

### **Scroll Animations**
- **Feature Cards**: Fade-in with staggered delays
- **Step Cards**: Slide from alternating sides
- **Location Items**: Slide from left with opacity
- **Map Pins**: Scale and fade-in with bounce effect

### **Interactive Effects**
- **Custom Cursor**: Scale and color change on hover
- **Button Hover**: Scale and shadow effects
- **Card Hover**: Lift and shadow animations
- **Zone Selection**: Active state with scale animation

## 📱 Responsive Design

### **Mobile Optimizations**
- **Simplified Layouts**: Single-column grids on mobile
- **Reduced Animations**: Lower complexity for performance
- **Touch-Friendly**: Larger touch targets
- **Hamburger Menu**: Animated mobile navigation

### **Breakpoints**
- **Desktop**: 1200px+ (full animations)
- **Tablet**: 768px-1199px (reduced animations)
- **Mobile**: <768px (simplified layout)

## 🎯 Performance Features

### **Optimizations**
- **GSAP Performance**: Hardware-accelerated animations
- **ScrollTrigger**: Efficient scroll detection
- **Mobile Detection**: Reduced complexity on mobile
- **Lazy Loading**: Animations trigger on scroll

### **Browser Support**
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Fallbacks**: Graceful degradation for older browsers

## 🛠️ Getting Started

1. **Download Files**: Extract all files to your local machine
2. **Open in Browser**: Simply open `index.html` in your web browser
3. **No Build Process**: No compilation or build process required
4. **Live Server**: For development, use a local server for best experience

## 🎨 Customization

### **Colors**
Update CSS custom properties in `:root`:
```css
:root {
    --primary-color: #FF5F00;
    --primary-dark: #E55400;
    --primary-light: #FF7A33;
    /* ... other colors */
}
```

### **Animations**
Modify GSAP animations in `script.js`:
```javascript
// Example: Change animation duration
gsap.from('.feature-card', {
    duration: 0.8, // Adjust timing
    ease: 'power3.out' // Change easing
});
```

### **Content**
Update HTML content in `index.html`:
- Change text content
- Modify feature descriptions
- Update location information
- Customize contact details

## 🚀 Deployment

### **Static Hosting**
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Push to GitHub repository
- **AWS S3**: Upload files to S3 bucket

### **Requirements**
- Modern web server
- HTTPS recommended for production
- No server-side processing required

## 📈 Future Enhancements

### **Potential Additions**
- **Dark Mode Toggle**: User preference system
- **Language Switcher**: Multi-language support
- **Product Catalog**: Interactive product browsing
- **Real-time Inventory**: Live stock updates
- **User Accounts**: Customer login system
- **Payment Integration**: Direct payment processing

### **Performance Improvements**
- **Image Optimization**: WebP format support
- **Code Splitting**: Lazy load sections
- **Service Worker**: Offline functionality
- **CDN Integration**: Faster content delivery

## 🤝 Contributing

This is a demonstration project. For commercial use:
1. Replace placeholder content with real business information
2. Update branding and colors to match your brand
3. Add your own images and illustrations
4. Customize animations to match your style
5. Test thoroughly across devices and browsers

## 📄 License

This project is for educational and demonstration purposes. All design elements are inspired by modern web design principles and the Grab&Go aesthetic.

## 🎉 Credits

- **Design Inspiration**: Grab&Go.pt
- **Animation Library**: GSAP (GreenSock)
- **Icons**: Font Awesome
- **Typography**: Google Fonts (Inter)
- **Development**: Modern web standards

---

**Ready to deploy your own Grab&Go style landing page?** Simply customize the content, update the branding, and you're ready to go! 🚀 