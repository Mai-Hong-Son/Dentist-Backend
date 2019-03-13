package vn.agiletech.ursmilesforadvisor;

import android.content.Intent;

import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.crashlytics.android.core.CrashlyticsCore;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.common.logging.FLog;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactPackage;
import com.crashlytics.android.Crashlytics;

import io.fabric.sdk.android.Fabric;

import com.horcrux.svg.SvgPackage;
import com.smixx.fabric.FabricPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.wix.interactable.Interactable;

import vn.agiletech.rnutils.RNUtilitiesPackage;
import vn.agiletech.fabricutil.ReactNativeFabricLogger;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {


    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.asList(
                new Interactable(),
                new FabricPackage(),
                new VectorIconsPackage(),
                new ImagePickerPackage(),
                new RNI18nPackage(),
                new OrientationPackage(),
                new LottiePackage(),
                new RNUtilitiesPackage(),
                new LinearGradientPackage(),
                new FastImageViewPackage(),
                new ReactNativeOneSignalPackage(),
                new SvgPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    @Override
    public void onCreate() {
        super.onCreate();

        Crashlytics crashlyticsKit = new Crashlytics.Builder()
                .core(new CrashlyticsCore.Builder().disabled(BuildConfig.DEBUG).build())
                .build();

        FLog.setLoggingDelegate(ReactNativeFabricLogger.getInstance());
        Fabric.with(this, crashlyticsKit);
    }
}
