import Capacitor
import Foundation
import PointSDK

@objc
public extension PointSDKPlugin {
    
    @objc
    func getUserData(_ call: CAPPluginCall) {
        Task {
            do {
                let user = try await healthService.getUserData()
                call.resolve(userMapping(user: user))
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc
    func getUserTrends(_ call: CAPPluginCall) {
        Task {
            do {
                let trends = try await healthService.getUserTrends()
                call.resolve(["trends": trends.map { trendMapping(trend: $0) }])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc
    func getUserWorkouts(_ call: CAPPluginCall) {
        Task {
            do {
                let offset = call.getInt("offset") ?? 0
                let workouts = try await healthService.getUserWorkouts(offset: offset)
                call.resolve([ "workouts": workouts.map { workoutMapping(workout: $0) }])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
}
