import Foundation
import PointSDK

let queryTypeParam =  "query_type"
let wrongQueryTypeMsg: String = "Invalid query type, review your params and try again!"

extension Date {
  func toIsoString() -> String? {
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
    return formatter.string(from: self)
  }
}

extension String {
  func fromIsoStringToDate() -> Date {
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
    return formatter.date(from: self)!
  }
}

extension PointSDKPlugin {
    
    func goalsMapping(type: String) -> Goal {
        switch type {
        case "athleticPerformance":
          return .athleticPerformance
        case "weightLoss":
          return .weightLoss
        default:
          return .weightLoss
        }
      }

      func specificGoalsMapping(type: String) -> SpecificGoal {
        switch type {
        case "buildLeanMuscle":
          return .buildLeanMuscle
        case "loseWeight":
          return .loseWeight
        case "prepareForEvent":
          return .prepareForEvent
        case "accomplishMore":
          return .accomplishMore
        case "maintainHealth":
          return .maintainHealth
        default:
          return .buildLeanMuscle
        }
      }

      func environmentsMapping(_ env: String?) -> APIEnvironment {
        switch env {
        case "development":
          return .development
        case "staging":
          return .staging
        case "production":
          return .production
        default:
          return .development
        }
      }

      func workoutMapping(workout: Workout?) -> [String : Any] {
        guard let workout = workout else { return [:] }
        
        return [
          "id": workout.id,
          "calories": workout.calories,
          "distance": workout.distance,
          "duration": workout.duration,
          "start": workout.start,
          "end": workout.end,
          "activityName": workout.activityName,
          "activityId": workout.activityId as Any,
          "ratings": [
            "difficulty": workout.ratings?.difficulty,
            "energy": workout.ratings?.energy,
            "instructor": workout.ratings?.instructor,
          ]
        ]
      }

      func goalProgressMapping(goalProgress: GoalProgress) -> [String : Any] {
        [
          "overral": [
            "value": goalProgress.overral.value,
            "variance": goalProgress.overral.variance
          ],
          "endurance": [
            "value": goalProgress.endurance.value,
            "variance": goalProgress.endurance.variance
          ],
          "recovery": [
            "value": goalProgress.recovery.value,
            "variance": goalProgress.recovery.variance
          ],
          "strength": [
            "value": goalProgress.strength.value,
            "variance": goalProgress.strength.variance
          ]
        ]
      }

      func userMapping(user: User?) -> [String : Any] {
        guard let user = user else { return [:] }

        return [
          "id": user.id,
          "email": user.email as Any,
          "birthday": user.birthday as Any,
          "firstName": user.firstName as Any,
          "isSubscriber": user.isSubscriber as Any,
          "goal": user.goal?.rawValue as Any,
          "goalProgress": goalProgressMapping(goalProgress: user.goalProgress),
          "specificGoal": user.specificGoal?.rawValue as Any,
          "lastWorkout": workoutMapping(workout: user.lastWorkout)
        ]
      }
      
      func metricMapping(metric: HealthMetric?) -> [String : Any] {
        guard let metric = metric else { return [:] }

        return [
          "type": metric.type,
          "date": metric.date,
          "value": metric.value,
          "variance": metric.variance as Any,
          "workoutId": metric.workoutId as Any
        ]
      }
      
      func workoutRecommendationMapping(recommendation: WorkoutRecommendation?) -> [String : Any] {
        guard let recommendation = recommendation else { return [:] }
        
        return [
          "id": recommendation.id,
          "date": recommendation.date as Any,
          "activityId": recommendation.activityId as Any,
          "activityName": recommendation.activityName as Any,
          "workoutId": recommendation.workoutId as Any,
          "completedAt": recommendation.completedAt as Any,
          "createdAt": recommendation.createdAt as Any,
          "savedAt": recommendation.savedAt as Any
        ]
      }
      
      func userRecommendationMapping(recommendation: UserRecommendation?) -> [String : Any] {
        guard let recommendation = recommendation else { return [:] }
        
        return [
          "id": recommendation.id,
          "insightId": recommendation.insightId as Any,
          "templateId": recommendation.templateId as Any,
          "category": recommendation.category?.rawValue as Any,
          "description": recommendation.description,
          "actions": recommendation.actions.map {
            [
              "label": $0.label,
              "url": $0.url
            ]
          },
          "cooldownEndsAt": recommendation.cooldownEndsAt?.toIsoString() as Any,
          "lastSeenAt": recommendation.lastSeenAt?.toIsoString() as Any
        ]
      }
      
      func trendMapping(trend: Trend?) -> [String : Any] {
        guard let trend = trend else { return [:] }
        
        return [
          "id": trend.id,
          "type": trend.type.rawValue,
          "additionalFields": trend.additionalFields
        ]
      }
    
    func queryTypeMapping(type: String?) -> HealthQueryType? {
        guard let queryType = type else { return nil }
        
        return HealthQueryType.init(rawValue: queryType)
    }
    
    func runQuery(
        sampleType: HealthQueryType,
        startDate: Date,
        endDate: Date,
        isAscending: Bool,
        avoidDuplicates: Bool
    ) async throws -> SyncResult? {
        switch sampleType {
        case .restingHeartRate:
            return try await Point.healthKit?.sync(query: .restingHeartRate(
                startDate: startDate,
                endDate: endDate,
                isAscending: isAscending
            ))

        case .heartRate:
            return try await Point.healthKit?.sync(query: .heartRate(
                startDate: startDate,
                endDate: endDate,
                isAscending: isAscending
            ))

        case .activeEnergyBurned:
            return try await Point.healthKit?.sync(query: .activeEnergyBurned(
                startDate: startDate,
                endDate: endDate,
                isAscending: isAscending
            ))

        case .basalEnergyBurned:
            return try await Point.healthKit?.sync(query: .basalEnergyBurned(
                startDate: startDate,
                endDate: endDate,
                isAscending: isAscending
            ))

        case .workout:
            return try await Point.healthKit?.sync(query: .workout(
                startDate: startDate,
                endDate: endDate,
                isAscending: isAscending
            ))

        case .heartRateVariabilitySDNN:
            return try await Point.healthKit?.sync(query: .heartRateVariabilitySDNN(
                startDate: startDate,
                endDate: endDate,
                isAscending: isAscending
            ))

        case .vo2Max:
            return try await Point.healthKit?.sync(query: .vo2Max(
                startDate: startDate,
                endDate: endDate,
                isAscending: isAscending
            ))

        case .stepCount:
            return try await Point.healthKit?.sync(query: .stepCount(
                startDate: startDate,
                endDate: endDate
            ))

        case .mindfulSession:
            return try await Point.healthKit?.sync(query: .mindfulness(
                startDate: startDate,
                endDate: endDate,
                isAscending: isAscending
            ))

        case .sleepAnalysis:
            return try await Point.healthKit?.sync(query: .sleep(
                startDate: startDate,
                endDate: endDate,
                isAscending: isAscending
            ))

        default:
            return nil
        }
    }
}
