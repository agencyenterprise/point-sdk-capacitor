export interface PointSDKPlugin {
  /**
   * Before any feature can be used, you must initialize the SDK providing your credentials.
   */
  setup(options: {
    clientId: string;
    clientSecret: string;
    environment: string;
    verbose: boolean;
  }): Promise<void>;

  /**
   * Sets up Apple's Healthkit integration
   * Before Apple's Healthkit features can be used, you must initialize HealthKit providing every Health Data Type you wish to use. This will define which kind of samples are going to be collected.
   */
  setupHealthkitIntegration(options: {
    queryTypes?: QueryType[];
  }): Promise<void>;

  /**
   * @deprecated since version 1.3.0. It's not necessary to set up each integration manually anymore, this in now done automatically when setting up the SDK.
   * Sets up Fitbit integration.
   * Calling this will instantiate ``FitbitIntegrationManager`` within the SDK and it will be available for you to use.
   * Your Fitbit Client ID is provided by Fitbit when you create your Fitbit app integration.
   */
  setupFitbitIntegration(options: { fitbitClientId: string }): Promise<void>;

  /**
   * @deprecated since version 1.3.0. It's not necessary to set up each integration manually anymore, this in now done automatically when setting up the SDK.
   * Sets up Oura integration.
   * Calling this will instantiate ``OuraIntegrationManager`` within the SDK and it will be available for you to use.
   * Your Oura Client ID is provided by Oura when you create your Oura app integration.
   */
  setupOuraIntegration(options: { ouraClientId: string }): Promise<void>;

  /**
   * Call this function to let the user authenticate his `Fitbit` account and integrate it with their `Point` account.
   * When you call this function your app will display a browser with the Fitbit authentication web page, if the user successfully authenticates, the browser will be dismissed and the control will be handled back to your app.
   */
  authenticateFitbit(options: {
    callbackURLScheme: string;
    fitbitScopes?: FitbitScopes[];
  }): Promise<void>;

  /**
   * Call this function to let the user authenticate his `Oura` account and integrate it with their `Point` account.
   * When you call this function your app will display a browser with the Oura authentication web page, if the user successfully authenticates, the browser will be dismissed and the control will be handled back to your app.
   */
  authenticateOura(options: {
    callbackURLScheme: string;
    ouraScopes?: OuraScopes[];
  }): Promise<void>;

  /**
   * Revokes the user's Fitbit authentication. Effectively, this will cause Point to stop collecting Fitbit data from this user.
   */
  revokeFitbitAuthentication(): Promise<void>;

  /**
   * Revokes the user's Oura authentication. Effectively, this will cause Point to stop collecting Oura data from this user.
   */
  revokeOuraAuthentication(): Promise<void>;

  /**
   * Call this function to know if your user has already authenticated their Fitbit account.
   */
  isFitbitAuthenticated(): Promise<boolean>;

  /**
   * Call this function to know if your user has already authenticated their Oura account.
   */
  isOuraAuthenticated(): Promise<boolean>;

  /**
   * Request user permissions for all ``QueryType`` defined at SDK setup.
   * It is recommended to do it before setting the user token or attempting to evoke other SDK methods.
   */
  requestAuthorizationsIfPossible(): Promise<void>;

  /**
   * @deprecated since 1.4.0. Renamed to setAccessToken
   * Set the user access token. It is recommended to do it as soon as possible, right after having requested user permissions.
   */
  setUserToken(options: {
    userToken: string;
    shouldSyncData?: boolean;
  }): Promise<void>;

  /**
  * Set the user access token to access the `Point API` and optionally runs a sync to get the user past data and upload to `Point` database if its the first usage during the session.
  * 
  * Use this login method if you want to manually manage the user access token and provide a new one when the current expires. You will need to call this function on login and every time your token expires.
  * 
  * To handle this automatically, use ``setRefreshToken`` instead.
  * 
  * When you call this function (and if you enabled HealthKit integration), the SDK will start collecting 4 months worth of data for all types defined in the HealthKit integration setup (Latest Data Sync). After this initial process is completed, we will start collecting older data up until one year ago (Historical Data Sync).
  */
  setAccessToken(options: {
    accessToken: string;
    shouldSyncData?: boolean;
  }): Promise<void>;

  /**
  * Set the user refresh token to access the `Point API` and optionally runs a sync to get the user past data and upload to `Point` database if its the first usage during the session.
  * 
  * By using this method of login will allow the Point SDK to automatically handle the user access token and refresh it when needed. You only need to call this function once, as the token will be persisted between sessions. Calling ``logout()`` will erase the refresh token.
  * 
  * Do not call ``setAccessToken`` if a refresh token is set.
  * 
  * When you call this function (and if you enabled HealthKit integration), the SDK will start collecting 4 months worth of data for all types defined in the HealthKit integration setup (Latest Data Sync). After this initial process is completed, we will start collecting older data up until one year ago (Historical Data Sync).
  */
  setRefreshToken(options: {
    refreshToken: string;
    userId: string;
    shouldSyncData?: boolean;
  }): Promise<void>;

  /**
   * Clear the user token and the local cache. Also stops all listeners.
   */
  logout(): Promise<void>;

  /**
   * Start listeners to sync all types defined on SDK setup.
   */
  startAllListeners(): Promise<any>;

  /**
   * Start listener to sync just a specific query type.
   */
  startListenerForType(options: { type: QueryType }): Promise<any>;

  /**
   * Stop listeners for all types defined on SDK setup.
   */
  stopAllListeners(): Promise<any>;

  /**
   * Stop listeners for a specific query type.
   */
  stopListenerForType(options: { type: QueryType }): Promise<any>;

  /**
   * Syncs the past 3 months of historical data for permissioned types with the Point database.
   */
  syncAllHistoricalData(): Promise<any>;

  /**
   * Syncs the past 3 months historical data for a given sample type with the Point database.
   */
  syncHistoricalDataForType(options: { type: QueryType }): Promise<any>;

  /**
   * Syncs the HealthKit data from the query results with the `Point` database.
   */
  sync(options: {
    type: QueryType;
    startDate?: string;
    endDate?: string;
    filterDuplicates?: boolean;
  }): Promise<any>;

  /**
   * Retrieves information about the User, such as email, first name, birthday, last workout, goals and more.
   */
  getUserData(): Promise<User>;

  /**
   * Retrieves a list of the User's last 16 Workouts, in descending order. The offset is meant to be used as a pagination, and if no value is passed, it is defaulted to 0.
   */
  getUserWorkouts(options: { offset: number }): Promise<Workout[]>;

  /**
   * Retrieves a single Workout for the given id.
   */
  getUserWorkoutById(options: { workoutId: number }): Promise<Workout>;

  /**
   * Retrieves a list of WorkoutRecommendation. Workout recommendations are generated weekly on the Point database, based in the user **goal**. The date parameter defines which week you will get recommendations from.
   *
   * We recommend using `saveWorkoutRecommendation(options: { id: number })` to let your users choose what recommendations they pick.
   */
  getWorkoutRecommendations(options: {
    date: string;
  }): Promise<WorkoutRecommendation[]>;

  /**
   * Retrieves a list of the User's last 16 days worth of DailyHistory, in descending order. The DailyHistory is composed of daily total calories, exertion rate and total workout duration. The offset is meant to be used as a pagination, and if no value is passed, it is defaulted to 0.
   */
  getDailyHistory(options: {
    offset: number;
  }): Promise<[{ date: Date; metrics: HealthMetric[] }]>;

  /**
   * You can get a set of user health metrics, which are a summary of the collected samples. Check [HealthMetric](https://agencyenterprise.github.io/point-ios/documentation/pointsdk/healthmetric/healthmetrictype) to know all kinds of health metrics available.
   */
  getHealthMetrics(params: {
    filter?: HealthMetricType[];
    workoutId?: number;
    date?: string;
  }): Promise<HealthMetric[]>;

  /**
   * Goals are used to generate **recommendations** and insights for the user.
   * Sets the user Goal. This is more limited set of options. If you wish to provide more options, use the **Specific Goal**.
   */
  setUserGoal(options: { goal: Goal }): Promise<User>;

  /**
   * Sets the user SpecificGoal. This provides a wider array of options. Calling this function also sets the Goal.
   */
  setUserSpecificGoal(options: { specificGoal: SpecificGoal }): Promise<User>;

  /**
   * You can allow users to rate their past workouts. A workout rating is divided in "Difficulty", "Energy" and "Instructor" ratings. Each field can be rated from 1 to 5, defaulting to 0 if a value is not set.
   */
  rateWorkout(options: {
    id: number;
    ratings: WorkoutRatings;
  }): Promise<Workout>;

  /**
   * Saves a workout recommendation, meaning that the user wishes to accomplish this recommendation.
   *
   * When a recommendation is saved, Point is able to check if this workout recommendation was accomplished and improve the next workout recommendations given to this user.
   */
  saveWorkoutRecommendation(options: { id: number }): Promise<any>;

  getInsights(options: {
    types: InsightType[];
    from?: string;
    to?: string;
    offset?: number;
  }): Promise<Insight>;
}

