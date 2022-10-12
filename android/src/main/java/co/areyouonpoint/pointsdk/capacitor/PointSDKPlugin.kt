package co.areyouonpoint.pointsdk.capacitor

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "PointSDK")
class PointSDKPlugin : Plugin() {
    private val implementation = PointSDK()

    @PluginMethod
    fun setUserToken(call: PluginCall) {
        val value = call.getString("userToken") ?: "default value"
        val ret = JSObject()
        ret.put("value", implementation.setUserToken(value))
        call.resolve(ret)
    }
}
