import Nullstack from "nullstack";
import "./Application.scss";
import { App } from "@capacitor/app";
import { registerPlugin } from "@capacitor/core";

const PointSDK = registerPlugin("PointSDK");
const token =
  "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9wb2ludC1hcHAtZGV2LnVzLmF1dGgwLmNvbS8ifQ..JjNHDvYhd2-1Fq2B.Z8Q7wpzUYKRR-TvK5abL7o0QnuWlvSlbQ8wGBVJsAlMMfzmrqW4KHG5qRqPgtz3MlBakTqPr3lYcxW9QHq5hIP0WHXoQyzin4bUAQcQEPgMZqhKAxcZpFac9yiyAGFsqduIGnFUM63PGye_G267vi0ANes7_Gci5-sdfepiRZzjoHs21YRx0Mf6lpV6PHQNbkSry4oeXfR_8BAj7oDE_4aPdjtaW3ZYqLRukrdF4cdUSZJaneHKkyRLph_hF6oB7MLpRIAKXLC2iBYjNvm2dCrTqRzL3qblRPVSm5EAiHP0fhdwgi4FYQmO-LeCxEcC9on_wEsP4javj6qgso7zoCjst3uCMYOscVy69RTAQWlt4bBy7.2EOqlYBrIO1pVW-1X-uLUg";

class Application extends Nullstack {
  async hydrate() {
    // Setup the SDK as soon as possible, before background queries
    await this.setupSDK();

    //TODO remove this when new SDK version with persisted token is available
    await this.setUserToken();

    // Apple recommends setting up the background queries as soon as possible, first thing on app launch
    await this.setupBackgroundQueries();

    //enable/disable foreground listeners on app state change
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

        <button onclick={this.setupStepCountBackgroundQuery}>Setup Background for stepCounttt</button>
      </main>
    );
  }

  async setupSDK() {
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
}

export default Application;
