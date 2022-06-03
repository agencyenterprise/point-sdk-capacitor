export interface PointSDKPlugin {
  /**
   * Before any feature can be used, you must initialize the SDK providing your credentials and every Health Data Type you wish to use. For more information about the supported data types, please refer to ``QueryType``.
   */
  setup(options: {
    clientId: string;
    clientSecret: string;
    environment: string;
    queryTypes: QueryType[];
    verbose: boolean;
  }): Promise<void>;

  /**
   * Request user permissions for all ``QueryType`` defined at SDK setup.
   * It is recommended to do it before setting the user token or attempting to evoke other SDK methods.
   */
  requestAuthorizationsIfPossible(): Promise<void>;

  /**
   * Set the user access token. It is recommended to do it as soon as possible, right after having requested user permissions.
   */
  setUserToken(options: { userToken: string }): Promise<void>;

  /**
   * Setup background queries to sync all types defined on SDK setup.
   */
  setupAllBackgroundQueries(): Promise<any>;

  /**
   * Setup background query for specific query type.
   */
  setupBackgroundQueryForType(options: { type: QueryType }): Promise<any>;

  /**
   * Enables background delivery for all types defined on SDK setup.
   */
  enableAllBackgroundDelivery(): Promise<any>;

  /**
   * Disables background delivery for all types.
   */
  disableAllBackgroundDelivery(): Promise<any>;

  /**
   * Enables background delivery for specific query type.
   */
  enableBackgroundDeliveryForType(options: {
    type: QueryType;
  }): Promise<boolean>;

  /**
   * Disables background delivery for specific query type.
   */
  disableBackgroundDeliveryForType(options: { type: QueryType }): Promise<any>;

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

  // Sync
  syncAllHistoricalData(): Promise<any>;
  syncHistoricalDataForType(options: { type: QueryType }): Promise<any>;
  syncAllLatestData(): Promise<any>;
  syncLatestDataForType(options: { type: QueryType }): Promise<any>;

  //API
  getUserData(): Promise<User>;
  getUserTrends(): Promise<Trend[]>;
  getUserWorkouts(options: { offset: number }): Promise<Workout[]>;
  getUserWorkoutById(options: { workoutId: number }): Promise<Workout>;
  getWorkoutRecommendations(options: {
    date: string;
  }): Promise<WorkoutRecommendation[]>;
  getUserRecommendations(): Promise<Recommendation[]>;
  getDailyHistory(options: {
    offset: number;
  }): Promise<[{ date: Date; metrics: HealthMetric[] }]>;
  getHealthMetrics(params: {
    filter?: HealthMetricType[];
    workoutId?: number;
    date?: string;
  }): Promise<HealthMetric[]>;

  setUserGoal(options: { goal: Goal }): Promise<User>;
  setUserSpecificGoal(options: { specificGoal: SpecificGoal }): Promise<User>;
  recommendationSeen(options: { id: number }): Promise<any>;
  saveWorkoutRecommendation(options: { id: number }): Promise<any>;
  rateWorkout(options: {
    id: number;
    ratings: WorkoutRatings;
  }): Promise<Workout>;
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
  | 'DailyWorkoutDuration';

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
