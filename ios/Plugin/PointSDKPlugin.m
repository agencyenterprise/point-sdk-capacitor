#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(PointSDKPlugin, "PointSDK",
           CAP_PLUGIN_METHOD(setup, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(requestAuthorizationsIfPossible, CAPPluginReturnNone);
           
           // MARK: - Background Listeners
           CAP_PLUGIN_METHOD(setupAllBackgroundQueries, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(enableAllBackgroundDelivery, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(enableBackgroundDeliveryForType, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(disableAllBackgroundDelivery, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(disableBackgroundDeliveryForType, CAPPluginReturnNone);
           
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
)
