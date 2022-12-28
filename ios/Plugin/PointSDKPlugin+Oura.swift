import Foundation
import Capacitor
import PointSDK

@objc
public extension PointSDKPlugin {
    
    @objc
    func setupOuraIntegration(_ call: CAPPluginCall) {
        if let clientId = call.getString("ouraClientId") {
            Point.setupOuraIntegration(ouraClientId: clientId)
            call.resolve()
        } else {
            call.reject("setupOuraIntegration error: Must provide oura client id.")
        }
    }
    
    @objc
    func authenticateOura(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                if let callbackScheme = call.getString("callbackURLScheme") {
                    
                    var scopes = OuraScopes.allCases
                    if let scopesParam = call.getArray("ouraScopes") {
                        scopes = scopesParam.compactMap { ouraScopesMapping(type: $0 as? String) }
                    }
                    
                    try await Point.ouraManager?.authenticate(scopes: scopes, callbackURLScheme: callbackScheme)
                    call.resolve()
                } else {
                    call.reject("authenticateOura error: Must provide a callbackURLScheme.")
                }
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func revokeOuraAuthentication(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await Point.ouraManager?.revoke()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func isOuraAuthenticated(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                let result = try await Point.ouraManager?.getUserAuthenticationStatus()?.active ?? false
                call.resolve([
                    "result" : result
                ])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
}
