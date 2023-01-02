# Nullstack Capacitor Example

## How to run this Project

### Install the dependencies:

`npm install`

### Run the app in development mode:

`npm start`

### Update `capacitor.config.json` and change the url param to your local ip address:

```json
{
  "appId": "com.example.app",
  "appName": "nullstack-capacitor-example",
  "webDir": "www",
  "bundledWebRuntime": false,
  "server": {
    "url": "http://<yourIp>:3000",
    "cleartext": true
  }
}
```

### Add the following lines to your `.env` file and include the refresh token and userId of your user account
```json
NULLSTACK_SETTINGS_REFRESH_TOKEN=<your token>
NULLSTACK_SETTINGS_USER_ID=<your user id>
```

### Update the iOS app:

`npx cap sync ios`

### Run the iOS app:

`npx cap run ios`
