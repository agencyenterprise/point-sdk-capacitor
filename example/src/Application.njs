import Nullstack from 'nullstack';
import { registerPlugin } from '@capacitor/core';
import { PointSDK } from '../../dist/esm';

//const Echo = registerPlugin('Echo');

class Application extends Nullstack {

  async echoTest() {
    const { value } = await PointSDK.echo({ value: 'Hello World!' });
    alert('Response from native:' + value);
  }

  prepare({ page }) {
    page.locale = 'en-US';
  }

  render() {
    return (
      <main>
        <button onclick={this.echoTest}> Click here to native Alert </button>
        <br></br>
      </main>
    )
  }

}

export default Application;