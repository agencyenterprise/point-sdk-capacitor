# Point Health Data Service

Use the Health Data Service to get user data and generated metric from the Point database.

## User Data

Retrieves information about the `User`, such as email, first name, birthday, last workout, goals and more.

```typescript
async getUserData() {
    const user = await PointSDK.getUserData();
  }
```

## User Workouts

Retrieves a list of the User's last 16 `Workout`s, in descending order. The offset is meant to be used as a pagination, and if no value is passed, it is defaulted to 0.

```typescript
async getUserWorkouts() {
    const workouts = await PointSDK.getUserWorkouts({ offset: 0 });
}
```

Retrieves a single `Workout` for the given id.

```typescript
async getUserWorkoutById() {
    const workout = await PointSDK.getUserWorkoutById({ workoutId: 5793 });
}
```

### Workout Rating

You can allow users to rate their past workouts. A workout rating is divided in "Difficulty", "Energy" and "Instructor" ratings. Each field can be rated from 1 to 5, defaulting to 0 if a value is not set.

```typescript
async rateWorkout() {
    const ratings = { difficulty: 4, energy: 5, instructor: 3 }
    const result = await PointSDK.rateWorkout({ id: 5793, ratings });
}
```

> We recommend you to rate a workout only once.

## Daily History

Retrieves a list of the User's last 16 days worth of DailyHistory, in descending order. The DailyHistory is composed of daily total calories, exertion rate and total workout duration. The offset is meant to be used as a pagination, and if no value is passed, it is defaulted to 0.

```typescript
async getUserDailyHistory() {
    const result = await PointSDK.getDailyHistory({ offset: 0 });
}
```

## User Health Metrics

You can get a set of user health metrics, which are a summary of the collected samples. Check `HealthMetric` to know all kinds of health metrics available.

```typescript
async getUserHealthMetrics() {
    const result = await PointSDK.getHealthMetrics({});
}
```

> You can filter by type, workout or date.

## Goals

Goals are used to generate **recommendations** and insights for the user.

Sets the user `Goal`. This is more limited set of options. If you wish to provide more options, use the **Specific Goal**.

```typescript
async setUserGoal() {
    const result = await PointSDK.setUserGoal({ goal: Goal.AthleticPerformance });
}
```

Sets the user `SpecificGoal`. This provides a wider array of options. Calling this function also sets the `Goal`.

```typescript
async setUserSpecificGoal() {
    const result = await PointSDK.setUserSpecificGoal({ specificGoal: SpecificGoal.BuildLeanMuscle });
}
```

> Important: Both functions are mutually exclusive. Do not use both as it may cause unintended changes in the database.

## Workout Recommendations

Retrieves a list of `WorkoutRecommendation`. Workout recommendations are generated weekly on the Point database, based in the user **goal**. The date parameter defines which week you will get recommendations from.

```typescript
async getWorkoutRecommendations() {
    const result = await PointSDK.getWorkoutRecommendations({ date: new Date().toISOString() });
}
```

> Tip: Use the current date to get recommendations from the current week.

## Trends

You can get the user `Trend`s for the last 3 months, like average workout duration and record calories burned. To get a trend content, you must access the dictionary `Trend/additionalFields` and handle its content individually. Each trend has an associated `TrendType` that determines what keys will be available in the dictionary and how you should handle its values.

```typescript
  async getUserTrends() {
    const result = await PointSDK.getUserTrends();
  }
```

## User Recommendations

Retrieves a list of `Recommendation`. `Point` periodically checks if it can create a new personalized recommendation. A recommendation will be available for a finite time before it expires. There are different types of insights, listed in `InsightCategory`.

```typescript
async getUserRecommendations() {
    const result = await PointSDK.getUserRecommendations()
}
```
