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
    queryTypes: QueryType[];
  }): Promise<void>;

  /**
   * Sets up Fitbit integration.
   * Calling this will instantiate ``FitbitIntegrationManager`` within the SDK and it will be available for you to use.
   * Your Fitbit Client ID is provided by Fitbit when you create your Fitbit app integration.
   */
  setupFitbitIntegration(options: { fitbitClientId: string }): Promise<void>;

  /**
   * Call this function to let the user authenticate his `Fitbit` account and integrate it with their `Point` account.
   * When you call this function your app will display a browser with the Fitbit authentication web page, if the user successfully authenticates, the browser will be dismissed and the control will be handled back to your app.
   */
  authenticateFitbit(options: {
    callbackURLScheme: string;
    fitbitScopes: FitbitScopes[];
  }): Promise<void>;

  /**
   * Revokes the user's Fitbit authentication. Effectively, this will cause Point to stop collecting Fitbit data from this user.
   */
  revokeFitbitAuthentication(): Promise<void>;

  /**
   * Request user permissions for all ``QueryType`` defined at SDK setup.
   * It is recommended to do it before setting the user token or attempting to evoke other SDK methods.
   */
  requestAuthorizationsIfPossible(): Promise<void>;

  /**
   * Set the user access token. It is recommended to do it as soon as possible, right after having requested user permissions.
   */
  setUserToken(options: {
    userToken: string;
    shouldSyncData?: boolean;
  }): Promise<void>;

  /**
   * Enable background listeners to sync all types defined on SDK setup.
   */
  startAllBackgroundListeners(): Promise<any>;

  /**
   * Enable background listeners to sync just a specific query type.
   */
  startBackgroundListenersForType(options: { type: QueryType }): Promise<any>;

  /**
   * Disables background listeners for all types defined on SDK setup.
   */
  disableAllBackgroundListeners(): Promise<any>;

  /**
   * Disables background listeners for a specific query type.
   */
  disableBackgroundListenersForType(options: { type: QueryType }): Promise<any>;

  /**
   * Start a foreground listeners for all types defined on SDK setup.
   */
  enableAllForegroundListeners(): Promise<any>;

  /**
   * Start a foreground listener for specific query type.
   */
  enableForegroundListenerForType(options: { type: QueryType }): Promise<any>;

  /**
   * Stops all foreground listeners that are currently active
   */
  stopAllForegroundListeners(): Promise<any>;

  /**
   * Stops foreground listener off specific query type.
   */
  stopForegroundListenerForType(options: { type: QueryType }): Promise<any>;

  /**
   * Syncs the past 3 months of historical data for permissioned types with the Point database.
   */
  syncAllHistoricalData(): Promise<any>;

  /**
   * Syncs the past 3 months historical data for a given sample type with the Point database.
   */
  syncHistoricalDataForType(options: { type: QueryType }): Promise<any>;

  /**
   * Syncs the HealthKit data for all permissioned types with `Point` database limited to 6 months.
   */
  syncAllLatestData(): Promise<any>;

  /**
   * Syncs the HealthKit data from the latest sample of the given type until now with Point database, limited to 3 months of data.
   */
  syncLatestDataForType(options: { type: QueryType }): Promise<any>;

  /**
   * Syncs the HealthKit data from the query results with the `Point` database.
   */
  sync(options: {
    startDate?: string;
    endDate?: string;
    ascending?: boolean;
    avoidDuplicates?: boolean;
  }): Promise<any>;

  /**
   * Retrieves information about the User, such as email, first name, birthday, last workout, goals and more.
   */
  getUserData(): Promise<User>;

  /**
   * You can get the user Trends for the last 3 months, like average workout duration and record calories burned.
   */
  getUserTrends(): Promise<Trend[]>;

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
   * Retrieves a list of Recommendations. Point periodically checks if it can create a new personalized recommendation. A recommendation will be available for a finite time before it expires. There are different types of insights, listed in InsightCategory.
   */
  getUserRecommendations(): Promise<Recommendation[]>;

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
   * Mark a recommendation as already seen, using the ID of the recommendation.
   */
  recommendationSeen(options: { id: number }): Promise<any>;

  /**
   * Saves a workout recommendation, meaning that the user wishes to accomplish this recommendation.
   *
   * When a recommendation is saved, Point is able to check if this workout recommendation was accomplished and improve the next workout recommendations given to this user.
   */
  saveWorkoutRecommendation(options: { id: number }): Promise<any>;
}

