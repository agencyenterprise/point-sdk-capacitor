import Nullstack from 'nullstack';
import './Application.scss';
import { registerPlugin } from '@capacitor/core';

const PointSDK = registerPlugin('PointSDK')

class Application extends Nullstack {

  hydrate() {
    PointSDK.setup({ client_id: 'clientID', client_secret: 'clientSecret' })
  }

  prepare({ page }) {
    page.locale = 'en-US';
  }

  render() {
    return (
      <main>
        <button onclick={this.echoTest}> Click here to native Alert </button>
        <br></br>
        <button onclick={this.permissionsTest}> Click here to request permissions </button>
      </main>
    )
  }

  async echoTest() {
    const { value } = await PointSDK.echo({ value: 'Hello World!' });
    alert('Response from native:' + value);
  }

  async permissionsTest() {
    await PointSDK.requestAuthorizationsIfPossible();
  }

}

export default Application;