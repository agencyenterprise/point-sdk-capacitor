package com.example.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

import co.areyouonpoint.pointsdk.capacitor.PointSDK;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(PointSDK.class);
        super.onCreate(savedInstanceState);
    }
}
