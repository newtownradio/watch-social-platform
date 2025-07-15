# BubliAI - Modular Component Architecture

BubliAI is a sophisticated AI-powered shopping discovery platform built with a modular component architecture that can easily translate to iOS development.

## 🏗️ Architecture Overview

The application is built using a three-tier component architecture:

### 1. Data Layer (`DataManager.js`)
- **Purpose**: Centralized data management and business logic
- **iOS Equivalent**: Core Data models, data services, and business logic classes
- **Features**:
  - Brand and deal data management
  - Real-time data simulation
  - User preferences and activity tracking
  - Data export for iOS compatibility

### 2. UI Layer (`UIComponentManager.js`)
- **Purpose**: Reusable UI components and visual elements
- **iOS Equivalent**: UIKit components, custom views, and view controllers
- **Features**:
  - Navigation components
  - Deal cards and activity feeds
  - Search and filter interfaces
  - Notification system

### 3. Controller Layer (`AppController.js`)
- **Purpose**: Application state management and coordination
- **iOS Equivalent**: App delegate, scene delegate, and view controllers
- **Features**:
  - Page navigation and routing
  - Event handling and user interactions
  - Real-time updates management
  - State persistence

## 📁 Project Structure

```
BubliAI/
├── components/
│   ├── DataManager.js          # Data layer
│   ├── UIComponentManager.js   # UI layer
│   └── AppController.js        # Controller layer
├── index-modular.html          # Main application entry point
├── index.html                  # Original monolithic version
├── discovery.html              # Discovery page
├── deals.html                  # Deals page
├── social.html                 # Social planning page
├── member.html                 # Member dashboard
├── signup.html                 # Signup page
├── output.css                  # Styling
└── README.md                   # This file
```

## 🚀 Getting Started

### Web Development

1. **Start the development server**:
   ```bash
   cd BubliAI
   python3 -m http.server 8000
   ```

2. **Open the application**:
   - Navigate to `http://localhost:8000/index-modular.html`
   - The modular version uses the component architecture
   - Navigate to `http://localhost:8000/index.html` for the original version

3. **Development tools** (available in dev mode):
   ```javascript
   // Access development tools in browser console
   window.devTools.refreshData()      // Force refresh data
   window.devTools.showState()        // Show application state
   window.devTools.testPage('deals')  // Navigate to test page
   window.devTools.simulateError()    // Simulate error state
   ```

### iOS Development Translation

The component architecture is designed for easy translation to iOS:

#### Data Layer Translation
```swift
// DataManager.swift equivalent
class DataManager {
    var deals: [Deal] = []
    var activityFeed: [String] = []
    var userPreferences: UserPreferences = UserPreferences()
    
    func getDeals() -> [Deal] { return deals }
    func getTrendingDeals() -> [Deal] { return deals.filter { $0.trending } }
    func getDealsByCategory(_ category: String) -> [Deal] { ... }
}
```

#### UI Layer Translation
```swift
// UIComponentManager.swift equivalent
class UIComponentManager {
    func createNavigationController() -> UINavigationController { ... }
    func createDealCard(for deal: Deal) -> UICollectionViewCell { ... }
    func createActivityCard(for activity: String) -> UITableViewCell { ... }
}
```

#### Controller Layer Translation
```swift
// AppController.swift equivalent
class AppController: UIViewController {
    let dataManager = DataManager()
    let uiManager = UIComponentManager()
    
    func navigateToPage(_ pageName: String) { ... }
    func handleSearch(_ query: String) { ... }
    func handleFilter(_ filterType: String, _ filterValue: String) { ... }
}
```

## 🎨 Design System

### Color Palette
- **Primary**: `#FFABDF` (Luxury Hot Pink)
- **Secondary**: `#F5F5DC` (Luxury Beige)
- **Background**: `#000000` (Black)
- **Text**: `#FFFFFF` (White)
- **Accent**: `#111111` (Dark Gray)

### Typography
- **Font Family**: Space Grotesk
- **Weights**: 400 (Regular), 700 (Bold)
- **Letter Spacing**: 1-4px for headings

### Component Patterns
- **Cards**: Dark background with colored borders
- **Buttons**: Solid colors with uppercase text
- **Navigation**: Sticky header with backdrop blur
- **Animations**: Subtle fade-ins and hover effects

