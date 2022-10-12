package co.areyouonpoint.pointsdk

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "PointSDK")
class PointSDKPlugin : Plugin() {
    private val implementation = PointSDK()

    @PluginMethod
    fun echo(call: PluginCall) {
        val value = call.getString("value") ?: "default value"
        val ret = JSObject()
        ret.put("value", implementation.echo(value))
        call.resolve(ret)
    }
}
