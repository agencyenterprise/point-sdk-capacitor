import Foundation
import Capacitor
import PointSDK

@objc
public extension PointSDKPlugin {
    @objc
    func authenticateFitbit(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                if let callbackScheme = call.getString("callbackURLScheme") {
                    
                    var scopes = FitbitScopes.allCases
                    if let scopesParam = call.getArray("fitbitScopes") {
                        scopes = scopesParam.compactMap { fitbitScopesMapping(type: $0 as? String) }
                    }
                    
                    try await fitbitManager?.authenticate(scopes: scopes, callbackURLScheme: callbackScheme)
                    call.resolve()
                } else {
                    call.reject("authenticateFitbit error: Must provide a callbackURLScheme.")
                }
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func revokeFitbitAuthentication(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await fitbitManager?.revoke()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func isFitbitAuthenticated(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            let result = fitbitManager?.isFitbitAuthenticated ?? false
            call.resolve([
                "result" : result
            ])
        }
    }
}
