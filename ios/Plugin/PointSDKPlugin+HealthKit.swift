import Foundation
import Capacitor
import PointSDK

@objc
public extension PointSDKPlugin {
    
    @objc
    func setupHealthkitIntegration(_ call: CAPPluginCall) {
        var queryTypes = HealthQueryType.allCases
        if let queryTypesParam = call.getArray("queryTypes") {
            queryTypes = queryTypesParam.compactMap { queryTypeMapping(type: $0 as? String) }
        }
        healthKit = Point.setupHealthkitIntegration(queryTypes: Set(queryTypes))
        
        call.resolve()
    }
    
    // MARK: - User Permissions
    
    @objc
    func requestAuthorizationsIfPossible(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await healthKit?.requestAuthorizationsIfPossible()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    // MARK: - Background Listeners
    
    @objc
    func startAllBackgroundListeners(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await healthKit?.startAllBackgroundListeners()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func startBackgroundListenerForType(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                    call.reject(wrongQueryTypeMsg)
                    return
                }
                
                try await healthKit?.startBackgroundListeners(for: queryType)
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func disableAllBackgroundListeners(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await healthKit?.disableAllBackgroundListeners()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func disableBackgroundListenersForType(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                    call.reject(wrongQueryTypeMsg)
                    return
                }
                
                try await healthKit?.disableBackgroundListeners(for: queryType)
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    // MARK: - Foreground Listeners
    
    @objc
    func enableAllForegroundListeners(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await healthKit?.enableAllForegroundListeners()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func enableForegroundListenerForType(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                    call.reject(wrongQueryTypeMsg)
                    return
                }
                
                try await healthKit?.listen(type: queryType)
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func stopAllForegroundListeners(_ call: CAPPluginCall) {
        healthKit?.stopAllForegroundListeners()
        call.resolve()
    }
    
    @objc
    func stopForegroundListenerForType(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                call.reject(wrongQueryTypeMsg)
                return
            }
            
            healthKit?.stopListener(type: queryType)
            call.resolve()
        }
    }
    
    // MARK: - Upload data
    
    @objc
    func syncAllHistoricalData(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await healthKit?.syncAllHistoricalData()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func syncHistoricalDataForType(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                    call.reject(wrongQueryTypeMsg)
                    return
                }
                
                let result = try await healthKit?.syncHistoricalData(sampleType: queryType)
                call.resolve([
                    "uploadedSamplesCount": result?.uploadedSamplesCount ?? 0,
                    "remainingSampleCount": result?.remainingSamplesCount ?? 0
                ])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func syncAllLatestData(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await healthKit?.syncAllLatestData()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func syncLatestDataForType(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                    call.reject(wrongQueryTypeMsg)
                    return
                }
                
                let result = try await healthKit?.syncLatestData(sampleType: queryType)
                call.resolve([
                    "successSampleCount": result?.uploadedSamplesCount ?? 0,
                    "remainingSampleCount": result?.remainingSamplesCount ?? 0
                ])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func sync(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                    call.reject(wrongQueryTypeMsg)
                    return
                }
                
                let startDate = call.getDate("startDate", Calendar.current.date(byAdding: .day, value: -1, to: Date())!) // one day ago as default
                let endDate = call.getDate("endDate", Date()) // current date as default
                let asc = call.getBool("ascending", true)
                let avoidDuplicates = call.getBool("avoidDuplicates", true)
                
                let result = try await runQuery(sampleType: queryType, startDate: startDate, endDate: endDate, isAscending: asc, avoidDuplicates: avoidDuplicates)
                call.resolve([
                    "success": result?.success ?? false,
                    "uploadedSamplesCount": result?.uploadedSamplesCount ?? 0,
                    "duplicatedSamplesCount": result?.duplicatedSamplesCount ?? 0
                ])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
}
