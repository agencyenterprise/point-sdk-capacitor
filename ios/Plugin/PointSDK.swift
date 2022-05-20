import Foundation

@objc public class PointSDK: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
