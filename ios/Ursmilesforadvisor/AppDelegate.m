/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>
#import "RCCManager.h"
#import <React/RCTRootView.h>
#import "Orientation.h"
// #import <Firebase.h>
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>
#import <asl.h>
#import <React/RCTLog.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  
  //   [FIRApp configure];
  #ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
  // Logging
  [Fabric with:@[[Crashlytics class]]];
  
  RCTSetLogThreshold(RCTLogLevelInfo);
  RCTSetLogFunction(CrashlyticsReactLogFunction);
  return YES;
}
// OpenURL
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary *)options {
//   // facebook
//   if ([[FBSDKApplicationDelegate sharedInstance] application:app
//                                                           openURL:url
//                                                 sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
//                                                   annotation:options[UIApplicationOpenURLOptionsAnnotationKey]]) {
//     return YES;
//   }
//   // google
//   if ([[GIDSignIn sharedInstance] handleURL:url
//                                sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
//                                  annotation:options[UIApplicationOpenURLOptionsAnnotationKey]]) {
//     return YES;
//   }

  NSString* stringURL = [url absoluteString];
  // deeplink
  if (([stringURL hasPrefix:@"sg.ursmiles.urDentist://"] == YES) &&
      [RCTLinkingManager application:app
                             openURL:url
                   sourceApplication:nil
                          annotation:nil]) {
    return YES;
  }
//   // LINE
//   if([[LineSDKLogin sharedInstance] handleOpenURL:url]) {
//     return YES;
//   }
  
  return NO;
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

RCTLogFunction CrashlyticsReactLogFunction = ^(
                                         RCTLogLevel level,
                                         __unused RCTLogSource source,
                                         NSString *fileName,
                                         NSNumber *lineNumber,
                                         NSString *message
                                         )
{
    NSString *log = RCTFormatLog([NSDate date], level, fileName, lineNumber, message);

    #ifdef DEBUG
        fprintf(stderr, "%s\n", log.UTF8String);
        fflush(stderr);
    #else
        CLS_LOG(@"REACT LOG: %s", log.UTF8String);
    #endif
    
    int aslLevel;
    switch(level) {
        case RCTLogLevelTrace:
            aslLevel = ASL_LEVEL_DEBUG;
            break;
        case RCTLogLevelInfo:
            aslLevel = ASL_LEVEL_NOTICE;
            break;
        case RCTLogLevelWarning:
            aslLevel = ASL_LEVEL_WARNING;
            break;
        case RCTLogLevelError:
            aslLevel = ASL_LEVEL_ERR;
            break;
        case RCTLogLevelFatal:
            aslLevel = ASL_LEVEL_CRIT;
            break;
    }
    asl_log(NULL, NULL, aslLevel, "%s", message.UTF8String);  
};
@end
