package com.awesomeproject;

import com.facebook.react.ReactActivity;

import android.os.Bundle; // here
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
 
    @Override
  protected String getMainComponentName() {
    return "AwesomeProject";
  }
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        // you have to add it before super.onCreate
        SplashScreen.show(this, R.style.AppTheme);
        super.onCreate(savedInstanceState);
    }
}

  