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
    "url": "http://192.168.15.39:3000",
    "cleartext": true
  }
}
```

### Update the iOS app:

`npx cap sync ios`

### Run the iOS app:

`npx cap run ios`
