package com.example.mylinux.utility
import android.Manifest
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import androidx.annotation.RequiresPermission

class Bluetooth {

    private val adapter: BluetoothAdapter? = BluetoothAdapter.getDefaultAdapter()

    private val pairedDevices: Set<BluetoothDevice> = adapter?.bondedDevices ?: emptySet()

    // Function to get paired devices
    @RequiresPermission(anyOf = [Manifest.permission.BLUETOOTH_SCAN, Manifest.permission.BLUETOOTH_CONNECT])
    fun getPairedDevices(): Set<BluetoothDevice> {
        return pairedDevices
    }
}
