import { WebPlugin } from '@capacitor/core';

import type {
  FitbitScopes,
  Goal,
  HealthMetric,
  HealthMetricType,
  Insight,
  InsightType,
  PointSDKPlugin,
  QueryType,
  SpecificGoal,
  User,
  Workout,
  WorkoutRatings,
  WorkoutRecommendation,
} from './definitions';

export class PointSDKWeb extends WebPlugin implements PointSDKPlugin {
  setup(_options: {
    clientId: string;
    clientSecret: string;
    environment: string;
    verbose: boolean;
  }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  requestAuthorizationsIfPossible(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  setUserToken(_options: { userToken: string }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  startAllBackgroundListeners(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  startBackgroundListenersForType(_options: { type: QueryType }): Promise<any> {
    throw new Error('Method not implemented.');
  }
  disableAllBackgroundListeners(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  disableBackgroundListenersForType(_options: {
    type: QueryType;
  }): Promise<any> {
    throw new Error('Method not implemented.');
  }
  enableAllForegroundListeners(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  enableForegroundListenerForType(_options: { type: QueryType }): Promise<any> {
    throw new Error('Method not implemented.');
  }
  stopAllForegroundListeners(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  stopForegroundListenerForType(_options: { type: QueryType }): Promise<any> {
    throw new Error('Method not implemented.');
  }
  syncAllHistoricalData(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  syncHistoricalDataForType(_options: { type: QueryType }): Promise<any> {
    throw new Error('Method not implemented.');
  }
  syncAllLatestData(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  syncLatestDataForType(_options: { type: QueryType }): Promise<any> {
    throw new Error('Method not implemented.');
  }

  sync(_options: {
    startDate?: string | undefined;
    endDate?: string | undefined;
    ascending?: boolean | undefined;
    avoidDuplicates?: boolean | undefined;
  }): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getUserData(): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getUserWorkouts(_options: { offset: number }): Promise<Workout[]> {
    throw new Error('Method not implemented.');
  }
  getUserWorkoutById(_options: { workoutId: number }): Promise<Workout> {
    throw new Error('Method not implemented.');
  }
  getWorkoutRecommendations(_options: {
    date: string;
  }): Promise<WorkoutRecommendation[]> {
    throw new Error('Method not implemented.');
  }
  getDailyHistory(_options: {
    offset: number;
  }): Promise<[{ date: Date; metrics: HealthMetric[] }]> {
    throw new Error('Method not implemented.');
  }
  getHealthMetrics(_params: {
    filter?: HealthMetricType[] | undefined;
    workoutId?: number | undefined;
    date?: string | undefined;
  }): Promise<HealthMetric[]> {
    throw new Error('Method not implemented.');
  }
  getInsights(_options: {
    types: InsightType[];
    from?: string | undefined;
    to?: string | undefined;
    offset?: number | undefined;
  }): Promise<Insight> {
    throw new Error('Method not implemented.');
  }
  setUserGoal(_options: { goal: Goal }): Promise<User> {
    throw new Error('Method not implemented.');
  }
  setUserSpecificGoal(_options: { specificGoal: SpecificGoal }): Promise<User> {
    throw new Error('Method not implemented.');
  }
  saveWorkoutRecommendation(_options: { id: number }): Promise<any> {
    throw new Error('Method not implemented.');
  }
  rateWorkout(_options: {
    id: number;
    ratings: WorkoutRatings;
  }): Promise<Workout> {
    throw new Error('Method not implemented.');
  }
  setupHealthkitIntegration(_options: {
    queryTypes: QueryType[];
  }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  setupFitbitIntegration(_options: { fitbitClientId: string }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  authenticateFitbit(_options: {
    callbackURLScheme: string;
    fitbitScopes: FitbitScopes[];
  }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  revokeFitbitAuthentication(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