type GoalProgressKey = 'overall' | 'endurance' | 'recovery' | 'strength';

type GoalProgressValue = {
  value: number;
  variance: number;
};

export interface User {
  id: string;
  email: string;
  birthday: string;
  firstName: string;
  goal: string;
  goalProgress: Record<GoalProgressKey, GoalProgressValue>;
  specificGoal: string;
  lastWorkout: Workout;
}

export type WorkoutRatings = {
  difficulty: number;
  energy: number;
  instructor: number;
};

export type Workout = {
  id: number;
  calories: number;
  distance: number;
  duration: number;
  start: string;
  end: string;
  activityName: string;
  activityId: number;
  ratings: WorkoutRatings;
};

export type HealthMetric = {
  type: string;
  date: string;
  value: number;
  variance: number;
  workoutId: number;
};

export type WorkoutRecommendation = {
  id: number;
  date: string;
  activityId: number;
  activityName: string;
  workoutId: number;
  completedAt: string;
  createdAt: string;
  savedAt: string;
};

export type Insight = {
  id: string;
  type: InsightType;
  additionalFields: string;
  createdAt: string;
};

export enum InsightType {
  ExertionOptimalAm = 'exertion_optimal_am',
  ExertionOptimalPm = 'exertion_optimal_pm',
  CalorieBurnOptimalAm = 'calorie_burn_optimal_am',
  CalorieBurnOptimalPm = 'calorie_burn_optimal_pm',
  DurationOptimalAm = 'duration_optimal_am',
  DurationOptimalPm = 'duration_optimal_pm',
  HrvDecreaseMedsev = 'hrv_decrease_medsev',
  HrvDecreaseHisev = 'hrv_decrease_hisev',
  RecordCaloriesBurned = 'record_calories_burned',
  RecordExertionRate = 'record_exertion_rate',
  RecordCaloriesBurnedAcrossAllWorkoutTypes = 'record_calories_burned_across_all_workout_types',
  RecordExertionRateAcrossAllWorkoutTypes = 'record_exertion_rate_across_all_workout_types',
  MostEfficientWorkoutType = 'most_efficient_workout_type',
  LongestWorkoutType = 'longest_workout_type',
  AvgWorkoutCaloriesBurned = 'avg_workout_calories_burned',
  AvgWorkoutExertionRate = 'avg_workout_exertion_rate',
  UsualWorkoutTime = 'usual_workout_time',
  OptimalWorkoutRoutine = 'optimal_workout_routine',
  DurationTip = 'duration_tip',
  WorkoutHrZone5HighMinutes = 'workout_hr_zone5_high_minutes',
  WeekHrZonesLowMinutesBurnFat = 'week_hr_zones_low_minutes_burn_fat',
  WeekHrZonesLowMinutesBurnCarb = 'week_hr_zones_low_minutes_burn_carb',
  WeekHrZonesHighMinutesBurnCarb = 'week_hr_zones_high_minutes_burn_carb',
  WeekHrZone5HighMinutes = 'week_hr_zone5_high_minutes',
  AvgWorkoutDuration = "avg_workout_duration",
  WorkoutIntensityTooHigh = "workout_intensity_too_high",
  DayIntensityTooHigh = "day_intensity_too_high",
  FirstWorkoutInAWhileIntensityTooHigh = "first_workout_in_a_while_intensity_too_high",
  ActivityLevel = 'activity_level',
}

