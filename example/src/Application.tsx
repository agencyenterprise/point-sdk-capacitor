import Nullstack from "nullstack";
import "./Application.scss";
import { PointSDK, PointEnvironment, QueryType, Goal, InsightType, FitbitScopes } from "../../dist/esm";

const token =
  "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..S72rosj-3mhANzYI.petHgOJAMYlBw9uks_05Knn9mrv8gQECOYV2jzTWDcLSW999pWrfR_YgbiUb68BLs6P3jXS7uDUNbgbArmjN3VL7RDUxJJR-YLQLr-Ux_ptk7KfB13xlB4yr_-6eShlPkCOMkzUjdAeOD-sEP4xJ1dkV9DSydXgx_gFoswV94PzIBFbpiWht5mTObuE3NqVdQjmAyej7ytI2LwznbXFFf5vpdJeutC1VNlT-veQJSOLNUYSo06B2krqIaGPAchXG5QkJamwYrWXw3g3kY_xztxY9lnbZGPtOPbCsmBqZsLh_XewbFa2ARfWAkkursFtnQW6GVIbcLcFoITx3mJoxpd0ggqG4949VyylREt0qP9cL0QF0Xigu0fmpa9FpQAonvt_UA8_UqKD7wSh9iMSZ1dlXJkxl_nQhQTaqr6KLvjku9oA9_SOEclZTlsJgZ4y-b5GtkQ.CiRQb2CWg4Ztk1jsV-fI4w";
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
