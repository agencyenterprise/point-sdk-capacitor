import Foundation
import Capacitor
import PointSDK

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(PointSDKPlugin)
public class PointSDKPlugin: CAPPlugin {
    
    var healthKit: HealthKitManager?
    var healthService: HealthDataService { Point.healthDataService }
    
    @objc
    public func setup(_ call: CAPPluginCall) {
        Point.verbose = call.getBool("verbose", false)
        
        Point.setup(
            clientId: call.getString("clientId")!,
            clientSecret: call.getString("clientSecret")!,
            environment: environmentsMapping(call.getString("environment"))
        )
        
        call.resolve()
    }
    
    @objc
    public func setUserToken(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await Point.setAccessToken(
                    accessToken: call.getString("userToken")!,
                    shouldSyncHistoricalData: call.getBool("shouldSyncData", true)
                )
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc
    public func setAccessToken(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await Point.setAccessToken(
                    accessToken: call.getString("accessToken")!,
                    shouldSyncHistoricalData: call.getBool("shouldSyncData", true)
                )
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc
    public func setRefreshToken(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                let userId = call.getString("userId")!.replacingOccurrences(of: "|", with: "%7C", options: .literal, range: nil)
                try await Point.setRefreshToken(
                    refreshToken: call.getString("refreshToken")!,
                    userId: userId,
                    shouldSyncHistoricalData: call.getBool("shouldSyncData", true)
                )
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
