package co.areyouonpoint.pointsdk.capacitor

import android.util.Log

class PointSDK {
    fun setUserToken(value: String): String {
        Log.i("User Token", value)
        return value
    }
}