type GoalProgressKey = 'overral' | 'endurance' | 'recovery' | 'strength';

type GoalProgressValue = {
  value: number;
  variance: number;
};

export interface User {
  id: string;
  email: string;
  birthday: string;
  firstName: string;
  isSubscriber: boolean;
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
  Birthday = 'birthday',
  BodyMass = 'bodyMass',
}

export enum FitbitScopes {
  Activity = 'restingHeartRate',
  Heartrate = 'heartrate',
  Location = 'location',
  Nutrition = 'nutrition',
  Profile = 'profile',
  Settings = 'settings',
  Sleep = 'sleep',
  Social = 'social',
  Weight = 'weight',
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

export type HealthMetricType =
  | 'RestingHR'
  | 'OneMinuteHRR'
  | 'ThreeMinuteHRR'
  | 'HRV'
  | 'Vo2Max'
  | 'ActiveCalories'
  | 'BasalCalories'
  | 'TotalCalories'
  | 'WorkoutCalories'
  | 'WorkoutDistance'
  | 'WorkoutDuration'
  | 'ExertionRate'
  | 'MovementLevel'
  | 'MinsHRZone1'
  | 'MinsHRZone2'
  | 'MinsHRZone3'
  | 'MinsHRZone4'
  | 'MinsHRZone12'
  | 'MinsHRZone23'
  | 'MinsHRZone34'
  | 'WorkoutMinsHRZone1'
  | 'WorkoutMinsHRZone2'
  | 'WorkoutMinsHRZone3'
  | 'WorkoutMinsHRZone4'
  | 'WorkoutMinsHRZone12'
  | 'WorkoutMinsHRZone23'
  | 'WorkoutMinsHRZone34'
  | 'MindfulMinutes'
  | 'AvgWorkoutHR'
  | 'MinWorkoutHR'
  | 'MaxWorkoutHR'
  | 'SleepDuration'
  | 'SleepDurationInbed'
  | 'SleepDurationAsleep'
  | 'TotalWorkoutDuration'
  | 'TotalMinsHRZone12'
  | 'TotalMinsHRZone34'
  | 'WeeklyAvgWorkoutHR'
  | 'WeeklyExertionRate'
  | 'DailyWorkoutDuration'
  | 'Weight'
  | 'SleepEfficiency'
  | 'SleepLatency'
  | 'SleepStageDeep'
  | 'SleepStageLight'
  | 'SleepStageREM'
  | 'SleepStageWake'
  | 'SleepDurationInbed'
  | 'SleepDurationAsleep';

export interface RecommendationAction {
  label: string;
  url: string;
}

export type InsightCategory =
  | 'HeartLifetimeIncrease'
  | 'Motivational'
  | 'NeedRecovery'
  | 'RoutineFreqOptimization'
  | 'RoutineTimeOptimization'
  | 'RoutineWorkoutTypeOptimization'
  | 'TocayaDeal'
  | 'TryHarder'
  | 'WorkoutStreak';

export interface Recommendation {
  id: number;
  insightId: number;
  templateId: number;
  category: InsightCategory;
  description: string;
  actions: RecommendationAction[];
  cooldownEndsAt: Date;
  lastSeenAt: Date;
  dismissedAt: Date;
  icon: string;
  color: string;
}

export type TrendTypes =
  | 'record_calories_burned_across_all_workout_types'
  | 'most_efficient_workout_type'
  | 'longest_workout_type'
  | 'avg_workout_calories_burned'
  | 'avg_workout_duration'
  | 'usual_workout_time';

export interface Trend {
  id: string;
  type: TrendTypes;
  additionalFields: string;
}