## 🔧 Component API

### DataManager API
```javascript
// Get data
const deals = dataManager.getDeals()
const trending = dataManager.getTrendingDeals()
const activities = dataManager.getActivityFeed()

// Manipulate data
dataManager.addDeal(newDeal)
dataManager.updateDeal(id, updates)
dataManager.addActivity(activity)

// Export for iOS
const iosData = dataManager.exportForIOS()
```

### UIComponentManager API
```javascript
// Render components
uiManager.components.navigation.render('nav-container')
uiManager.components.dealCard.render(deal, 'deals-grid')
uiManager.components.notification.show('Message')

// Get iOS equivalents
const iosNav = uiManager.components.navigation.getIOSEquivalent()
const iosCard = uiManager.components.dealCard.getIOSEquivalent()
```

### AppController API
```javascript
// Navigation
app.navigateToPage('discovery')
app.navigateToPage('deals')

// Search and filter
app.handleSearch('Chanel')
app.handleFilter('category', 'luxury_fashion')

// Get state
const state = app.getState()
```

## 🌐 Global API for iOS Integration

The application exposes a global `BubliAI` object for iOS integration:

```javascript
// Available in window.BubliAI
window.BubliAI.getState()           // Get application state
window.BubliAI.navigateToPage()     // Navigate to page
window.BubliAI.search()             // Search deals
window.BubliAI.filter()             // Filter deals
window.BubliAI.getDeals()           // Get all deals
window.BubliAI.getTrendingDeals()   // Get trending deals
window.BubliAI.getActivityFeed()    // Get activity feed
window.BubliAI.exportData()         // Export data for iOS
window.BubliAI.initializeIOS()      // Initialize iOS features
```

## 📱 iOS Integration Guide

### 1. WebView Integration
```swift
// In your iOS app
let webView = WKWebView()
webView.load(URLRequest(url: URL(string: "http://localhost:8000/index-modular.html")!))

// JavaScript bridge
webView.evaluateJavaScript("window.BubliAI.getState()") { result, error in
    // Handle result
}
```

### 2. Native Component Translation
```swift
// Translate DataManager to Core Data
class Deal: NSManagedObject {
    @NSManaged var id: Int32
    @NSManaged var brand: String
    @NSManaged var description: String
    @NSManaged var price: Double
    @NSManaged var trending: Bool
}

// Translate UI components to UIKit
class DealCardCell: UICollectionViewCell {
    @IBOutlet weak var brandLogoImageView: UIImageView!
    @IBOutlet weak var brandNameLabel: UILabel!
    @IBOutlet weak var priceLabel: UILabel!
    @IBOutlet weak var actionButton: UIButton!
}
```

### 3. State Management
```swift
// App state management
class AppState: ObservableObject {
    @Published var currentPage: String = "home"
    @Published var deals: [Deal] = []
    @Published var activityFeed: [String] = []
}
```

## 🧪 Testing

### Web Testing
1. Open browser developer tools
2. Navigate to `http://localhost:8000/index-modular.html`
3. Use development tools in console:
   ```javascript
   window.devTools.refreshData()
   window.devTools.showState()
   window.devTools.testPage('discovery')
   ```

### iOS Testing
1. Build the iOS project in Xcode
2. Run on simulator or device
3. Test component interactions
4. Verify data persistence

## 🔄 Real-time Features

The application includes real-time features that update every 5 seconds:
- Live activity feed updates
- Dynamic price changes
- Trending status updates
- New deal notifications

## 📊 Performance Optimizations

### Web Optimizations
- Lazy loading of components
- Efficient DOM manipulation
- Optimized event listeners
- Memory leak prevention

### iOS Optimizations
- Core Data batch operations
- UICollectionView prefetching
- Background data updates
- Memory management

## 🚀 Deployment

### Web Deployment
1. Build the application
2. Deploy to web server
3. Configure CDN for assets
4. Set up monitoring

### iOS Deployment
1. Configure signing certificates
2. Build for App Store
3. Submit for review
4. Monitor crash reports

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the component examples

---

**BubliAI** - Transforming shopping discovery with AI-powered insights and modular architecture. 