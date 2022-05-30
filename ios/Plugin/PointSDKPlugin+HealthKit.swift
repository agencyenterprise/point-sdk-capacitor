import Foundation
import Capacitor
import PointSDK

@objc
public extension PointSDKPlugin {
    
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
    func setupAllBackgroundQueries(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            await healthKit?.setupAllBackgroundQueries()
            call.resolve()
        }
    }
    
    @objc
    func setupBackgroundQueryForType(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                call.reject(wrongQueryTypeMsg)
                return
            }
            
            await healthKit?.setupBackgroundQuery(for: queryType)
            call.resolve()
        }
    }
    
    @objc
    func enableAllBackgroundDelivery(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await healthKit?.enableAllBackgroundDelivery()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func enableBackgroundDeliveryForType(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                    call.reject(wrongQueryTypeMsg)
                    return
                }
                
                let enabled = try await healthKit?.enableBackgroundDelivery(for: queryType) ?? false
                call.resolve(["enabled": enabled])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func disableAllBackgroundDelivery(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await healthKit?.disableAllBackgroundDelivery()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func disableBackgroundDeliveryForType(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                    call.reject(wrongQueryTypeMsg)
                    return
                }
                
                try await healthKit?.disableBackgroundDelivery(for: queryType)
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
                    "successSampleCount": result?.successSampleCount ?? 0,
                    "remainingSampleCount": result?.remainingSampleCount ?? 0
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
                    "successSampleCount": result?.successSampleCount ?? 0,
                    "remainingSampleCount": result?.remainingSampleCount ?? 0
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
                
                let startDate = call.getDate("start_date", Calendar.current.date(byAdding: .day, value: -1, to: Date())!) // one day ago as default
                let endDate = call.getDate("end_date", Date()) // current date as default
                let asc = call.getBool("ascending", true)
                let avoidDuplicates = call.getBool("avoid_duplicates", true)
                
                let result = try await runQuery(sampleType: queryType, startDate: startDate, endDate: endDate, isAscending: asc, avoidDuplicates: avoidDuplicates)
                call.resolve([
                    "success": result?.success ?? false,
                    "samplesCount": result?.samplesCount ?? 0
                ])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
}
