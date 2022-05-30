import Nullstack from "nullstack";
import "./Application.scss";
import { App } from "@capacitor/app";
import { registerPlugin } from "@capacitor/core";

const PointSDK = registerPlugin("PointSDK");
const token =
  "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..Vt5Vgi8vdJF00Mqj.SlqihYSJ_pWvCX8AmOXgd8PCCuM0oO1mKX_xe-nDen4PsLJMIpQ5_hpgnxvMAwkHO0sdQl673eKlPj7DZnFhfu3xLAaIU05l7PPnU5Hag9KdK6cl6sxRON31t7cplXKvdu62boTx0Nv_9TB3cUiy-9gjVno30sQ1o-CBPizf3jEmWHI8IrOGIjrR47sggjwwhc-ajJ_RWeNVBbQ7BCWUiRV73-r5J77lDlMJYThJKJbUp3c5exGei_BFxICsCHOANhA3rBNuF5I6pV9a9UaPwB1W5mQpnDTHdoNmNc2mhCESvH25Vh2PVJuKFsNNocpU8cElvV3V9A3Tebp_J9DZiNyS28S906xjcT6_e8rciwRKdJao.tVcCRbMv2zvF6bgIBcX5jA";

class Application extends Nullstack {
  async hydrate() {
    // Setup the SDK as soon as possible, before background queries
    this.setupSDK();

    // TODO remove this when new SDK version with persisted token is available
    await this.setUserToken();

    // Apple recommends setting up the background queries as soon as possible, first thing on app launch
    await this.setupBackgroundQueries();

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
        <button onclick={this.requestPermissions}>Request permissions</button>
        <br></br>
        <button onclick={this.setUserToken}>Set user token</button>
        <br></br>
        <button onclick={this.enableBackgroundDelivery}>Enable Background listeners</button>
        <br></br>
        <button onclick={this.setupBackgroundQueries}>Setup Background Queries</button>
        <br></br>
        <button onclick={this.setupStepCountBackgroundQuery}>Setup Background for stepCount</button>
        <br></br>
        <button onclick={this.enableAllForegroundListeners}>Enable foreground listeners</button>
        <br></br>
        <button onclick={this.stopAllForegroundListeners}>Stop foreground listeners</button>
        <br></br>
        <button onclick={this.getUserData}>Get user data</button>
        <br></br>
        <button onclick={this.getUserWorkouts}>Get user workouts</button>
        <br></br>
        <button onclick={this.getUserTrends}>Get user trends</button>
      </main>
    );
  }

  setupSDK() {
    PointSDK.setup({
      client_id: "clientID",
      client_secret: "clientSecret",
      environment: "development",
      query_types: ["heartRate", "stepCount", "workout", "basalEnergyBurned"], //only use this param if you want to enable the SDK for specific types, removing this will enable all types
      verbose: true,
    });
  }

  async requestPermissions() {
    await PointSDK.requestAuthorizationsIfPossible();
  }

  async enableBackgroundDelivery() {
    await PointSDK.enableAllBackgroundDelivery();
  }

  async setupBackgroundQueries() {
    await PointSDK.setupAllBackgroundQueries();
  }

  async setupStepCountBackgroundQuery() {
    await PointSDK.setupBackgroundQueryForType({ query_type: "stepCount" });
  }

  async enableAllForegroundListeners() {
    await PointSDK.enableAllForegroundListeners();
  }

  async stopAllForegroundListeners() {
    await PointSDK.stopAllForegroundListeners();
  }

  async setUserToken() {
    await PointSDK.setUserToken({
      user_token: token,
    });
  }

  async getUserData() {
    const result = await PointSDK.getUserData();
    this.logAndAlert(result);
  }

  async getUserWorkouts() {
    const result = await PointSDK.getUserWorkouts({ offset: 1 });
    this.logAndAlert(result);
  }

  async getUserTrends() {
    const result = await PointSDK.getUserTrends();
    this.logAndAlert(result);
  }

  logAndAlert(content) {
    const contentString = JSON.stringify(content, null, 2);
    console.log(contentString);
    alert(contentString);
  }
}

export default Application;
