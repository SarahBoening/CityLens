package com.example.sarah.citylens;

import android.annotation.SuppressLint;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initWebView();

    }

    @Override
    public void onBackPressed() {
        if(webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

private void initWebView(){

    webView = findViewById(R.id.webView);
    //Allow JavaScript
    webView.getSettings().setJavaScriptEnabled(true);
    // Force Webview to open page and not open a browser
    webView.setWebViewClient(new LensWebViewClient());
    webView.loadUrl("file:///android_asset/www/index.html");
}

    // Simple function to display and log errors/exceptions
    public void makeErrorLog(String error) {
        Log.e("MainActivity", error);
        Toast.makeText(MainActivity.this, error, Toast.LENGTH_SHORT).show();
    }
}
