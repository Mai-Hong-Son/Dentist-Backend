# Mobile Application Kit

Best performance starter kit to building app with React Native.

**Agiletech Vietnam** all rights reversed

## Supported platform

* Android 4.4+
* iOS 9.0+

## Features

* i18n
* redux
* saga
* react native navigation
* redux persist
* image picker
* native base
* orientation
* fabric crashlytics
* fabric enhancer
* detox automation test

## Configs

Recommend store all config in `/src/constant` like `api endpoint` etc...

Alternate solution [`react-native-config`](https://github.com/luggit/react-native-config)

#### Fabric Crashlytics

Already setup, you just have to change key in `Info.plist` and `AndroidManifest.xml`, change key in `run script ios project`

## Drawer navigate issue

At Drawer Menu, you guys have to use `deeplink` to navigate to another screen, i already setup `handle deeplink` at `src/container/Home/index.js`, explain bellow:

```
#guyca:

Each screen has a unique navigator instance. Actions you perform on a navigator relate to the screen it's attached to.
The side menu isn't exactly a screen, It's registered as one but not perceived as such, that's why you need to use deep links and handle the deep link in the appropriate screen. Home it's clearer now
```

## Generate APK

```
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

## Generate icon and splash screen

We already have **assets/design/icon_splash.sketch** template file

```
// install tool
brew install imagemagick
npm install -g yo generator-rn-toolbox

// generate splash screen images
yo rn-toolbox:assets --icon icon.png --splash splash.png --store
```

* splash.png: square 2048x2048
* icon.png: square 512x512

## Integrate Map

Guide [here](https://github.com/anhtuank7c/maps-example)

## Automation test

We're using [detox](https://github.com/wix/detox/blob/master/docs/Introduction.GettingStarted.md)

### Setup Detox

```
brew tap wix/brew
brew install applesimutils
npm install -g detox-cli
```

### Build and run test

```
detox build -c ios.sim.debug
detox test -c ios.sim.debug
```

### Write test case

Write test in `e2e/firstTest.spec.js`


