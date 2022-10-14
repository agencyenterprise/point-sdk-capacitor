package co.areyouonpoint.pointsdk.capacitor

import co.areyouonpoint.pointsdk.domain.PointRepository
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
}
