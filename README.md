# 📄 TLDR - AI Web Summarizer

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://chrome.google.com/webstore)
[![Version](https://img.shields.io/badge/version-1.0-green.svg)](https://github.com/yourusername/tldr)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **Transform any webpage into a concise, digestible summary with the power of AI.**

TLDR is an intelligent Chrome extension that instantly summarizes web pages, articles, and documents using advanced AI technology. Save time, improve productivity, and never miss important information again.

## ✨ Features

### 🚀 Core Functionality

- **Instant Summarization**: One-click AI-powered summarization of any webpage
- **Smart Content Extraction**: Intelligently identifies and processes main content while filtering out ads and navigation
- **Persistent Storage**: Automatically saves summaries for quick access later
- **Clean Interface**: Modern, intuitive design that doesn't get in your way

### 🎯 Smart Features

- **Loading Indicators**: Visual feedback during processing
- **Error Handling**: Graceful error management with helpful messages
- **Fast Performance**: Optimized for speed and efficiency
- **Cross-Site Compatibility**: Works on virtually any website

### 🎨 User Experience

- **Responsive Design**: Adapts to different content lengths
- **Smooth Animations**: Polished transitions and interactions
- **Accessibility**: Keyboard navigation and screen reader support
- **Customizable**: Settings and preferences (coming soon)

## 🛠️ Installation

### Manual Installation (Developer Mode)

1. **Download the Extension**

   ```bash
   git clone https://github.com/yourusername/tldr-extension.git
   cd tldr-extension
   ```

2. **Load in Chrome**

   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **"Developer mode"** using the toggle in the top right corner
   - Click **"Load unpacked"** and select the downloaded directory
   - The TLDR icon should appear in your Chrome toolbar

3. **Verify Installation**
   - Navigate to any article or webpage
   - Click the TLDR icon in the toolbar
   - You should see the extension popup

## 🚀 Usage

### Basic Usage

1. **Navigate** to any webpage with text content
2. **Click** the TLDR extension icon in your Chrome toolbar
3. **Press** the "Summarize Page" button
4. **Wait** for the AI to process the content (usually 2-5 seconds)
5. **Read** your concise summary instantly

### Advanced Tips

- **Refresh Summaries**: Use the Reset button to clear cached summaries
- **Long Articles**: Works best with articles over 500 words
- **Multiple Languages**: Currently optimized for English content
- **PDF Support**: Works with PDF files opened in Chrome

## ⚙️ Configuration

### Backend Setup

This extension requires a local backend server for AI processing:

1. **Install Dependencies**

   ```bash
   pip install flask flask-cors transformers
   ```

2. **Run the Server**

   ```bash
   python backend/server.py
   ```

   Server will start on `http://127.0.0.1:5000`

3. **Test Connection**
   - Extension will automatically connect to the local server
   - Check browser console for connection status

## 🏗️ Architecture

### Project Structure

```
TLDR/
├── 📁 icons/                 # Extension icons (16px, 48px, 128px)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── 📁 popup/                 # Main extension interface
│   ├── popup.html           # Popup structure
│   ├── popup.css            # Styling and animations
│   ├── popup.js             # Main functionality
│   └── 📁 assets/
│       └── 3-dots-bounce.svg # Loading animation
├── manifest.json            # Extension configuration
└── README.md               # This file
```

### Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python Flask (for AI processing)
- **AI Model**: Transformers library for text summarization
- **Storage**: Chrome Extension Storage API
- **Animations**: CSS3 animations and transitions

## 📋 File Documentation

| File               | Purpose          | Description                                                |
| ------------------ | ---------------- | ---------------------------------------------------------- |
| `manifest.json`    | Extension Config | Defines permissions, popup, and extension metadata         |
| `popup/popup.html` | UI Structure     | HTML layout for the extension popup interface              |
| `popup/popup.css`  | Styling          | CSS styles, animations, and responsive design              |
| `popup/popup.js`   | Core Logic       | JavaScript for summarization, storage, and UI interactions |
| `icons/`           | Visual Assets    | Extension icons in multiple sizes for different contexts   |

_⭐ If you find this extension helpful, please consider giving it a star on GitHub!_
