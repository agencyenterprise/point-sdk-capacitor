package co.areyouonpoint.pointsdk.capacitor

import co.areyouonpoint.pointsdk.domain.model.*
import com.getcapacitor.JSObject
import org.json.JSONObject

fun User.toResponse() =
    JSObject().apply {
        put("id", id)
        putSafe("email", email ?: JSONObject.NULL)
        putOpt("birthday", birthday ?: JSONObject.NULL)
        putOpt("firstName", firstName ?: JSONObject.NULL)
        putOpt("goal", goal?.rawValue ?: JSONObject.NULL)
        putOpt("goalProgress", goalProgress.toResponse())
        putOpt("specificGoal", specificGoal?.rawValue ?: JSONObject.NULL)
        putOpt("lastWorkout", lastWorkout?.toResponse() ?: JSONObject.NULL)
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
        putOpt("variance", variance)
    }

fun Overall.toResponse() =
    JSObject().apply {
        putSafe("value", value)
        putOpt("variance", variance)
    }

fun Strength.toResponse() =
    JSObject().apply {
        putSafe("value", value)
        putOpt("variance", variance)
    }

fun Recovery.toResponse() =
    JSObject().apply {
        putSafe("value", value)
        putOpt("variance", variance)
    }