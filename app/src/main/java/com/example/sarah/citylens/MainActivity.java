package com.example.sarah.citylens;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.pm.PackageManager;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private static final String FINE_LOCATION = Manifest.permission.ACCESS_FINE_LOCATION;
    private static final String COURSE_LOCATION = Manifest.permission.ACCESS_COARSE_LOCATION;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1234;
    private static boolean mLocationPermissionsGranted = false;
    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initWebView();
        getLocationPermission();

    }
    private void getLocationPermission() {
        String[] permissions = {Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION};

        if (ContextCompat.checkSelfPermission(this.getApplicationContext(),
                FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            if (ContextCompat.checkSelfPermission(this.getApplicationContext(),
                    COURSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                mLocationPermissionsGranted = true;
                webView.loadUrl("file:///android_asset/www/index.html");
            } else {
                ActivityCompat.requestPermissions(this,
                        permissions,
                        LOCATION_PERMISSION_REQUEST_CODE);
            }
        } else {
            ActivityCompat.requestPermissions(this,
                    permissions,
                    LOCATION_PERMISSION_REQUEST_CODE);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {

        switch (requestCode) {
            case LOCATION_PERMISSION_REQUEST_CODE: {
                if (grantResults.length > 0) {
                    for (int grantResult : grantResults) {
                        if (grantResult != PackageManager.PERMISSION_GRANTED) {
                            mLocationPermissionsGranted = false;
                            makeErrorLog("Location permission denied");
                            return;
                        }
                    }
                    mLocationPermissionsGranted = true;
                    webView.loadUrl("file:///android_asset/www/index.html");
                }
            }
        }
    }

    @Override
    public void onBackPressed() {
        if(webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

@SuppressLint("SetJavaScriptEnabled")
private void initWebView(){

    webView = findViewById(R.id.webView);
    webView.setVerticalScrollBarEnabled(false);
    webView.setHorizontalScrollBarEnabled(false);
    webView.getSettings().setJavaScriptEnabled(true);
    webView.getSettings().setAppCacheEnabled(true);
    webView.getSettings().setDatabaseEnabled(true);
    webView.getSettings().setDomStorageEnabled(true);
    webView.getSettings().setGeolocationDatabasePath(getFilesDir().getPath());
    webView.getSettings().setGeolocationEnabled(true);
    webView.setWebViewClient(new LensWebViewClient()); // Open page in Webview and not open a browser
    webView.setWebChromeClient(new LensChromeClient());

}

public static boolean getPermissionStatus(){
        return mLocationPermissionsGranted;
}
    // Simple function to display and log errors/exceptions
    public void makeErrorLog(String error) {
        Log.e("MainActivity", error);
        Toast.makeText(MainActivity.this, error, Toast.LENGTH_SHORT).show();
    }
}
