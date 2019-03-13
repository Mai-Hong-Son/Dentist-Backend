package vn.agiletech.ursmilesforadvisor;

import android.view.View;
import android.content.Intent;
import android.content.res.Configuration;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
  @Override
  public View createSplashLayout() {
    return new View(this);
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }
}
