import Capacitor
import Foundation
import PointSDK

@objc
public extension PointSDKPlugin {
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

    func getUserTrends(_ call: CAPPluginCall) {
        Task {
            do {
                let trends = try await healthService.getUserTrends()
                call.resolve([
                    "trends": trends.map { trendMapping(trend: $0) }
                ])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    func getUserWorkouts(_ call: CAPPluginCall) {
        Task {
            do {
                let offset = call.getInt("offset") ?? 0
                let workouts = try await healthService.getUserWorkouts(offset: offset)
                call.resolve([
                    "workouts": workouts.map { workoutMapping(workout: $0) }
                ])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    func getUserWorkoutById(_ call: CAPPluginCall) {
        Task {
            do {
                let workoutId = call.getInt("workout_id")!
                let workout = try await healthService.getWorkout(id: workoutId)
                call.resolve(workoutMapping(workout: workout))
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
    
    func getDailyHistory(_ call: CAPPluginCall) {
        Task {
            do {
                let offset = call.getInt("offset") ?? 0
                let result = try await healthService.getDailyHistory(offset: offset)
                let dailyHistory = result.map {
                    [
                        "date": $0.date,
                        "metrics": $0.metrics.map { metricMapping(metric: $0) }
                    ]
                }
                call.resolve(["daily_history": dailyHistory])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
}
