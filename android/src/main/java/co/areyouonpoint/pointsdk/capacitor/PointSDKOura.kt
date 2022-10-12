package co.areyouonpoint.pointsdk.capacitor

import android.content.Context
import co.areyouonpoint.pointsdk.PointClient
import co.areyouonpoint.pointsdk.domain.exceptions.PointException
import co.areyouonpoint.pointsdk.domain.integrations.fitbit.FitbitIntegrationManager
import co.areyouonpoint.pointsdk.domain.integrations.fitbit.FitbitScopes
import co.areyouonpoint.pointsdk.domain.integrations.oura.OuraIntegrationManager
import co.areyouonpoint.pointsdk.domain.integrations.oura.OuraScopes
import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

@OptIn(DelicateCoroutinesApi::class)
internal class PointSDKOura(
    private val context: Context,
    private val pointClient: PointClient?,
) {

    private var ouraIntegrationManager: OuraIntegrationManager? = null

    fun setupOuraIntegration(call: PluginCall) {
        try {
            call.getString("ouraClientId")?.let { ouraClientId ->
                ouraIntegrationManager = pointClient?.setupOuraIntegration(context, ouraClientId)
                call.resolve()
            } ?: call.reject("setupFitbitIntegration error: Must provide fitbit client id.")

        } catch (ex: PointException) {
            call.reject(ex.message)
        }
    }

    fun authenticateOura(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                call.getArray("ouraScopes")?.let { ouraScopes ->
                    var scopes = ouraScopes.toList<String>().mapNotNull { ouraScopesMapping(it) }
                    if (scopes.isEmpty()) {
                        scopes = OuraScopes.values().toList()
                    }

                    ouraIntegrationManager?.authenticate(scopes = scopes)
                    call.resolve()
                } ?: call.reject("setupFitbitIntegration error: Must provide fitbit client id.")

            } catch (ex: PointException) {
                call.reject(ex.message)
            }
        }
    }

    fun revokeOuraAuthentication(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                ouraIntegrationManager?.revoke()
                call.resolve()

            } catch (ex: PointException) {
                call.reject(ex.message)
            }
        }
    }

    fun isOuraAuthenticated(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val result = ouraIntegrationManager?.getUserIntegrationStatus()?.active ?: false
                call.resolve(JSObject().put("result", result))
            } catch (ex: PointException) {
                call.reject(ex.message)
            }
        }
    }

    private fun ouraScopesMapping(scope: String): OuraScopes? {
        return when(scope) {
            "personal" -> OuraScopes.Personal
            "daily" -> OuraScopes.Daily
            "heartrate" -> OuraScopes.Heartrate
            "workout" -> OuraScopes.Workout
            "session" -> OuraScopes.Session
            else -> null
        }
    }
}
