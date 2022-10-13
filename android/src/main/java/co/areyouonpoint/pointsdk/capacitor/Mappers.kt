package co.areyouonpoint.pointsdk.capacitor

import co.areyouonpoint.pointsdk.domain.model.*
import com.getcapacitor.JSObject
import org.json.JSONObject
import java.time.ZonedDateTime
import java.util.*

fun String.fromIsoStringToDate(): Date {
    return Date.from(ZonedDateTime.parse(this).toInstant())
}

fun User.toResponse() =
    JSObject().apply {
        put("id", id)
        putSafe("email", email ?: JSONObject.NULL)
        putOpt("birthday", birthday ?: JSONObject.NULL)
        putOpt("firstName", firstName ?: JSONObject.NULL)
        putOpt("goal", goal?.rawValue ?: JSONObject.NULL)
        putOpt("goalProgress", goalProgress.toResponse())
        putOpt("specificGoal", specificGoal?.rawValue ?: JSONObject.NULL)
        putOpt("lastWorkout", lastWorkout?.toResponse() ?: JSObject())
    }


fun Workout.toResponse() =
    JSObject().apply {
        putSafe("id", id)
        putSafe("calories", calories)
        putSafe("distance", distance)
        putSafe("duration", duration)
        putSafe("start", startDate)
        putSafe("end", endDate)
        putSafe("activityName", activityName)
        putSafe("activityId", activityId ?: JSONObject.NULL)
        putSafe("ratings", ratings?.toResponse() ?: JSONObject.NULL)
    }

fun WorkoutRatings.toResponse() =
    JSObject().apply {
        putSafe("difficulty", difficulty ?: JSONObject.NULL)
        putSafe("energy", energy ?: JSONObject.NULL)
        putSafe("instructor", instructor ?: JSONObject.NULL)
    }


fun GoalProgress.toResponse() =
    JSObject().apply {
        putSafe("endurance", endurance.toResponse())
        putOpt("overall", overall.toResponse())
        putOpt("strength", strength.toResponse())
        putOpt("recovery", recovery.toResponse())
    }

fun Endurance.toResponse() =
    JSObject().apply {
        putSafe("value", value)
        putOpt("variance", variance ?: JSONObject.NULL)
    }

fun Overall.toResponse() =
    JSObject().apply {
        putSafe("value", value)
        putOpt("variance", variance ?: JSONObject.NULL)
    }

fun Strength.toResponse() =
    JSObject().apply {
        putSafe("value", value)
        putOpt("variance", variance ?: JSONObject.NULL)
    }

fun Recovery.toResponse() =
    JSObject().apply {
        putSafe("value", value)
        putOpt("variance", variance ?: JSONObject.NULL)
    }

fun WorkoutRecommendation.toResponse() =
    JSObject().apply {
        putSafe("id", id)
        putOpt("date", date ?: JSONObject.NULL)
        putOpt("activityId", activityId ?: JSONObject.NULL)
        putOpt("activityName", activityName ?: JSONObject.NULL)
        putOpt("workoutId", workoutId ?: JSONObject.NULL)
        putOpt("completedAt", completedAt ?: JSONObject.NULL)
        putOpt("createdAt", createdAt ?: JSONObject.NULL)
        putOpt("savedAt", savedAt ?: JSONObject.NULL)
    }

fun HealthMetric.toResponse() =
    JSObject().apply {
        putSafe("type", type.rawValue)
        putSafe("date", date)
        putSafe("value", value)
        putOpt("variance", variance ?: JSONObject.NULL)
        putOpt("workoutId", workoutId ?: JSONObject.NULL)

    }

fun Insight.toResponse() =
    JSObject().apply {
        putSafe("id", id)
        putSafe("type", type.rawValue)
        putSafe("additionalFields", additionalFields)
        putSafe("createdAt", createdAt)
    }