export enum QueryType {
  RestingHeartRate = 'restingHeartRate',
  HeartRate = 'heartRate',
  ActiveEnergyBurned = 'activeEnergyBurned',
  BasalEnergyBurned = 'basalEnergyBurned',
  Workout = 'workout',
  HeartRateVariabilitySDNN = 'heartRateVariabilitySDNN',
  Vo2Max = 'vo2Max',
  StepCount = 'stepCount',
  MindfulSession = 'mindfulSession',
  SleepAnalysis = 'sleepAnalysis',
  Birthday = 'dateOfBirth',
  BodyMass = 'bodyMass',
  LeanBodyMass = 'leanBodyMass',
  BodyMassIndex = 'bodyMassIndex',
  BodyTemperature = 'bodyTemperature',
  BodyFatPercentage = 'bodyFatPercentage',
  OxygenSaturation = 'oxygenSaturation',
  RespiratoryRate = 'respiratoryRate',
  BloodGlucose = 'bloodGlucose',
  BloodPressure = 'bloodPressure',
  BiologicalSex = 'biologicalSex',
}

export enum FitbitScopes {
  Activity = 'activity',
  Heartrate = 'heartrate',
  Profile = 'profile',
  Sleep = 'sleep',
  Weight = 'weight',
  CardioFitness = 'cardio_fitness',
  RespiratoryRate = 'respiratory_rate',
  OxygenSaturation = 'oxygen_saturation',
  Temperature = 'temperature'
}
export enum OuraScopes {
  Daily = 'daily',
  Heartrate = 'heartrate',
  Personal = 'personal',
  Session = 'session',
  Workout = 'workout',
}

