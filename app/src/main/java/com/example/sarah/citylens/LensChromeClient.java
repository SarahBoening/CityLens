package com.example.sarah.citylens;

import android.webkit.GeolocationPermissions;

public class LensChromeClient extends android.webkit.WebChromeClient {
    @Override
    public void onGeolocationPermissionsShowPrompt(final String origin,
                                                   final GeolocationPermissions.Callback callback) {

        if (MainActivity.getPermissionStatus())
            callback.invoke(origin, true, true);
        else
            callback.invoke(origin, false, false);
    }
}