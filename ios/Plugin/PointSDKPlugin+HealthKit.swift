import Foundation
import Capacitor
import PointSDK

@objc
public extension PointSDKPlugin {
    
    @objc
    func setupHealthkitIntegration(_ call: CAPPluginCall) {
        var queryTypes = HealthQueryType.allCases
        var infoTypes = HealthInfoType.allCases
        if let queryTypesParam = call.getArray("queryTypes") {
            queryTypes = queryTypesParam.compactMap { queryTypeMapping(type: $0 as? String) }
            infoTypes = queryTypesParam.compactMap { infoTypeMapping(type: $0 as? String) }
        }
        
        healthKit = Point.setupHealthkitIntegration(queryTypes: Set(queryTypes), userInformationTypes: Set(infoTypes))
        
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
    
    // MARK: - Listeners
    
    @objc
    func startAllListeners(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await healthKit?.startAllListeners()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func startListenerForType(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                    call.reject(wrongQueryTypeMsg)
                    return
                }
                
                try await healthKit?.startListener(for: queryType)
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func stopAllListeners(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                try await healthKit?.stopAllListeners()
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func stopListenerForType(_ call: CAPPluginCall) {
        Task {
            guard !Task.isCancelled else { return }
            
            do {
                guard let queryType = queryTypeMapping(type: call.getString(queryTypeParam)) else {
                    call.reject(wrongQueryTypeMsg)
                    return
                }
                
                try await healthKit?.stopListener(for: queryType)
                call.resolve()
            } catch {
                call.reject(error.localizedDescription)
            }
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
                    "queryCount": result?.queryCount ?? 0,
                    "querySamplesCount": result?.querySamplesCount ?? 0,
                    "uploadedSamplesCount": result?.uploadedSamplesCount ?? 0
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
                let filterDuplicates = call.getBool("filterDuplicates", true)
                
                let result = try await runQuery(sampleType: queryType, startDate: startDate, endDate: endDate, filterDuplicates: filterDuplicates)
                call.resolve([
                    "queryCount": result?.queryCount ?? 0,
                    "querySamplesCount": result?.querySamplesCount ?? 0,
                    "uploadedSamplesCount": result?.uploadedSamplesCount ?? 0
                ])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
}
