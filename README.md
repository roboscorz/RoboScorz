# RoboScorz
RoboScorz is a mobile React app intended to display scores, teams, and events for FIRST programs including FTC, FRC, FLL, and FLL Jr.

This project contains the [React Native](https://facebook.github.io/react-native/) client application for RoboScorz.

## Setting Up The Development Enviroment
### The Following Dependencies Are Required:
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)
- [Android Studio & Android SDK](https://developer.android.com/studio/)
- [XCode](https://developer.apple.com/xcode/)
- [Cocapods](https://cocoapods.org/)

#### Installing Node Dependencies
`$ yarn install`

#### Installing Native IOS Dependencies
`$ cd ios && pod install`

## Configuring API Keys
API keys are not stored in the GitHub repo for security purposes and must be manually added before building either the iOS or Android apps.

### iOS
1. Add a plist file named `Keys.plist` to the `ios/RoboScorz` directory.
2. Paste the following contents into the file and replace `<!--INSERT KEY HERE-->` with your own Google Maps API key.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>MAPS_API_KEY</key>
  <string><!--INSERT KEY HERE--></string>
</dict>
</plist>
```

### Android
1. Add a filed named `gradle.properties` to the `android` directory.
2. Paste the following contents into the file and replace `#INSERT KEY HERE` with your own Google Maps API key surrounded by quotes.

```
android.useDeprecatedNdk=true
MAPS_API_KEY = #INSERT KEY HERE
```

## Running The Project
1. Start the React Native bundler `$ yarn start`
2. Open the Android Studio or XCode project and click the run button

**Note:** You must open the XCode project using the XCode workspace to support Cocapods