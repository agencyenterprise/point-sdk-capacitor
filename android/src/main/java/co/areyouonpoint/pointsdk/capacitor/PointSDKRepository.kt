package co.areyouonpoint.pointsdk.capacitor

import co.areyouonpoint.pointsdk.domain.PointRepository
import co.areyouonpoint.pointsdk.domain.model.Workout
import co.areyouonpoint.pointsdk.domain.model.WorkoutRatings
import co.areyouonpoint.pointsdk.domain.model.GoalAnswers
import co.areyouonpoint.pointsdk.domain.model.HealthMetricType
import co.areyouonpoint.pointsdk.domain.model.InsightType
import co.areyouonpoint.pointsdk.domain.model.SpecificGoalAnswers
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

@OptIn(DelicateCoroutinesApi::class)
internal class PointSDKRepository(
    private val pointRepository: PointRepository,
) {

    fun getUserData(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val user = pointRepository.getUser()
                call.resolve(user?.toResponse())
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }

    fun getUserWorkouts(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val offset = call.getInt("offset") ?: 0
                val workouts = pointRepository.getUserWorkouts(offset)
                val response = JSObject().apply {
                    put("workouts", JSArray().apply {
                        workouts.map {
                            put(it.toResponse())
                        }
                    })
                }
                call.resolve(response)
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }

    fun getUserWorkoutById(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val workoutId = call.getInt("workoutId")!!
                val workout = pointRepository.getWorkout(workoutId)
                call.resolve(workout.toResponse())
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }

    fun getWorkoutRecommendations(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val date = call.getString("date")!!.fromIsoStringToDate()
                val workoutRecommendations = pointRepository.getWorkoutRecommendations(date)
                val response = JSObject().apply {
                    put("recommendations", JSArray().apply {
                        workoutRecommendations.map { put(it.toResponse()) }
                    })
                }
                call.resolve(response)
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }

    fun getHealthMetrics(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val date = call.getString("date")?.fromIsoStringToDate()
                val workoutId = call.getInt("workoutId")
                val filters = call.getArray("filter").toList<String>()

                var healthMetrics = HealthMetricType.values().toList()
                if (filters.isNotEmpty()) {
                    healthMetrics = filters.mapNotNull { HealthMetricType.safeValueOf(it) }
                }

                val metrics = pointRepository.getHealthMetrics(healthMetrics, workoutId, date)
                val response = JSObject().apply {
                    put("healthMetrics", JSArray().apply {
                        metrics.map { put(it.toResponse()) }
                    })
                }
                call.resolve(response)
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }

    fun getDailyHistory(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val offset = call.getInt("offset") ?: 0
                val dailyHistory = pointRepository.getDailyHistory(offset)
                val response = JSObject().apply {
                    putSafe("dailyHistory", JSArray().apply {
                        dailyHistory.map {
                            put(it.toResponse())
                        }
                    })
                }
                call.resolve(response)
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }

    fun setUserGoal(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val goal = call.getString("goal")!!
                val result = pointRepository.setUserGoal(GoalAnswers.safeValueOf(goal)!!)
                call.resolve(JSObject().apply {
                    put("result", result)
                })
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }

    fun setUserSpecificGoal(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val goal = call.getString("specificGoal")!!
                val result = pointRepository.setUserSpecificGoal(SpecificGoalAnswers.safeValueOf(goal)!!)
                call.resolve(JSObject().apply {
                    put("result", result)
                })
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }

    fun getInsights(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val startDate = call.getString("startDate")?.fromIsoStringToDate()
                val endDate = call.getString("endDate")?.fromIsoStringToDate()
                val offset = call.getInt("offset")

                val typesString = call.getArray("types").toList<String>()

                val types = typesString.mapNotNull { InsightType.safeValueOf(it) }
                if (types.isEmpty()) {
                    call.reject("No Insight Type provided")
                }

                val insights = pointRepository.getInsights(types, startDate, endDate, offset)
                val response = JSObject().apply {
                    put("insights", JSArray().apply {
                        insights.map { put(it.toResponse()) }
                    })
                }
                call.resolve(response)
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }

    fun saveWorkoutRecommendation(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val workoutRecommendationId = call.getInt("id")!!
                val result = pointRepository.saveWorkoutRecommendation(workoutRecommendationId)
                call.resolve(JSObject().apply {
                    put("result", result)
                })
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }

    fun rateWorkout(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val workout = pointRepository.getWorkout(call.getInt("id")!!)
                val ratings = WorkoutRatings(
                    difficulty = call.getObject("ratings").getInt("difficulty"),
                    energy = call.getObject("ratings").getInt("energy"),
                    instructor = call.getObject("ratings").getInt("instructor")
                )
                val newWorkout = pointRepository.rateWorkout(workout, ratings)
                call.resolve(newWorkout.toResponse())
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }
}
