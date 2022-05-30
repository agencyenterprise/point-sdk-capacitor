import Foundation
import Capacitor
import PointSDK

@objc
public extension PointSDKPlugin {
    
    @objc
      func getUserData(_ call: CAPPluginCall) -> Void {
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
