#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(PointSDKPlugin, "PointSDK",
           CAP_PLUGIN_METHOD(setup, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setupHealthkitIntegration, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(requestAuthorizationsIfPossible, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setUserToken, CAPPluginReturnNone);
           
           //MARK: - Fitbit
           CAP_PLUGIN_METHOD(authenticateFitbit, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setupFitbitIntegration, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(isFitbitAuthenticated, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(revokeFitbitAuthentication, CAPPluginReturnNone);
           
           // MARK: - Background Listeners
           CAP_PLUGIN_METHOD(startAllBackgroundListeners, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(startBackgroundListenerForType, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(disableAllBackgroundListeners, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(disableBackgroundListenersForType, CAPPluginReturnNone);
           
           // MARK: - Foreground Listeners
           CAP_PLUGIN_METHOD(enableAllForegroundListeners, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(enableForegroundListenerForType, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(stopAllForegroundListeners, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(stopForegroundListenerForType, CAPPluginReturnNone);
           
           // MARK: - Sync
           CAP_PLUGIN_METHOD(syncAllHistoricalData, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(syncHistoricalDataForType, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(syncAllLatestData, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(syncLatestDataForType, CAPPluginReturnPromise);
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
