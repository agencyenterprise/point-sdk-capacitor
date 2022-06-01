import { WebPlugin } from '@capacitor/core';

import type {
  Goal,
  HealthMetric,
  HealthMetricType,
  PointSDKPlugin,
  QueryType,
  Recommendation,
  SpecificGoal,
  Trend,
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
    queryTypes: string[];
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
  setupAllBackgroundQueries(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  setupBackgroundQueryForType(_options: { type: QueryType }): Promise<any> {
    throw new Error('Method not implemented.');
  }
  enableAllBackgroundDelivery(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  disableAllBackgroundDelivery(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  enableBackgroundDeliveryForType(_options: {
    type: QueryType;
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  disableBackgroundDeliveryForType(_options: {
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
  getUserData(): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getUserTrends(): Promise<Trend[]> {
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
  getUserRecommendations(): Promise<Recommendation[]> {
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
  setUserGoal(_options: { goal: Goal }): Promise<User> {
    throw new Error('Method not implemented.');
  }
  setUserSpecificGoal(_options: { specificGoal: SpecificGoal }): Promise<User> {
    throw new Error('Method not implemented.');
  }
  recommendationSeen(_options: { id: number }): Promise<any> {
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
}
