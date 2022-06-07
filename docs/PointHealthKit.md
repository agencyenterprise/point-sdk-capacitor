# Point Health Kit

Use the Point Health Kit to collect and upload health samples to the Point Database.

## Overview

Point Health Kit abstracts the main functionalities from Apple's Health kit in order to collect and upload health samples in an optimized and easy-to-implement way.

All methods are optimized for performance and low battery draining, the SDK has several internal optimizations including a small sqlite database to control and avoid uploading duplicated samples, reducing the network requests and data usage.

> Important: All health kit methods require previous user authorization on the data types. Check the **Permissions** session.

## Permissions

Request authorization for all types defined on SDK setup, it is recommended to do it before login or other SDK methods.

```typescript
async requestPermissions() {
    await PointSDK.requestAuthorizationsIfPossible();
  }
```

## Background Listeners

Background listeners run on top of HealthKit's background delivery. When a background listener is set, it wakes up your app whenever a process adds new samples of the specified type, and then syncs those to the Point database.

They are split into two parts: setup and enable.

### Setup

First, you need to setup the background queries you wish to run. This must be done as soon as possible, such as when the app finishes launching.

> This can be done (and we encourage you to do so) before asking for user authorization for the given type. If the user denies authorization, the query will simply have no effect.

You can set up background queries for all types you have set up the SDK with.

```typescript
async setupBackgroundQueries() {
    await PointSDK.setupAllBackgroundQueries();
}
```

You can also setup a background query for just a specific type.

```typescript
async setupStepCountBackgroundQuery() {
    await PointSDK.setupBackgroundQueryForType({ type: QueryType.StepCount });
}
```

### Enable

After asking for user permission for the desired sample types, you must enable the background listeners you have set up.

You can enable the background listeners for all types you have set up the SDK with.

```typescript
async enableBackgroundDelivery() {
    await PointSDK.enableAllBackgroundDelivery();
}
```

You can also enable a background listener for just a specific type.

```typescript
async enableStepCountBackgroundDelivery() {
    await PointSDK.enableBackgroundDeliveryForType({ type: QueryType.StepCount });
}
```

> Important: If you plan on supporting background listeners, set up all your types as soon as possible in application launch, for more information see: [Enable background delivery official docs](https://developer.apple.com/documentation/healthkit/hkhealthstore/1614175-enablebackgrounddelivery)

> Important: For iOS 15 you must enable the HealthKit Background Delivery by adding the com.apple.developer.healthkit.background-delivery entitlement to your app.

### Stop

Stopping a background listener will make any changes made on Apple's Health unnoticeable while the app is not on foreground.

You can stop background delivery for specific type.

```typescript
async disableStepCountBackgroundDelivery() {
    await PointSDK.disableBackgroundDeliveryForType({ type: QueryType.StepCount });
}
```

Or you can stop all background listeners.

```typescript
async disableAllBackgroundDelivery() {
    await PointSDK.disableAllBackgroundDelivery()
}
```

**Important:** Avoid stopping background delivery in the application lifecycle, we recommend using it only on user logout.

## Foreground Listeners

A foreground listener runs a query that monitors Apple's Health while your app is on foreground. They can be used to automatically get and upload new data from Apple's Health to the Point database as soon as they are available.

You can start all listeners by calling `enableAllForegroundListeners()`. This will start a foreground listeners for each one of the types you have requested to use on the SDK set up.
To stop all listeners you can call `stopAllForegroundListeners`.

To start a specific listener, you can call `stopForegroundListenerForType`.
To stop a specific listener, you can call `stopForegroundListenerForType`.

```typescript
async handleForegroundListeners() {
    App.addListener("appStateChange", ({ isActive }) => {
      if (isActive) {
        await PointSDK.enableAllForegroundListeners();
        //await PointSDK.enableForegroundListenerForType({ type: QueryType.StepCount })
      } else {
        await PointSDK.stopAllForegroundListeners();
        //await PointSDK.stopForegroundListenerForType({ type: QueryType.StepCount })
      }
    });
}
```

> You can import App Listeners by adding `import { App } from "@capacitor/app";` to your file.
> The starting date of the listener query is the date and time you create the listener. It won't listen for past data.

## Historical Data

**Helper functions to get the user past data, optimized to handle large amounts of data, using multiple Tasks and uploading in batches.**

Fetches and uploads the user past data for all types defined in the SDK setup. This is executed automatically when you set the user token for the first time in a session, so you don't need to call this function manually unless you turned automatic syncing off.

```typescript
async syncAllHistoricalData() {
    await PointSDK.syncAllHistoricalData();
}
```

You can also run a manual sync for specific type, but we encourage not to do it and let the automated process handle that.

```typescript
async syncHistoricalDataForType() {
    await PointSDK.syncHistoricalDataForType({ type: QueryType.StepCount });
}
```

> All historical data methods will query samples from an interval before the oldest sample date of the given type. The interval can be from 1 to 6 months, with 3 as default. If the oldest sample is older than one year, no query will be done. The starting date of the query is limited to one year before the current date.

> Automatic "historical data syncing" is enabled by default. To turn it off, just set `shouldSyncData` parameter as false on the `setAccessToken` method. We strongly recommend to keep it enabled to acquire more accurate and personalized user data.

## Latest Data

**Helper functions to fill the gap from the latest sync until the current date.**

Fetches and uploads the user latest data for a specific type. This is executed automatically when you setup a foreground listener for this type, so you don't need to call this function manually unless you turned automatic syncing off.

```typescript
async syncLatestDataForType(){
    await PointSDK.syncLatestDataForType({ type: QueryType.StepCount });
}
```

You can additionally retrieve the latest samples of all `HealthQueryType` you have requested permission.

```typescript
async syncAllLatestData() {
    await PointSDK.syncAllLatestData()
}
```

All latest data queries will query samples from the latest sample date up until now. If the latest sample date is older than six months, then the query will be made from six months up until now.

> All latest data functions are optimized to handle large amounts of data, using multiple Tasks and uploading data in batches.

## Manual Sync

Runs a custom query and sync the result with Point database.

```typescript
async syncHeartRate() {
    await PointSDK.sync({
        startDate?: string;
        endDate?: string;
        ascending?: boolean;
        avoidDuplicates?: boolean;
    })
}
```

> Tip: You can manually run any available query using a custom date range and other filters.
