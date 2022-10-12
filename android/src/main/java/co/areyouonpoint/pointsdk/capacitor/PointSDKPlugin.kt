package co.areyouonpoint.pointsdk.capacitor

import co.areyouonpoint.pointsdk.PointClient
import co.areyouonpoint.pointsdk.core.logger.LogLevel
import co.areyouonpoint.pointsdk.domain.PointEnvironment
import co.areyouonpoint.pointsdk.domain.exceptions.PointException
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "PointSDK")
class PointSDKPlugin : Plugin() {
    private var pointClient: PointClient? = null

    @PluginMethod
    fun setup(call: PluginCall) {
        val verbose = call.getBoolean("verbose") ?: false

        pointClient = PointClient.getInstance(
            context = context,
            clientId = call.getString("clientId")!!,
            clientSecret = call.getString("clientSecret")!!,
            apiEnvironment = environmentsMapping(call.getString("environment")),
            logLevel = if (verbose) LogLevel.DEBUG else LogLevel.NONE
        )

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
