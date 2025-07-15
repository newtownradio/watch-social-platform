//
//  ThreadSocialAIUITestsLaunchTests.swift
//  ThreadSocialAIUITests
//
//  Created by Colin Ilgen on 1/15/24.
//

import XCTest

final class ThreadSocialAIUITestsLaunchTests: XCTestCase {

    override class var runsForEachTargetApplicationUIConfiguration: Bool {
        true
    }

    override func setUpWithError() throws {
        continueAfterFailure = false
    }

    func testLaunch() throws {
        let app = XCUIApplication()
        app.launch()

        // Insert assertions here to verify that your app launches successfully.
    }
} 