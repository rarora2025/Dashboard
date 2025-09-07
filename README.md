# Personal Dashboard 🚀

A beautiful, modern personal dashboard built with HTML, CSS, and JavaScript. Perfect for staying organized and motivated throughout your day!

## ✨ Features

### 🔑 Core Features (MVP)
- **User Profile** - Simple profile setup with name and location preferences
- **Live Clock & Weather** - Real-time clock, date, and weather based on your location
- **To-Do List** - Add, complete, and delete tasks with persistent storage
- **Notes Pad** - Write and save quick notes that auto-save as you type
- **Daily Quote Generator** - Get inspired with random motivational quotes

### 🌟 Cool Features
- **Dark Mode Toggle** - Switch between light and dark themes
- **Search Integration** - Quick Google search right from the dashboard
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Keyboard Shortcuts** - Ctrl/Cmd + K for search, Escape to close modals
- **Auto-save** - Your notes and todos are automatically saved
- **Modern UI** - Clean, professional design with smooth animations

## 🚀 Getting Started

### Quick Start
1. Simply open `index.html` in your web browser
2. Click on your profile avatar to set up your name and location
3. Start adding tasks and notes!

### Weather Setup (Optional)
To enable real weather data:
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `script.js`
3. Replace `'your_api_key_here'` on line 89 with your actual API key
4. Refresh the page

## 📱 How to Use

### User Profile
- Click the profile avatar in the top-left corner
- Enter your name and location
- Your preferences are saved automatically

### To-Do List
- Click the "+" button to add a new task
- Check off completed tasks
- Delete tasks you no longer need
- All tasks are saved in your browser's local storage

### Notes Pad
- Type your notes in the textarea
- Notes auto-save as you type
- Click the save button for manual save confirmation

### Search
- Click the search icon or press Ctrl/Cmd + K
- Type your query and press Enter or click search
- Opens Google search in a new tab

### Dark Mode
- Click the moon/sun icon in the top-right corner
- Your theme preference is remembered

## 🛠️ Customization

### Adding More Quotes
Edit the `quotes` array in `script.js` to add your own inspirational quotes:

```javascript
this.quotes = [
    {
        text: "Your custom quote here",
        author: "Author Name"
    },
    // ... more quotes
];
```

### Changing Colors
Modify the CSS variables in `styles.css` to customize the color scheme:

```css
:root {
    --accent: #3b82f6;        /* Primary accent color */
    --bg-primary: #f8fafc;    /* Background color */
    --text-primary: #1e293b;  /* Text color */
    /* ... more variables */
}
```

### Adding New Widgets
1. Add HTML structure in `index.html`
2. Style it in `styles.css`
3. Add functionality in `script.js`

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No frameworks, pure JS
- **Local Storage** - Data persistence
- **Font Awesome** - Icons
- **Google Fonts** - Typography

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Structure
```
DashBoard/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎯 Future Enhancements

Here are some ideas for future improvements:

### API Integrations
- News headlines
- Stock prices
- Spotify "Now Playing"
- Calendar events

### Advanced Features
- Drag & drop widget arrangement
- Gamified to-do list with points
- Background customization
- Multiple dashboard themes
- Export/import data
- Offline support with Service Workers

### Mobile Features
- PWA (Progressive Web App) support
- Push notifications
- Mobile-optimized gestures

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons by [Font Awesome](https://fontawesome.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Weather data by [OpenWeatherMap](https://openweathermap.org/)
- Inspiration from modern dashboard designs

---

**Happy coding! 🎉**

If you find this project helpful, consider giving it a star! ⭐
