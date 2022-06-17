import Nullstack from "nullstack";
import "./Application.scss";
import { App } from "@capacitor/app";
import { PointSDK, PointEnvironment, QueryType, Goal } from "../../dist/esm";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOiJQb2ludCIsIm9yZ0lkIjo0Mywic3ViIjoicG9pbnR8NjI4NjkwNmU3NDk0MWUwMDZlNjE3ZGJjIiwiaWF0IjoxNjU0NjIxOTUzLCJleHAiOjE2NTQ3MDgzNTN9.S39kJWD2bGOJiAyOYioKNlB7vNa0JK7NcDO3B9Z3rWg";

class Application extends Nullstack {
  async hydrate() {
    // Setup the SDK as soon as possible, before background queries
    this.setupSDK();

    // Apple recommends setting up the background queries as soon as possible, first thing on app launch
    await this.startBackgroundListeners();

    // enable/disable foreground listeners on app state change
    App.addListener("appStateChange", ({ isActive }) => {
      if (isActive) {
        this.enableAllForegroundListeners();
      } else {
        this.stopAllForegroundListeners();
      }
    });
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
        <button onclick={this.getUserTrends}>Get user trends</button>
        <br></br>
        <button onclick={this.getUserDailyHistory}>Get daily history</button>
        <br></br>
        <button onclick={this.getUserHealthMetrics}>Get health metrics</button>
      </main>
    );
  }

  setupSDK() {
    PointSDK.setup({
      clientId: "clientID",
      clientSecret: "clientSecret",
      environment: PointEnvironment.Development,
      queryTypes: [
        //only use this param if you want to enable the SDK for specific types, removing this will enable all types
        QueryType.HeartRate,
        QueryType.StepCount,
        QueryType.Workout,
        QueryType.ActiveEnergyBurned,
        QueryType.BasalEnergyBurned,
      ],
      verbose: true,
    });
  }

  async requestPermissions() {
    await PointSDK.requestAuthorizationsIfPossible();
  }

  async startBackgroundListeners() {
    await PointSDK.startAllBackgroundListeners();
  }

  async enableAllForegroundListeners() {
    await PointSDK.enableAllForegroundListeners();
  }

  async stopAllForegroundListeners() {
    await PointSDK.stopAllForegroundListeners();
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

  async getUserTrends() {
    const result = await PointSDK.getUserTrends();
    Application.logAndAlert(result);
  }

  async getUserRecommendations() {
    const result = await PointSDK.getUserRecommendations();
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

  async setUserGoal() {
    const result = await PointSDK.setUserGoal({ goal: Goal.AthleticPerformance });
    Application.logAndAlert(result);
  }

  static logAndAlert(content) {
    const json = JSON.stringify(content, null, 2);
    console.log(json);
    alert(json);
  }
}

export default Application;
