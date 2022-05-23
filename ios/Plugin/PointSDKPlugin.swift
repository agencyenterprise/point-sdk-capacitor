import Foundation
import Capacitor
import PointSDK

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(PointSDKPlugin)
public class PointSDKPlugin: CAPPlugin {
    private let implementation = PointSDK()

    @objc
    func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
    
    @objc
    public func setup(_ call: CAPPluginCall) {
        Point.setup(clientId: call.getString("client_id")!, clientSecret: call.getString("client_secret")!, queryTypes: Set(HealthQueryType.allCases))
    }
    
    @objc
    public func requestAuthorizationsIfPossible(_ call: CAPPluginCall) {
        Task {
            do {
                try await Point.healthKit?.requestAuthorizationsIfPossible()
                call.resolve()
            } catch {
                print(error)
                call.reject(error.localizedDescription)
            }
        }
    }
}
