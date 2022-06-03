# Point SDK Capacitor

Access comprehensive health and fitness user data collected from across multiple wearable devices.

## Overview

Point SDK provides an easy, “plug-and-play” way for you to get access to the full-range of user health metrics powered by Point.

With Point SDK, you can:

- Collect user health and fitness data through Apple HealthKit and have it processed by Point.
- Decide the granularity of health and fitness data you would like to use from the wearable devices, depending on your app needs.
- Retrieve digested health metrics in a normalized, consistent data format across all devices

Point SDK provides a high-level interface for you to setup some listeners on your app, which will be watching for new wearables data coming from Apple HealthKit and proceed to process this data asynchronously.

Point is continually deriving new health metrics, health score updates, personalized health insights, and workout recommendations based on the wearables data, and you can retrieve those through our SDK at any time to deliver a custom experience to your users.

## Getting your credentials

Once you've completed your onboarding process with us, you'll receive an api key and your first clientId and clientSecret to start using our SDK! For more information about out onboarding process, please contact [tech@areyouonpoint.co](mailto:tech@areyouonpoint.co)

## Registering and authenticating your users

See [Authenticating Users](docs/AuthenticatingUsers.md) to learn how to link your user accounts with Point Database.

## Adding to your project

See [Getting Started](docs/GettingStarted.md) to learn how to configure you project and start using the SDK.

## API

<docgen-index>

