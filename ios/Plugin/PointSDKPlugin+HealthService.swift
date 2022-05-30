import Capacitor
import Foundation
import PointSDK

@objc
public extension PointSDKPlugin {
    func getUserData(_ call: CAPPluginCall) {
        Task {
            do {
                let user = try await healthService.getUserData()
                call.resolve(userMapping(user: user))
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
}
