import Nullstack from "nullstack";
import "./Application.scss";
import { PointSDK, PointEnvironment, QueryType, Goal, InsightType, FitbitScopes } from "../../dist/esm";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOiJQb2ludCBPcmciLCJvcmdJZCI6NDQsInN1YiI6InBvaW50fDYyOThkYjZjZGM0ZGVhMDA2OGQ4NDUyYyIsImlhdCI6MTY2NTY5OTcyOCwiZXhwIjoxNjY1Nzg2MTI4fQ.YttVK7ttQYUhGfpjR7xFSavFZirY5oJF5sW43pfxQoc";
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
        <button onclick={this.getUserWorkouts}>Get user workouts</button>
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

    PointSDK.setupHealthkitIntegration({
      queryTypes: [
        //only use this param if you want to enable the SDK for specific types, removing this will enable all types
        QueryType.HeartRate,
        QueryType.StepCount,
        QueryType.Workout,
        QueryType.ActiveEnergyBurned,
        QueryType.BasalEnergyBurned,
      ],
    });

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
    const result = await PointSDK.getInsights({ types: [InsightType.UsualWorkoutTime] });
    Application.logAndAlert(result);
  }

  async setUserGoal() {
    const result = await PointSDK.setUserGoal({ goal: Goal.AthleticPerformance });
    Application.logAndAlert(result);
  }

  async authenticateFitbit() {
    await PointSDK.authenticateFitbit({
      callbackURLScheme: "exampleapp",
      fitbitScopes: [FitbitScopes.Activity, FitbitScopes.Profile],
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
