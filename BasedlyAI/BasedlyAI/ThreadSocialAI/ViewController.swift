//
//  ViewController.swift
//  ThreadSocialAI
//
//  Created by Colin Ilgen on 1/15/24.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler {
    
    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupWebView()
        loadWebApp()
    }
    
    private func setupWebView() {
        // Configure WebView
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        
        // Add JavaScript bridge
        let contentController = WKUserContentController()
        contentController.add(self, name: "iosBridge")
        configuration.userContentController = contentController
        
        // Create WebView
        webView = WKWebView(frame: view.bounds, configuration: configuration)
        webView.navigationDelegate = self
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.scrollView.bounces = false
        webView.scrollView.showsVerticalScrollIndicator = false
        webView.scrollView.showsHorizontalScrollIndicator = false
        
        // Add to view
        view.addSubview(webView)
    }
    
    private func loadWebApp() {
        // Load the modular web app
        if let htmlPath = Bundle.main.path(forResource: "index-modular", ofType: "html", inDirectory: "ThreadSocialAI") {
            let url = URL(fileURLWithPath: htmlPath)
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else {
            // Fallback to local development server or error page
            let errorHTML = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Thread Social AI</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; text-align: center; padding: 50px; }
                    .error { color: #ff3b30; }
                </style>
            </head>
            <body>
                <h1>Thread Social AI</h1>
                <p class="error">Unable to load web app. Please check your internet connection.</p>
            </body>
            </html>
            """
            webView.loadHTMLString(errorHTML, baseURL: nil)
        }
    }
    
    // MARK: - WKNavigationDelegate
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        // Inject iOS-specific JavaScript
        let iosScript = """
        window.iosBridge = {
            showAlert: function(message) {
                window.webkit.messageHandlers.iosBridge.postMessage({
                    action: 'showAlert',
                    message: message
                });
            },
            shareContent: function(content) {
                window.webkit.messageHandlers.iosBridge.postMessage({
                    action: 'shareContent',
                    content: content
                });
            },
            openURL: function(url) {
                window.webkit.messageHandlers.iosBridge.postMessage({
                    action: 'openURL',
                    url: url
                });
            }
        };
        """
        webView.evaluateJavaScript(iosScript, completionHandler: nil)
    }
    
    // MARK: - WKScriptMessageHandler
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any],
              let action = body["action"] as? String else { return }
        
        switch action {
        case "showAlert":
            if let message = body["message"] as? String {
                DispatchQueue.main.async {
                    let alert = UIAlertController(title: "Thread Social AI", message: message, preferredStyle: .alert)
                    alert.addAction(UIAlertAction(title: "OK", style: .default))
                    self.present(alert, animated: true)
                }
            }
        case "shareContent":
            if let content = body["content"] as? String {
                DispatchQueue.main.async {
                    let activityVC = UIActivityViewController(activityItems: [content], applicationActivities: nil)
                    self.present(activityVC, animated: true)
                }
            }
        case "openURL":
            if let urlString = body["url"] as? String,
               let url = URL(string: urlString) {
                DispatchQueue.main.async {
                    UIApplication.shared.open(url)
                }
            }
        default:
            break
        }
    }
} 