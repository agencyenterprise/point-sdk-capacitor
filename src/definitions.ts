export interface PointSDKPlugin {
  setup(options: {
    clientId: string;
    clientSecret: string;
    environment: string;
    queryTypes: string[];
    verbose: boolean;
  }): Promise<void>;

  requestAuthorizationsIfPossible(): Promise<void>;
  setUserToken(options: { userToken: string }): Promise<void>;

  // Background Listeners
  setupAllBackgroundQueries(): Promise<any>;
  setupBackgroundQueryForType(options: { type: QueryType }): Promise<any>;
  enableAllBackgroundDelivery(): Promise<any>;
  disableAllBackgroundDelivery(): Promise<any>;
  enableBackgroundDeliveryForType(options: {
    type: QueryType;
  }): Promise<boolean>;
  disableBackgroundDeliveryForType(options: { type: QueryType }): Promise<any>;

  // Foreground Listeners
  enableAllForegroundListeners(): Promise<any>;
  enableForegroundListenerForType(options: { type: QueryType }): Promise<any>;
  stopAllForegroundListeners(): Promise<any>;
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