export enum Goal {
  WeightLoss = 'weightLoss',
  AthleticPerformance = 'athleticPerformance',
}

export enum SpecificGoal {
  BuildLeanMuscle = 'buildLeanMuscle',
  LoseWeight = 'loseWeight',
  PrepareForEvent = 'prepareForEvent',
  AccomplishMore = 'accomplishMore',
  MaintainHealth = 'maintainHealth',
}

export enum PointEnvironment {
  Development = 'development',
  Production = 'production',
  PreProduction = 'preprod',
  Staging = 'staging',
}

export enum HealthMetricType {
  RestingHR = 'RestingHR',
  OneMinuteHRR = 'OneMinuteHRR',
  ThreeMinuteHRR = 'ThreeMinuteHRR',
  HRV = 'HRV',
  Vo2Max = 'Vo2Max',
  ActiveCalories = 'ActiveCalories',
  BasalCalories = 'BasalCalories',
  TotalCalories = 'TotalCalories',
  WorkoutCalories = 'WorkoutCalories',
  WorkoutDistance = 'WorkoutDistance',
  WorkoutDuration = 'WorkoutDuration',
  ExertionRate = 'ExertionRate',
  MovementLevel = 'MovementLevel',
  MinsHRZone12 = 'MinsHRZone12',
  MinsHRZone23 = 'MinsHRZone23',
  MinsHRZone34 = 'MinsHRZone34',
  MinsHRZone45 = 'MinsHRZone45',
  MinsHRZone5 = 'MinsHRZone5',
  MindfulMinutes = 'MindfulMinutes',
  AvgWorkoutHR = 'AvgWorkoutHR',
  MinWorkoutHR = 'MinWorkoutHR',
  MaxWorkoutHR = 'MaxWorkoutHR',
  SleepDuration = 'SleepDuration',
  SleepDurationInbed = 'SleepDurationAwake',
  SleepDurationAsleep = 'SleepDurationAsleep',
  SleepDurationAwake = 'SleepDurationAwake',
  TotalWorkoutDuration = 'TotalWorkoutDuration',
  TotalMinsHRZone12 = 'TotalMinsHRZone12',
  TotalMinsHRZone34 = 'TotalMinsHRZone34',
  WeeklyAvgWorkoutHR = 'WeeklyAvgWorkoutHR',
  WeeklyExertionRate = 'WeeklyExertionRate',
  DailyWorkoutDuration = 'DailyWorkoutDuration',
  Weight = 'Weight',
  SleepEfficiency = 'SleepEfficiency',
  SleepLatency = 'SleepLatency',
  SleepStageDeep = 'SleepStageDeep',
  SleepStageLight = 'SleepStageLight',
  SleepStageREM = 'SleepStageREM',
  SleepStageAwake = 'SleepStageAwake',
  MaxHR = 'MaxHR',
  SleepRestlessness = 'SleepRestlessness'
}
