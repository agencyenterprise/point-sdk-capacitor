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
                call.resolve(["trends": trends.map { trendMapping(trend: $0) }])
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
                call.resolve(["workouts": workouts.map { workoutMapping(workout: $0) }])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    func getUserWorkoutById(_ call: CAPPluginCall) {
        Task {
            do {
                let workoutId = call.getInt("workoutId")!
                let workout = try await healthService.getWorkout(id: workoutId)
                call.resolve(workoutMapping(workout: workout))
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    func getWorkoutRecommendations(_ call: CAPPluginCall) {
        Task {
            do {
                let finalDate = call.getString("date")!.fromIsoStringToDate()
                let recommendations = try await healthService.getWorkoutRecommendations(date: finalDate)

                call.resolve([
                    "recommendations": recommendations.map { workoutRecommendationMapping(recommendation: $0) }
                ])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    func getUserRecommendations(_ call: CAPPluginCall) {
        Task {
            do {
                let recommendations = try await healthService.getUserRecommendations()

                call.resolve(["recommendations": recommendations.map { userRecommendationMapping(recommendation: $0) }])
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
                call.resolve(["dailyHistory": dailyHistory])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    func getHealthMetrics(_ call: CAPPluginCall) {
        Task {
            do {
                let date = call.getString("date")
                let workoutId = call.getInt("workoutId")
                let filter = call.getArray("filter") as? [String]

                var healthMetrics = HealthMetric.HealthMetricType.allCases

                if let filter = filter {
                    healthMetrics = filter.compactMap { HealthMetric.HealthMetricType(rawValue: $0) }
                }

                let data = try await healthService.getHealthMetrics(
                    filter: Set(healthMetrics),
                    workoutId: workoutId,
                    date: date?.fromIsoStringToDate()
                )

                call.resolve(["healthMetrics": data.map { metricMapping(metric: $0) }])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    func setUserGoal(_ call: CAPPluginCall) {
        Task {
            do {
                let mappedGoal = goalsMapping(type: call.getString("goal")!)
                let result = try await healthService.syncUserGoal(goal: mappedGoal)
                call.resolve(["result": result])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    func setUserSpecificGoal(_ call: CAPPluginCall) {
        Task {
            do {
                let mappedGoal = specificGoalsMapping(type: call.getString("specificGoal")!)
                let result = try await healthService.syncUserSpecificGoal(specificGoal: mappedGoal)
                call.resolve(["result": result])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    func rateWorkout(_ call: CAPPluginCall) {
        Task {
            do {
                let workout = try await healthService.getWorkout(id: call.getInt("id")!)
                let ratings = WorkoutRatings(difficulty: call.getInt("difficulty"), energy: call.getInt("energy"), instructor: call.getInt("instructor"))
                let newWorkout = try await healthService.rate(workout: workout, ratings: ratings)
                call.resolve(workoutMapping(workout: newWorkout))
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    func saveWorkoutRecommendation(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await healthService.saveWorkoutRecommendation(id: call.getInt("id")!)
                call.resolve(["result": result])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    func recommendationSeen(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await healthService.recommendationSeen(id: call.getInt("id")!)
                call.resolve(["result": result])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
}
