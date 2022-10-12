package co.areyouonpoint.pointsdk

import android.util.Log

class PointSDK {
    fun echo(value: String): String {
        Log.i("Echo", value)
        return value
    }
}
