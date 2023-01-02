#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(PointSDKPlugin, "PointSDK",
           CAP_PLUGIN_METHOD(setup, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setupHealthkitIntegration, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(requestAuthorizationsIfPossible, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setUserToken, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setAccessToken, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setRefreshToken, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(logout, CAPPluginReturnNone);
           
           //MARK: - Fitbit
           CAP_PLUGIN_METHOD(authenticateFitbit, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setupFitbitIntegration, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(isFitbitAuthenticated, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(revokeFitbitAuthentication, CAPPluginReturnNone);

           //MARK: - Oura
           CAP_PLUGIN_METHOD(authenticateOura, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setupOuraIntegration, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(isOuraAuthenticated, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(revokeOuraAuthentication, CAPPluginReturnNone);
           
           // MARK: - Listeners
           CAP_PLUGIN_METHOD(startAllListeners, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(startListenerForType, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(stopAllListeners, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(stopListenerForType, CAPPluginReturnNone);
           
           // MARK: - Sync
           CAP_PLUGIN_METHOD(syncAllHistoricalData, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(syncHistoricalDataForType, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(sync, CAPPluginReturnPromise);
           
           // MARK: - API
           CAP_PLUGIN_METHOD(getUserData, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getUserWorkouts, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getUserWorkoutById, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getWorkoutRecommendations, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getDailyHistory, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getHealthMetrics, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setUserGoal, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setUserSpecificGoal, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(saveWorkoutRecommendation, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(rateWorkout, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getInsights, CAPPluginReturnPromise);
)
