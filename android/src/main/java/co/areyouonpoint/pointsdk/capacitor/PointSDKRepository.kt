package co.areyouonpoint.pointsdk.capacitor

import co.areyouonpoint.pointsdk.domain.PointRepository
import com.getcapacitor.PluginCall
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

@OptIn(DelicateCoroutinesApi::class)
internal class PointSDKRepository(
    private val pointRepository: PointRepository,
) {

    fun getUserData(call: PluginCall) {
        GlobalScope.launch(Dispatchers.IO) {
            try {
                val user = pointRepository.getUser()
                call.resolve(user?.toResponse())
            } catch (ex: Exception) {
                call.reject(ex.message)
            }
        }
    }
}
