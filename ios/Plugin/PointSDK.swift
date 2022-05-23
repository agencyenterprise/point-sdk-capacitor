import Foundation
import PointSDK

@objc
public class PointSDK: NSObject {
    @objc
    public func echo(_ value: String) -> String {
        print("PointSDK this is a test")
        return "PointSDK this is a test"
    }

}
