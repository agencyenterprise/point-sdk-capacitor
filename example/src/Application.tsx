import Nullstack from "nullstack";
import "./Application.scss";
import {
  PointSDK,
  PointEnvironment,
  QueryType,
  Goal,
  InsightType,
  FitbitScopes,
  HealthMetricType,
  SpecificGoal,
} from "../../dist/esm";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOiJQb2ludCBPcmciLCJvcmdJZCI6NDQsInN1YiI6InBvaW50fDYyOThkYjZjZGM0ZGVhMDA2OGQ4NDUyYyIsImlhdCI6MTY2NTc5MTA5OCwiZXhwIjoxNjY1ODc3NDk4fQ.l4Li1HelCjURwMKZZrawwZFwrM93qC8hspuc2eu2nTs";

class Application extends Nullstack {
  async hydrate() {
    // Setup the SDK as soon as possible, before background queries
    this.setupSDK();

    // Apple recommends setting up the background queries as soon as possible, first thing on app launch
    await this.startListeners();
  }

  prepare({ page }) {
    page.locale = "en-US";
  }

  render() {
    return (
      <main>
        <button onclick={this.setUserToken}>Set user token</button>
        <br></br>
        <button onclick={this.requestPermissions}>Request permissions</button>
        <br></br>
        <button onclick={this.getUserData}>Get user data</button>
        <br></br>
        <button onclick={this.setUserGoal}>Set user goal Athletic Performance</button>
        <br></br>
        <button onclick={this.setUserSpecificGoal}>Set user specific goal BuildLeanMuscle</button>
        <br></br>
        <button onclick={this.saveWorkoutRecommendation}>Save workout recommendation</button>
        <br></br>
        <button onclick={this.getUserWorkouts}>Get user workouts</button>
        <br></br>
        <button onclick={this.rateWorkout}>Rate Workout</button>
        <br></br>
        <button onclick={this.getWorkoutById}>Get workout by id</button>
        <br></br>
        <button onclick={this.getWorkoutRecommendations}>Get workout recommendations</button>
        <br></br>
        <button onclick={this.getUserDailyHistory}>Get daily history</button>
        <br></br>
        <button onclick={this.getUserHealthMetrics}>Get health metrics</button>
        <br></br>
        <button onclick={this.authenticateFitbit}>Authenticate Fitbit</button>
        <br></br>
        <button onclick={this.authenticateOura}>Authenticate Oura</button>
        <br></br>
        <button onclick={this.getInsights}>Get Insights</button>
        <br></br>
        <button onclick={this.getFitbitStatus}>Get Fitbit Status</button>
        <br></br>
        <button onclick={this.getOuraStatus}>Get Oura Status</button>
        <br></br>
      </main>
    );
  }

  setupSDK() {
    PointSDK.setup({
      clientId: "8LBpmn8YYvWZ0MX-EyBx51O39Pd9u0csvVl5",
      clientSecret: "clientSecret",
      environment: PointEnvironment.Development,
      verbose: true,
    });

    PointSDK.setupHealthkitIntegration({});

    PointSDK.setupFitbitIntegration({ fitbitClientId: "23895P" });
    PointSDK.setupOuraIntegration({ ouraClientId: "5LSPZR2EKG2GQ76J" });
  }

  async requestPermissions() {
    await PointSDK.requestAuthorizationsIfPossible();
  }

  async startListeners() {
    await PointSDK.startAllListeners();
  }

  async setUserToken() {
    await PointSDK.setUserToken({ userToken: token });
  }

  async getUserData() {
    const result = await PointSDK.getUserData();
    Application.logAndAlert(result);
  }

  async getUserWorkouts() {
    const result = await PointSDK.getUserWorkouts({ offset: 0 });
    Application.logAndAlert(result);
  }

  async rateWorkout() {
    const result = await PointSDK.rateWorkout({ id: 12133, ratings: { difficulty: 1, energy: 1, instructor: 1 } });
    Application.logAndAlert(result);
  }

  async getWorkoutById() {
    const result = await PointSDK.getUserWorkoutById({ workoutId: 8363 });
    Application.logAndAlert(result);
  }

  async getWorkoutRecommendations() {
    const result = await PointSDK.getWorkoutRecommendations({ date: new Date().toISOString() });
    Application.logAndAlert(result);
  }

  async getUserDailyHistory() {
    const result = await PointSDK.getDailyHistory({ offset: 0 });
    Application.logAndAlert(result);
  }

  async getUserHealthMetrics() {
    const result = await PointSDK.getHealthMetrics({});
    Application.logAndAlert(result);
  }

  async getInsights() {
    const result = await PointSDK.getInsights({ types: [InsightType.ActivityLevel] });
    Application.logAndAlert(result);
  }

  async setUserGoal() {
    const result = await PointSDK.setUserGoal({ goal: Goal.AthleticPerformance });
    Application.logAndAlert(result);
  }

  async setUserSpecificGoal() {
    const result = await PointSDK.setUserSpecificGoal({ specificGoal: SpecificGoal.BuildLeanMuscle });
    Application.logAndAlert(result);
  }

  async saveWorkoutRecommendation() {
    const recommendationId = 4236;
    const result = await PointSDK.saveWorkoutRecommendation({ id: recommendationId });
    Application.logAndAlert(result);
  }

  async authenticateFitbit() {
    await PointSDK.authenticateFitbit({
      callbackURLScheme: "exampleapp",
      fitbitScopes: [FitbitScopes.Activity, FitbitScopes.Profile, FitbitScopes.CardioFitness, FitbitScopes.OxygenSaturation, FitbitScopes.RespiratoryRate, FitbitScopes.Temperature],
    });
  }

  async authenticateOura() {
    await PointSDK.authenticateOura({ callbackURLScheme: "exampleapp" });
  }

  async getFitbitStatus() {
    const result = await PointSDK.isFitbitAuthenticated();
    Application.logAndAlert(result);
  }

  async getOuraStatus() {
    const result = await PointSDK.isOuraAuthenticated();
    Application.logAndAlert(result);
  }

  static logAndAlert(content) {
    const json = JSON.stringify(content, null, 2);
    console.log(json);
    alert(json);
  }
}

export default Application;
