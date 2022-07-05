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
    var fitbitManager: FitbitIntegrationManager?
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
    public func setupHealthkitIntegration(_ call: CAPPluginCall) {
        var queryTypes = HealthQueryType.allCases
        if let queryTypesParam = call.getArray("queryTypes") {
            queryTypes = queryTypesParam.compactMap { queryTypeMapping(type: $0 as? String) }
        }
        healthKit = Point.setupHealthkitIntegration(queryTypes: Set(queryTypes))
        
        call.resolve()
    }
    
    @objc
    public func setupFitbitIntegration(_ call: CAPPluginCall) {
        if let clientId = call.getString("fitbitClientId") {
            fitbitManager = Point.setupFitbitIntegration(fitbitClientId: clientId)
            call.resolve()
        } else {
            call.reject("setupFitbitIntegration error: Must provide fitbit client id.")
        }
    }
    
    @objc
    public func setUserToken(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await Point.setUserToken(
                    accessToken: call.getString("userToken")!,
                    shouldSyncData: call.getBool("shouldSyncData", true)
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
