//
//  ViewController.swift
//  BasedlyAI
//
//  Created by Colin Ilgen on 7/14/25.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate {
    
    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupWebView()
        loadBasedlyAI()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        updateWebViewLayout()
    }
    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        super.viewWillTransition(to: size, with: coordinator)
        
        coordinator.animate(alongsideTransition: { _ in
            self.updateWebViewLayout()
        }) { _ in
            self.notifyWebAppOfOrientationChange()
        }
    }
    
    private func setupWebView() {
        let webConfiguration = WKWebViewConfiguration()
        webConfiguration.allowsInlineMediaPlayback = true
        webConfiguration.mediaTypesRequiringUserActionForPlayback = []
        webConfiguration.preferences.javaScriptEnabled = true
        webConfiguration.preferences.javaScriptCanOpenWindowsAutomatically = true
        
        // Enable viewport meta tag support
        webConfiguration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        webConfiguration.preferences.setValue(true, forKey: "allowUniversalAccessFromFileURLs")
        
        webView = WKWebView(frame: view.bounds, configuration: webConfiguration)
        webView.navigationDelegate = self
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        
        view.addSubview(webView)
        
        // Set background colors
        webView.backgroundColor = UIColor.systemBackground
        view.backgroundColor = UIColor.systemBackground
        
        // Configure scrolling behavior
        webView.scrollView.bounces = true
        webView.scrollView.alwaysBounceVertical = true
        webView.scrollView.alwaysBounceHorizontal = false
        webView.scrollView.showsVerticalScrollIndicator = true
        webView.scrollView.showsHorizontalScrollIndicator = false
        
        // Enable zooming for better navigation
        webView.scrollView.minimumZoomScale = 0.5
        webView.scrollView.maximumZoomScale = 2.0
        webView.scrollView.zoomScale = 1.0
        
        // Set content insets to handle safe areas
        webView.scrollView.contentInsetAdjustmentBehavior = .automatic
    }
    
    private func updateWebViewLayout() {
        // Make WebView fill the entire view
        webView.frame = view.bounds
        
        // Handle safe area insets properly
        let safeAreaInsets = view.safeAreaInsets
        let adjustedFrame = CGRect(
            x: 0,
            y: 0,
            width: view.bounds.width,
            height: view.bounds.height
        )
        
        webView.frame = adjustedFrame
        
        // Update scroll view content insets
        webView.scrollView.contentInset = safeAreaInsets
        webView.scrollView.scrollIndicatorInsets = safeAreaInsets
    }
    
    private func loadBasedlyAI() {
        print("=== Starting BasedlyAI load ===")
        
        // Try to load from web subdirectory
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "web") {
            print("Found index.html in web subdirectory: \(url)")
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else {
            print("❌ index.html not found in web subdirectory")
            showErrorAlert(message: "Unable to load BasedlyAI content. Please check the app bundle.")
        }
    }
    
    private func notifyWebAppOfOrientationChange() {
        let orientation = UIDevice.current.orientation
        let isPortrait = orientation == .portrait || orientation == .portraitUpsideDown
        let isLandscape = orientation == .landscapeLeft || orientation == .landscapeRight
        
        let script = """
        if (window.orientationChangeHandler) {
            window.orientationChangeHandler({
                isPortrait: \(isPortrait),
                isLandscape: \(isLandscape),
                orientation: '\(orientation.rawValue)'
            });
        }
        """
        
        webView.evaluateJavaScript(script) { result, error in
            if let error = error {
                print("Error notifying web app of orientation change: \(error)")
            }
        }
    }
    
    private func showErrorAlert(message: String) {
        let alert = UIAlertController(title: "Connection Error", 
                                    message: message, 
                                    preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Retry", style: .default) { _ in
            self.loadBasedlyAI()
        })
        alert.addAction(UIAlertAction(title: "OK", style: .cancel))
        present(alert, animated: true)
    }
    
    // MARK: - WKNavigationDelegate
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        print("✅ BasedlyAI web app loaded successfully")
        
        // Inject responsive CSS and device info
        injectResponsiveCSS()
        injectDeviceInfo()
        
        DispatchQueue.main.async {
            self.updateWebViewLayout()
        }
    }
    
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        print("❌ Failed to load BasedlyAI web app: \(error.localizedDescription)")
        showErrorAlert(message: "Unable to load BasedlyAI. Error: \(error.localizedDescription)")
    }
    
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        print("❌ Failed to load BasedlyAI web app (provisional): \(error.localizedDescription)")
        showErrorAlert(message: "Unable to load BasedlyAI. Error: \(error.localizedDescription)")
    }
    
    private func injectResponsiveCSS() {
        let safeAreaTop = view.safeAreaInsets.top
        let safeAreaBottom = view.safeAreaInsets.bottom
        let safeAreaLeft = view.safeAreaInsets.left
        let safeAreaRight = view.safeAreaInsets.right
        
        let responsiveCSS = """
        <style>
        /* iOS App Responsive Fixes - iPhone 16 Pro Max Optimized */
        
        /* Reset and base styles */
        * {
            box-sizing: border-box !important;
            -webkit-overflow-scrolling: touch !important;
        }
        
        html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
            overflow-x: hidden !important;
            font-size: 16px !important;
            line-height: 1.4 !important;
        }
        
        body {
            padding-top: \(safeAreaTop)px !important;
            padding-bottom: \(safeAreaBottom)px !important;
            padding-left: \(safeAreaLeft)px !important;
            padding-right: \(safeAreaRight)px !important;
        }
        
        /* Navigation fixes */
        nav, .nav, .navigation, header, .header {
            position: fixed !important;
            top: \(safeAreaTop)px !important;
            left: \(safeAreaLeft)px !important;
            right: \(safeAreaRight)px !important;
            z-index: 1000 !important;
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            height: 60px !important;
            display: flex !important;
            align-items: center !important;
            padding: 0 16px !important;
        }
        
        /* Main content area */
        main, .main, .content, #content, .container {
            margin-top: \(safeAreaTop + 60)px !important;
            padding: 16px !important;
            min-height: calc(100vh - \(safeAreaTop + safeAreaBottom + 60)px) !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            max-width: 100% !important;
        }
        
        /* Touch-friendly buttons and links */
        button, .btn, a, .link, [role="button"] {
            min-height: 44px !important;
            min-width: 44px !important;
            padding: 12px 16px !important;
            touch-action: manipulation !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        /* Fix any fixed positioning */
        .fixed, [style*="position: fixed"] {
            position: fixed !important;
        }
        
        /* Ensure proper text sizing */
        h1 { font-size: 2em !important; }
        h2 { font-size: 1.5em !important; }
        h3 { font-size: 1.17em !important; }
        p { font-size: 1em !important; }
        
        /* Fix overflow issues */
        .wrapper, .container-fluid {
            max-width: 100% !important;
            overflow-x: hidden !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
        }
        
        /* Specific fixes for common elements */
        .tab-bar, .tabs {
            position: fixed !important;
            bottom: \(safeAreaBottom)px !important;
            left: \(safeAreaLeft)px !important;
            right: \(safeAreaRight)px !important;
            z-index: 1000 !important;
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
        }
        
        /* Ensure images don't overflow */
        img {
            max-width: 100% !important;
            height: auto !important;
        }
        
        /* Fix any absolute positioning */
        .absolute, [style*="position: absolute"] {
            position: absolute !important;
        }
        
        /* Improve scrolling containers */
        .scrollable, .scroll {
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
        }
        </style>
        """
        
        let script = """
        // Inject responsive CSS
        var style = document.createElement('style');
        style.textContent = `\(responsiveCSS)`;
        document.head.appendChild(style);
        
        // Force viewport meta tag
        var viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
        
        // Ensure body takes full height and is scrollable
        document.body.style.height = '100vh';
        document.body.style.overflowY = 'auto';
        document.body.style.overflowX = 'hidden';
        document.body.style.paddingTop = '\(safeAreaTop)px';
        document.body.style.paddingBottom = '\(safeAreaBottom)px';
        document.body.style.paddingLeft = '\(safeAreaLeft)px';
        document.body.style.paddingRight = '\(safeAreaRight)px';
        
        // Fix any existing navigation elements
        var navs = document.querySelectorAll('nav, .nav, .navigation, header, .header');
        navs.forEach(function(nav) {
            nav.style.position = 'fixed';
            nav.style.top = '\(safeAreaTop)px';
            nav.style.left = '\(safeAreaLeft)px';
            nav.style.right = '\(safeAreaRight)px';
            nav.style.zIndex = '1000';
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.webkitBackdropFilter = 'blur(10px)';
        });
        
        console.log('Responsive CSS injected successfully for iPhone 16 Pro Max');
        """
        
        webView.evaluateJavaScript(script) { result, error in
            if let error = error {
                print("Error injecting responsive CSS: \(error)")
            } else {
                print("✅ Responsive CSS injected successfully for iPhone 16 Pro Max")
            }
        }
    }
    
    private func injectDeviceInfo() {
        let deviceInfo = """
        {
            platform: 'iOS',
            userAgent: '\(webView.customUserAgent ?? "BasedlyAI iOS App")',
            screenWidth: \(UIScreen.main.bounds.width),
            screenHeight: \(UIScreen.main.bounds.height),
            devicePixelRatio: \(UIScreen.main.scale),
            orientation: '\(UIDevice.current.orientation.rawValue)',
            isPortrait: \(UIDevice.current.orientation == .portrait || UIDevice.current.orientation == .portraitUpsideDown),
            isLandscape: \(UIDevice.current.orientation == .landscapeLeft || UIDevice.current.orientation == .landscapeRight),
            safeAreaTop: \(view.safeAreaInsets.top),
            safeAreaBottom: \(view.safeAreaInsets.bottom),
            safeAreaLeft: \(view.safeAreaInsets.left),
            safeAreaRight: \(view.safeAreaInsets.right),
            deviceModel: 'iPhone 16 Pro Max'
        }
        """
        
        let script = """
        window.deviceInfo = \(deviceInfo);
        window.isNativeApp = true;
        
        // Dispatch custom event for web app to handle
        window.dispatchEvent(new CustomEvent('deviceInfoReady', {
            detail: window.deviceInfo
        }));
        
        // Notify web app of safe areas
        document.documentElement.style.setProperty('--safe-area-top', '\(view.safeAreaInsets.top)px');
        document.documentElement.style.setProperty('--safe-area-bottom', '\(view.safeAreaInsets.bottom)px');
        document.documentElement.style.setProperty('--safe-area-left', '\(view.safeAreaInsets.left)px');
        document.documentElement.style.setProperty('--safe-area-right', '\(view.safeAreaInsets.right)px');
        
        console.log('Device info injected successfully for iPhone 16 Pro Max');
        """
        
        webView.evaluateJavaScript(script) { result, error in
            if let error = error {
                print("Error injecting device info: \(error)")
            } else {
                print("✅ Device info injected successfully for iPhone 16 Pro Max")
            }
        }
    }
}

