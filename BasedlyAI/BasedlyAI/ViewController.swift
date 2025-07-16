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
        
        webView = WKWebView(frame: view.bounds, configuration: webConfiguration)
        webView.navigationDelegate = self
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        
        view.addSubview(webView)
        
        webView.backgroundColor = UIColor.systemBackground
        view.backgroundColor = UIColor.systemBackground
        
        webView.scrollView.bounces = true
        webView.scrollView.alwaysBounceVertical = true
        webView.scrollView.alwaysBounceHorizontal = false
    }
    
    private func updateWebViewLayout() {
        webView.frame = view.bounds
        
        let safeAreaInsets = view.safeAreaInsets
        let adjustedFrame = CGRect(
            x: safeAreaInsets.left,
            y: safeAreaInsets.top,
            width: view.bounds.width - safeAreaInsets.left - safeAreaInsets.right,
            height: view.bounds.height - safeAreaInsets.top - safeAreaInsets.bottom
        )
        
        webView.frame = adjustedFrame
    }
    
    private func loadBasedlyAI() {
        print("=== Starting BasedlyAI load ===")
        
        // Debug: List all bundle resources
        if let resourcePath = Bundle.main.resourcePath {
            print("Bundle resource path: \(resourcePath)")
            do {
                let contents = try FileManager.default.contentsOfDirectory(atPath: resourcePath)
                print("Bundle contents: \(contents)")
            } catch {
                print("Error listing bundle contents: \(error)")
            }
        }
        
        // Try multiple approaches to load the content
        var loaded = false
        
        // Approach 1: Try web subdirectory
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "web") {
            print("Found index.html in web subdirectory: \(url)")
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
            loaded = true
        } else {
            print("❌ index.html not found in web subdirectory")
        }
        
        // Approach 2: Try root level
        if !loaded, let url = Bundle.main.url(forResource: "index", withExtension: "html") {
            print("Found index.html in root: \(url)")
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
            loaded = true
        } else {
            print("❌ index.html not found in root")
        }
        
        // Approach 3: Try ThreadSocialAI subdirectory (fallback)
        if !loaded, let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "ThreadSocialAI") {
            print("Found index.html in ThreadSocialAI subdirectory: \(url)")
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
            loaded = true
        } else {
            print("❌ index.html not found in ThreadSocialAI subdirectory")
        }
        
        // Approach 4: Try localhost development server
        if !loaded {
            print("Trying localhost development server...")
            if let url = URL(string: "http://localhost:8000") {
                webView.load(URLRequest(url: url))
                loaded = true
            } else {
                print("❌ Failed to create localhost URL")
            }
        }
        
        // Approach 5: Create a simple HTML fallback
        if !loaded {
            print("Creating fallback HTML content...")
            let fallbackHTML = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>BasedlyAI</title>
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
                        margin: 0; 
                        padding: 20px; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-align: center;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .logo { font-size: 3em; font-weight: bold; margin-bottom: 20px; }
                    .message { font-size: 1.2em; margin-bottom: 30px; }
                    .status { font-size: 0.9em; opacity: 0.8; }
                </style>
            </head>
            <body>
                <div class="logo">Basedly.AI</div>
                <div class="message">Welcome to BasedlyAI!</div>
                <div class="status">Loading web content...</div>
                <script>
                    console.log('BasedlyAI fallback page loaded');
                    // Try to load the actual content
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                </script>
            </body>
            </html>
            """
            webView.loadHTMLString(fallbackHTML, baseURL: nil)
            loaded = true
        }
        
        if !loaded {
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
        injectDeviceInfo()
        
        DispatchQueue.main.async {
            self.updateWebViewLayout()
        }
    }
    
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        print("❌ Failed to load BasedlyAI web app: \(error.localizedDescription)")
        print("Error details: \(error)")
        showErrorAlert(message: "Unable to load BasedlyAI. Error: \(error.localizedDescription)")
    }
    
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        print("❌ Failed to load BasedlyAI web app (provisional): \(error.localizedDescription)")
        print("Error details: \(error)")
        showErrorAlert(message: "Unable to load BasedlyAI. Error: \(error.localizedDescription)")
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
            isLandscape: \(UIDevice.current.orientation == .landscapeLeft || UIDevice.current.orientation == .landscapeRight)
        }
        """
        
        let script = """
        window.deviceInfo = \(deviceInfo);
        window.isNativeApp = true;
        
        window.dispatchEvent(new CustomEvent('deviceInfoReady', {
            detail: window.deviceInfo
        }));
        """
        
        webView.evaluateJavaScript(script) { result, error in
            if let error = error {
                print("Error injecting device info: \(error)")
            } else {
                print("✅ Device info injected successfully")
            }
        }
    }
}

