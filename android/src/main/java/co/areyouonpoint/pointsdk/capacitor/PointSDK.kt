package co.areyouonpoint.pointsdk.capacitor

import co.areyouonpoint.pointsdk.PointClient
import co.areyouonpoint.pointsdk.core.logger.LogLevel
import co.areyouonpoint.pointsdk.domain.PointEnvironment
import co.areyouonpoint.pointsdk.domain.exceptions.PointException
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "PointSDK")
class PointSDK : Plugin() {
    private var pointClient: PointClient? = null
    private var pointSDKOura: PointSDKOura? = null
    private var pointSDKFitbit: PointSDKFitbit? = null
    private var pointSDKRepository: PointSDKRepository? = null

    /**
     * Point Client
     */
    @PluginMethod
    fun setup(call: PluginCall) {
        val verbose = call.getBoolean("verbose") ?: false

        pointClient = PointClient.getInstance(
            context = context,
            clientId = call.getString("clientId")!!,
            clientSecret = call.getString("clientSecret")!!,
            apiEnvironment = environmentsMapping(call.getString("environment")),
            logLevel = if (verbose) LogLevel.DEBUG else LogLevel.NONE
        ).also {
            pointSDKRepository = PointSDKRepository(it.repository)
        }

        call.resolve()
    }

    @PluginMethod
    fun setUserToken(call: PluginCall) {
        try {
            pointClient?.setUserToken(call.getString("userToken")!!)
            call.resolve()
        } catch (ex: PointException) {
            call.reject(ex.message)
        }
    }

    @PluginMethod
    fun logout(call: PluginCall) {
        try {
            pointClient?.logout()
            call.resolve()
        } catch (ex: PointException) {
            call.reject(ex.message)
        }
    }

    /**
     * FITBIT
     */
    @PluginMethod
    fun setupFitbitIntegration(call: PluginCall) {
        pointSDKFitbit = PointSDKFitbit(context, pointClient)
        pointSDKFitbit?.setupFitbitIntegration(call)
    }

    @PluginMethod
    fun authenticateFitbit(call: PluginCall) {
        pointSDKFitbit?.authenticateFitbit(call)
    }

    @PluginMethod
    fun revokeFitbitAuthentication(call: PluginCall) {
        pointSDKFitbit?.revokeFitbitAuthentication(call)
    }

    @PluginMethod
    fun isFitbitAuthenticated(call: PluginCall) {
        pointSDKFitbit?.isFitbitAuthenticated(call)
    }

    /**
     * OURA
     */
    @PluginMethod
    fun setupOuraIntegration(call: PluginCall) {
        pointSDKOura = PointSDKOura(context, pointClient)
        pointSDKOura?.setupOuraIntegration(call)
    }

    @PluginMethod
    fun authenticateOura(call: PluginCall) {
        pointSDKOura?.authenticateOura(call)
    }

    @PluginMethod
    fun revokeOuraAuthentication(call: PluginCall) {
        pointSDKOura?.revokeOuraAuthentication(call)
    }

    @PluginMethod
    fun isOuraAuthenticated(call: PluginCall) {
        pointSDKOura?.isOuraAuthenticated(call)
    }

    /**
     * REPOSITORY/PUBLIC API
     */
    @PluginMethod
    fun getUserData(call: PluginCall) {
        pointSDKRepository?.getUserData(call)
    }

    @PluginMethod
    fun getUserWorkouts(call: PluginCall) {
        pointSDKRepository?.getUserWorkouts(call)
    }

    @PluginMethod
    fun getUserWorkoutById(call: PluginCall) {
        pointSDKRepository?.getUserWorkoutById(call)
    }

    @PluginMethod
    fun getWorkoutRecommendations(call: PluginCall) {
        pointSDKRepository?.getWorkoutRecommendations(call)
    }

    @PluginMethod
    fun getHealthMetrics(call: PluginCall) {
        pointSDKRepository?.getHealthMetrics(call)
    }

    private fun environmentsMapping(env: String?): PointEnvironment {
        return when(env) {
            "development" -> PointEnvironment.DEVELOPMENT
            "staging" -> PointEnvironment.STAGING
            "production" -> PointEnvironment.PRODUCTION
            "preprod" -> PointEnvironment.PRE_PROD
            else -> PointEnvironment.DEVELOPMENT //DEVELOPMENT IS THE DEFAULT SAME AS iOS
        }
    }
}