- [`setup(...)`](#setup)
- [`requestAuthorizationsIfPossible()`](#requestauthorizationsifpossible)
- [`setUserToken(...)`](#setusertoken)
- [`setupAllBackgroundQueries()`](#setupallbackgroundqueries)
- [`setupBackgroundQueryForType(...)`](#setupbackgroundqueryfortype)
- [`enableAllBackgroundDelivery()`](#enableallbackgrounddelivery)
- [`disableAllBackgroundDelivery()`](#disableallbackgrounddelivery)
- [`enableBackgroundDeliveryForType(...)`](#enablebackgrounddeliveryfortype)
- [`disableBackgroundDeliveryForType(...)`](#disablebackgrounddeliveryfortype)
- [`enableAllForegroundListeners()`](#enableallforegroundlisteners)
- [`enableForegroundListenerForType(...)`](#enableforegroundlistenerfortype)
- [`stopAllForegroundListeners()`](#stopallforegroundlisteners)
- [`stopForegroundListenerForType(...)`](#stopforegroundlistenerfortype)
- [`syncAllHistoricalData()`](#syncallhistoricaldata)
- [`syncHistoricalDataForType(...)`](#synchistoricaldatafortype)
- [`syncAllLatestData()`](#syncalllatestdata)
- [`syncLatestDataForType(...)`](#synclatestdatafortype)
- [`getUserData()`](#getuserdata)
- [`getUserTrends()`](#getusertrends)
- [`getUserWorkouts(...)`](#getuserworkouts)
- [`getUserWorkoutById(...)`](#getuserworkoutbyid)
- [`getWorkoutRecommendations(...)`](#getworkoutrecommendations)
- [`getUserRecommendations()`](#getuserrecommendations)
- [`getDailyHistory(...)`](#getdailyhistory)
- [`getHealthMetrics(...)`](#gethealthmetrics)
- [`setUserGoal(...)`](#setusergoal)
- [`setUserSpecificGoal(...)`](#setuserspecificgoal)
- [`recommendationSeen(...)`](#recommendationseen)
- [`saveWorkoutRecommendation(...)`](#saveworkoutrecommendation)
- [`rateWorkout(...)`](#rateworkout)
- [Interfaces](#interfaces)
- [Type Aliases](#type-aliases)
- [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### setup(...)

```typescript
setup(options: { clientId: string; clientSecret: string; environment: string; queryTypes: QueryType[]; verbose: boolean; }) => Promise<void>
```

Before any feature can be used, you must initialize the SDK providing your credentials and every Health Data Type you wish to use. For more information about the supported data types, please refer to <a href="#querytype">`QueryType`</a>.

| Param         | Type                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **`options`** | <code>{ clientId: string; clientSecret: string; environment: string; queryTypes: QueryType[]; verbose: boolean; }</code> |

---

### requestAuthorizationsIfPossible()

```typescript
requestAuthorizationsIfPossible() => Promise<void>
```

Request user permissions for all <a href="#querytype">`QueryType`</a> defined at SDK setup.
It is recommended to do it before setting the user token or attempting to evoke other SDK methods.

---

### setUserToken(...)

```typescript
setUserToken(options: { userToken: string; }) => Promise<void>
```

Set the user access token. It is recommended to do it as soon as possible, right after having requested user permissions.

| Param         | Type                                |
| ------------- | ----------------------------------- |
| **`options`** | <code>{ userToken: string; }</code> |

---

### setupAllBackgroundQueries()

```typescript
setupAllBackgroundQueries() => Promise<any>
```

Setup background queries to sync all types defined on SDK setup.

**Returns:** <code>Promise&lt;any&gt;</code>

---

### setupBackgroundQueryForType(...)

```typescript
setupBackgroundQueryForType(options: { type: QueryType; }) => Promise<any>
```

Setup background query for specific query type.

| Param         | Type                                                       |
| ------------- | ---------------------------------------------------------- |
| **`options`** | <code>{ type: <a href="#querytype">QueryType</a>; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

---

### enableAllBackgroundDelivery()

```typescript
enableAllBackgroundDelivery() => Promise<any>
```

Enables background delivery for all types defined on SDK setup.

**Returns:** <code>Promise&lt;any&gt;</code>

---

### disableAllBackgroundDelivery()

```typescript
disableAllBackgroundDelivery() => Promise<any>
```

Disables background delivery for all types.

**Returns:** <code>Promise&lt;any&gt;</code>

---

### enableBackgroundDeliveryForType(...)

```typescript
enableBackgroundDeliveryForType(options: { type: QueryType; }) => Promise<boolean>
```

Enables background delivery for specific query type.

| Param         | Type                                                       |
| ------------- | ---------------------------------------------------------- |
| **`options`** | <code>{ type: <a href="#querytype">QueryType</a>; }</code> |

**Returns:** <code>Promise&lt;boolean&gt;</code>

---

### disableBackgroundDeliveryForType(...)

```typescript
disableBackgroundDeliveryForType(options: { type: QueryType; }) => Promise<any>
```

Disables background delivery for specific query type.

| Param         | Type                                                       |
| ------------- | ---------------------------------------------------------- |
| **`options`** | <code>{ type: <a href="#querytype">QueryType</a>; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

---

### enableAllForegroundListeners()

```typescript
enableAllForegroundListeners() => Promise<any>
```

Start a foreground listeners for all types defined on SDK setup.

**Returns:** <code>Promise&lt;any&gt;</code>

---

### enableForegroundListenerForType(...)

```typescript
enableForegroundListenerForType(options: { type: QueryType; }) => Promise<any>
```

Start a foreground listener for specific query type.

| Param         | Type                                                       |
| ------------- | ---------------------------------------------------------- |
| **`options`** | <code>{ type: <a href="#querytype">QueryType</a>; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

---

### stopAllForegroundListeners()

```typescript
stopAllForegroundListeners() => Promise<any>
```

Stops all foreground listeners that are currently active

**Returns:** <code>Promise&lt;any&gt;</code>

---

### stopForegroundListenerForType(...)

```typescript
stopForegroundListenerForType(options: { type: QueryType; }) => Promise<any>
```

Stops foreground listener off specific query type.

| Param         | Type                                                       |
| ------------- | ---------------------------------------------------------- |
| **`options`** | <code>{ type: <a href="#querytype">QueryType</a>; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

---

### syncAllHistoricalData()

```typescript
syncAllHistoricalData() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

---

### syncHistoricalDataForType(...)

```typescript
syncHistoricalDataForType(options: { type: QueryType; }) => Promise<any>
```

| Param         | Type                                                       |
| ------------- | ---------------------------------------------------------- |
| **`options`** | <code>{ type: <a href="#querytype">QueryType</a>; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

---

### syncAllLatestData()

```typescript
syncAllLatestData() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

---

### syncLatestDataForType(...)

```typescript
syncLatestDataForType(options: { type: QueryType; }) => Promise<any>
```

| Param         | Type                                                       |
| ------------- | ---------------------------------------------------------- |
| **`options`** | <code>{ type: <a href="#querytype">QueryType</a>; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

---

### getUserData()

```typescript
getUserData() => Promise<User>
```

**Returns:** <code>Promise&lt;<a href="#user">User</a>&gt;</code>

---

### getUserTrends()

```typescript
getUserTrends() => Promise<Trend[]>
```

**Returns:** <code>Promise&lt;Trend[]&gt;</code>

---

### getUserWorkouts(...)

```typescript
getUserWorkouts(options: { offset: number; }) => Promise<Workout[]>
```

| Param         | Type                             |
| ------------- | -------------------------------- |
| **`options`** | <code>{ offset: number; }</code> |

**Returns:** <code>Promise&lt;Workout[]&gt;</code>

---

### getUserWorkoutById(...)

```typescript
getUserWorkoutById(options: { workoutId: number; }) => Promise<Workout>
```

| Param         | Type                                |
| ------------- | ----------------------------------- |
| **`options`** | <code>{ workoutId: number; }</code> |

**Returns:** <code>Promise&lt;<a href="#workout">Workout</a>&gt;</code>

---

### getWorkoutRecommendations(...)

```typescript
getWorkoutRecommendations(options: { date: string; }) => Promise<WorkoutRecommendation[]>
```

| Param         | Type                           |
| ------------- | ------------------------------ |
| **`options`** | <code>{ date: string; }</code> |

**Returns:** <code>Promise&lt;WorkoutRecommendation[]&gt;</code>

---

### getUserRecommendations()

```typescript
getUserRecommendations() => Promise<Recommendation[]>
```

**Returns:** <code>Promise&lt;Recommendation[]&gt;</code>

---

### getDailyHistory(...)

```typescript
getDailyHistory(options: { offset: number; }) => Promise<[{ date: Date; metrics: HealthMetric[]; }]>
```

| Param         | Type                             |
| ------------- | -------------------------------- |
| **`options`** | <code>{ offset: number; }</code> |

**Returns:** <code>Promise&lt;[{ date: <a href="#date">Date</a>; metrics: HealthMetric[]; }]&gt;</code>

---

### getHealthMetrics(...)

```typescript
getHealthMetrics(params: { filter?: HealthMetricType[]; workoutId?: number; date?: string; }) => Promise<HealthMetric[]>
```

| Param        | Type                                                                             |
| ------------ | -------------------------------------------------------------------------------- |
| **`params`** | <code>{ filter?: HealthMetricType[]; workoutId?: number; date?: string; }</code> |

**Returns:** <code>Promise&lt;HealthMetric[]&gt;</code>

---

### setUserGoal(...)

```typescript
setUserGoal(options: { goal: Goal; }) => Promise<User>
```

| Param         | Type                                             |
| ------------- | ------------------------------------------------ |
| **`options`** | <code>{ goal: <a href="#goal">Goal</a>; }</code> |

**Returns:** <code>Promise&lt;<a href="#user">User</a>&gt;</code>

---

### setUserSpecificGoal(...)

```typescript
setUserSpecificGoal(options: { specificGoal: SpecificGoal; }) => Promise<User>
```

| Param         | Type                                                                     |
| ------------- | ------------------------------------------------------------------------ |
| **`options`** | <code>{ specificGoal: <a href="#specificgoal">SpecificGoal</a>; }</code> |

**Returns:** <code>Promise&lt;<a href="#user">User</a>&gt;</code>

---

### recommendationSeen(...)

```typescript
recommendationSeen(options: { id: number; }) => Promise<any>
```

| Param         | Type                         |
| ------------- | ---------------------------- |
| **`options`** | <code>{ id: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

---

### saveWorkoutRecommendation(...)

```typescript
saveWorkoutRecommendation(options: { id: number; }) => Promise<any>
```

| Param         | Type                         |
| ------------- | ---------------------------- |
| **`options`** | <code>{ id: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

---

### rateWorkout(...)

```typescript
rateWorkout(options: { id: number; ratings: WorkoutRatings; }) => Promise<Workout>
```

| Param         | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code>{ id: number; ratings: <a href="#workoutratings">WorkoutRatings</a>; }</code> |

**Returns:** <code>Promise&lt;<a href="#workout">Workout</a>&gt;</code>

---

### Interfaces

#### User

| Prop               | Type                                                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`id`**           | <code>string</code>                                                                                                                                 |
| **`email`**        | <code>string</code>                                                                                                                                 |
| **`birthday`**     | <code>string</code>                                                                                                                                 |
| **`firstName`**    | <code>string</code>                                                                                                                                 |
| **`isSubscriber`** | <code>boolean</code>                                                                                                                                |
| **`goal`**         | <code>string</code>                                                                                                                                 |
| **`goalProgress`** | <code><a href="#record">Record</a>&lt;<a href="#goalprogresskey">GoalProgressKey</a>, <a href="#goalprogressvalue">GoalProgressValue</a>&gt;</code> |
| **`specificGoal`** | <code>string</code>                                                                                                                                 |
| **`lastWorkout`**  | <code><a href="#workout">Workout</a></code>                                                                                                         |

#### Trend

| Prop                   | Type                                              |
| ---------------------- | ------------------------------------------------- |
| **`id`**               | <code>string</code>                               |
| **`type`**             | <code><a href="#trendtypes">TrendTypes</a></code> |
| **`additionalFields`** | <code>string</code>                               |

#### Recommendation

| Prop                 | Type                                                        |
| -------------------- | ----------------------------------------------------------- |
| **`id`**             | <code>number</code>                                         |
| **`insightId`**      | <code>number</code>                                         |
| **`templateId`**     | <code>number</code>                                         |
| **`category`**       | <code><a href="#insightcategory">InsightCategory</a></code> |
| **`description`**    | <code>string</code>                                         |
| **`actions`**        | <code>RecommendationAction[]</code>                         |
| **`cooldownEndsAt`** | <code><a href="#date">Date</a></code>                       |
| **`lastSeenAt`**     | <code><a href="#date">Date</a></code>                       |
| **`dismissedAt`**    | <code><a href="#date">Date</a></code>                       |
| **`icon`**           | <code>string</code>                                         |
| **`color`**          | <code>string</code>                                         |

#### RecommendationAction

| Prop        | Type                |
| ----------- | ------------------- |
| **`label`** | <code>string</code> |
| **`url`**   | <code>string</code> |

#### Date

Enables basic storage and retrieval of dates and times.

| Method                 | Signature                                                                                                    | Description                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**           | () =&gt; string                                                                                              | Returns a string representation of a date. The format of the string depends on the locale.                                              |
| **toDateString**       | () =&gt; string                                                                                              | Returns a date as a string value.                                                                                                       |
| **toTimeString**       | () =&gt; string                                                                                              | Returns a time as a string value.                                                                                                       |
| **toLocaleString**     | () =&gt; string                                                                                              | Returns a value as a string value appropriate to the host environment's current locale.                                                 |
| **toLocaleDateString** | () =&gt; string                                                                                              | Returns a date as a string value appropriate to the host environment's current locale.                                                  |
| **toLocaleTimeString** | () =&gt; string                                                                                              | Returns a time as a string value appropriate to the host environment's current locale.                                                  |
| **valueOf**            | () =&gt; number                                                                                              | Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC.                                                      |
| **getTime**            | () =&gt; number                                                                                              | Gets the time value in milliseconds.                                                                                                    |
| **getFullYear**        | () =&gt; number                                                                                              | Gets the year, using local time.                                                                                                        |
| **getUTCFullYear**     | () =&gt; number                                                                                              | Gets the year using Universal Coordinated Time (UTC).                                                                                   |
| **getMonth**           | () =&gt; number                                                                                              | Gets the month, using local time.                                                                                                       |
| **getUTCMonth**        | () =&gt; number                                                                                              | Gets the month of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                             |
| **getDate**            | () =&gt; number                                                                                              | Gets the day-of-the-month, using local time.                                                                                            |
| **getUTCDate**         | () =&gt; number                                                                                              | Gets the day-of-the-month, using Universal Coordinated Time (UTC).                                                                      |
| **getDay**             | () =&gt; number                                                                                              | Gets the day of the week, using local time.                                                                                             |
| **getUTCDay**          | () =&gt; number                                                                                              | Gets the day of the week using Universal Coordinated Time (UTC).                                                                        |
| **getHours**           | () =&gt; number                                                                                              | Gets the hours in a date, using local time.                                                                                             |
| **getUTCHours**        | () =&gt; number                                                                                              | Gets the hours value in a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                       |
| **getMinutes**         | () =&gt; number                                                                                              | Gets the minutes of a <a href="#date">Date</a> object, using local time.                                                                |
| **getUTCMinutes**      | () =&gt; number                                                                                              | Gets the minutes of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                           |
| **getSeconds**         | () =&gt; number                                                                                              | Gets the seconds of a <a href="#date">Date</a> object, using local time.                                                                |
| **getUTCSeconds**      | () =&gt; number                                                                                              | Gets the seconds of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                           |
| **getMilliseconds**    | () =&gt; number                                                                                              | Gets the milliseconds of a <a href="#date">Date</a>, using local time.                                                                  |
| **getUTCMilliseconds** | () =&gt; number                                                                                              | Gets the milliseconds of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                      |
| **getTimezoneOffset**  | () =&gt; number                                                                                              | Gets the difference in minutes between the time on the local computer and Universal Coordinated Time (UTC).                             |
| **setTime**            | (time: number) =&gt; number                                                                                  | Sets the date and time value in the <a href="#date">Date</a> object.                                                                    |
| **setMilliseconds**    | (ms: number) =&gt; number                                                                                    | Sets the milliseconds value in the <a href="#date">Date</a> object using local time.                                                    |
| **setUTCMilliseconds** | (ms: number) =&gt; number                                                                                    | Sets the milliseconds value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                              |
| **setSeconds**         | (sec: number, ms?: number \| undefined) =&gt; number                                                         | Sets the seconds value in the <a href="#date">Date</a> object using local time.                                                         |
| **setUTCSeconds**      | (sec: number, ms?: number \| undefined) =&gt; number                                                         | Sets the seconds value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                   |
| **setMinutes**         | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | Sets the minutes value in the <a href="#date">Date</a> object using local time.                                                         |
| **setUTCMinutes**      | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | Sets the minutes value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                   |
| **setHours**           | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | Sets the hour value in the <a href="#date">Date</a> object using local time.                                                            |
| **setUTCHours**        | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | Sets the hours value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                     |
| **setDate**            | (date: number) =&gt; number                                                                                  | Sets the numeric day-of-the-month value of the <a href="#date">Date</a> object using local time.                                        |
| **setUTCDate**         | (date: number) =&gt; number                                                                                  | Sets the numeric day of the month in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                        |
| **setMonth**           | (month: number, date?: number \| undefined) =&gt; number                                                     | Sets the month value in the <a href="#date">Date</a> object using local time.                                                           |
| **setUTCMonth**        | (month: number, date?: number \| undefined) =&gt; number                                                     | Sets the month value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                     |
| **setFullYear**        | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | Sets the year of the <a href="#date">Date</a> object using local time.                                                                  |
| **setUTCFullYear**     | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | Sets the year value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                      |
| **toUTCString**        | () =&gt; string                                                                                              | Returns a date converted to a string using Universal Coordinated Time (UTC).                                                            |
| **toISOString**        | () =&gt; string                                                                                              | Returns a date as a string value in ISO format.                                                                                         |
| **toJSON**             | (key?: any) =&gt; string                                                                                     | Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object Notation (JSON) serialization. |

### Type Aliases

#### Record

Construct a type with a set of properties K of type T

<code>{
[P in K]: T;
}</code>

#### GoalProgressKey

<code>'overral' | 'endurance' | 'recovery' | 'strength'</code>

#### GoalProgressValue

<code>{ value: number; variance: number; }</code>

#### Workout

<code>{ id: number; calories: number; distance: number; duration: number; start: string; end: string; activityName: string; activityId: number; ratings: <a href="#workoutratings">WorkoutRatings</a>; }</code>

#### WorkoutRatings

<code>{ difficulty: number; energy: number; instructor: number; }</code>

#### TrendTypes

<code>'record_calories_burned_across_all_workout_types' | 'most_efficient_workout_type' | 'longest_workout_type' | 'avg_workout_calories_burned' | 'avg_workout_duration' | 'usual_workout_time'</code>

#### WorkoutRecommendation

<code>{ id: number; date: string; activityId: number; activityName: string; workoutId: number; completedAt: string; createdAt: string; savedAt: string; }</code>

#### InsightCategory

<code>'HeartLifetimeIncrease' | 'Motivational' | 'NeedRecovery' | 'RoutineFreqOptimization' | 'RoutineTimeOptimization' | 'RoutineWorkoutTypeOptimization' | 'TocayaDeal' | 'TryHarder' | 'WorkoutStreak'</code>

#### HealthMetric

<code>{ type: string; date: string; value: number; variance: number; workoutId: number; }</code>

#### HealthMetricType

<code>'RestingHR' | 'OneMinuteHRR' | 'ThreeMinuteHRR' | 'HRV' | 'Vo2Max' | 'ActiveCalories' | 'BasalCalories' | 'TotalCalories' | 'WorkoutCalories' | 'WorkoutDistance' | 'WorkoutDuration' | 'ExertionRate' | 'MovementLevel' | 'MinsHRZone1' | 'MinsHRZone2' | 'MinsHRZone3' | 'MinsHRZone4' | 'MinsHRZone12' | 'MinsHRZone23' | 'MinsHRZone34' | 'WorkoutMinsHRZone1' | 'WorkoutMinsHRZone2' | 'WorkoutMinsHRZone3' | 'WorkoutMinsHRZone4' | 'WorkoutMinsHRZone12' | 'WorkoutMinsHRZone23' | 'WorkoutMinsHRZone34' | 'MindfulMinutes' | 'AvgWorkoutHR' | 'MinWorkoutHR' | 'MaxWorkoutHR' | 'SleepDuration' | 'SleepDurationInbed' | 'SleepDurationAsleep' | 'TotalWorkoutDuration' | 'TotalMinsHRZone12' | 'TotalMinsHRZone34' | 'WeeklyAvgWorkoutHR' | 'WeeklyExertionRate' | 'DailyWorkoutDuration'</code>

### Enums

#### QueryType

| Members                        | Value                                   |
| ------------------------------ | --------------------------------------- |
| **`RestingHeartRate`**         | <code>'restingHeartRate'</code>         |
| **`HeartRate`**                | <code>'heartRate'</code>                |
| **`ActiveEnergyBurned`**       | <code>'activeEnergyBurned'</code>       |
| **`BasalEnergyBurned`**        | <code>'basalEnergyBurned'</code>        |
| **`Workout`**                  | <code>'workout'</code>                  |
| **`HeartRateVariabilitySDNN`** | <code>'heartRateVariabilitySDNN'</code> |
| **`Vo2Max`**                   | <code>'vo2Max'</code>                   |
| **`StepCount`**                | <code>'stepCount'</code>                |
| **`MindfulSession`**           | <code>'mindfulSession'</code>           |
| **`SleepAnalysis`**            | <code>'sleepAnalysis'</code>            |
| **`Birthday`**                 | <code>'birthday'</code>                 |

#### Goal

| Members                   | Value                              |
| ------------------------- | ---------------------------------- |
| **`WeightLoss`**          | <code>'weightLoss'</code>          |
| **`AthleticPerformance`** | <code>'athleticPerformance'</code> |

#### SpecificGoal

| Members               | Value                          |
| --------------------- | ------------------------------ |
| **`BuildLeanMuscle`** | <code>'buildLeanMuscle'</code> |
| **`LoseWeight`**      | <code>'loseWeight'</code>      |
| **`PrepareForEvent`** | <code>'prepareForEvent'</code> |
| **`AccomplishMore`**  | <code>'accomplishMore'</code>  |
| **`MaintainHealth`**  | <code>'maintainHealth'</code>  |

</docgen-api>
