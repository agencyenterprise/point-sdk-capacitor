package co.areyouonpoint.pointsdk.capacitor

import android.content.Context
import co.areyouonpoint.pointsdk.PointClient
import co.areyouonpoint.pointsdk.domain.exceptions.PointException
import co.areyouonpoint.pointsdk.domain.integrations.fitbit.FitbitIntegrationManager
import co.areyouonpoint.pointsdk.domain.integrations.fitbit.FitbitScopes
import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

@OptIn(DelicateCoroutinesApi::class)
internal class PointSDKFitbit(
    private val context: Context,
    private val pointClient: PointClient?,
) {

    private var fitbitIntegrationManager: FitbitIntegrationManager? = null

    fun setupFitbitIntegration(call: PluginCall) {
        try {
            call.getString("fitbitClientId")?.let { fitbitClientId ->
                fitbitIntegrationManager = pointClient?.setupFitbitIntegration(context, fitbitClientId)
                call.resolve()
            } ?: call.reject("setupFitbitIntegration error: Must provide fitbit client id.")

        } catch (ex: PointException) {
            call.reject(ex.message)
        }
    }

    fun authenticateFitbit(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                call.getArray("fitbitScopes")?.let { fitbitScopes ->
                    var scopes = fitbitScopes.toList<String>().mapNotNull { fitbitScopesMapping(it) }
                    if (scopes.isEmpty()) {
                        scopes = FitbitScopes.values().toList()
                    }

                    fitbitIntegrationManager?.authenticate(scopes = scopes)
                    call.resolve()
                } ?: call.reject("setupFitbitIntegration error: Must provide fitbit client id.")

            } catch (ex: PointException) {
                call.reject(ex.message)
            }
        }
    }

    fun revokeFitbitAuthentication(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                fitbitIntegrationManager?.revoke()
                call.resolve()

            } catch (ex: PointException) {
                call.reject(ex.message)
            }
        }
    }

    fun isFitbitAuthenticated(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val result = fitbitIntegrationManager?.getUserIntegrationStatus()?.active ?: false
                call.resolve(JSObject().put("result", result))
            } catch (ex: PointException) {
                call.reject(ex.message)
            }
        }
    }

    private fun fitbitScopesMapping(scope: String): FitbitScopes? {
        return when(scope) {
            "activity" -> FitbitScopes.Activity
            "heartrate" -> FitbitScopes.Heartrate
            "profile" -> FitbitScopes.Profile
            "sleep" -> FitbitScopes.Sleep
            "weight" -> FitbitScopes.Weight
            "cardio_fitness" -> FitbitScopes.CardioFitness
            else -> null
        }
    }
}
