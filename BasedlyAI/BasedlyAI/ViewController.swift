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
    
    private func setupWebView() {
        // Configure WebView
        let webConfiguration = WKWebViewConfiguration()
        webConfiguration.allowsInlineMediaPlayback = true
        webConfiguration.mediaTypesRequiringUserActionForPlayback = []
        
        // Create WebView
        webView = WKWebView(frame: view.bounds, configuration: webConfiguration)
        webView.navigationDelegate = self
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        
        // Add to view
        view.addSubview(webView)
        
        // Set background color
        webView.backgroundColor = UIColor.systemBackground
        view.backgroundColor = UIColor.systemBackground
    }
    
    private func loadBasedlyAI() {
        // Load the local web app
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "ThreadSocialAI") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else {
            // Fallback to localhost if running in development
            if let url = URL(string: "http://localhost:8000") {
                webView.load(URLRequest(url: url))
            }
        }
    }
    
    // MARK: - WKNavigationDelegate
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        print("BasedlyAI web app loaded successfully")
    }
    
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        print("Failed to load BasedlyAI web app: \(error.localizedDescription)")
        
        // Show error message
        let alert = UIAlertController(title: "Connection Error", 
                                    message: "Unable to load BasedlyAI. Please check your internet connection.", 
                                    preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Retry", style: .default) { _ in
            self.loadBasedlyAI()
        })
        alert.addAction(UIAlertAction(title: "OK", style: .cancel))
        present(alert, animated: true)
    }
}

