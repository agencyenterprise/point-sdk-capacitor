import Foundation
import Capacitor
import PointSDK

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(PointSDKPlugin)
public class PointSDKPlugin: CAPPlugin {
    
    @objc
    public func setup(_ call: CAPPluginCall) {
        Point.verbose = call.getBool("verbose", false)
        Point.setup(
            clientId: call.getString("client_id")!,
            clientSecret: call.getString("client_secret")!,
            queryTypes: Set(HealthQueryType.allCases),
            environment: environmentsMapping(type: call.getString("api_environment", "production"))
        )
        
        call.resolve()
    }
    
    @objc
    public func setUserToken(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await Point.setUserToken(accessToken: call.getString("user_token")!, shouldSyncData: call.getBool("should_sync_data", true))
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    public func logout(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await Point.logout()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
}
