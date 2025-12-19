package com.example.mylinux
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.core.content.ContextCompat
import com.example.mylinux.ui.theme.MyLinuxTheme
import androidx.compose.material3.Button
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import androidx.core.app.ActivityCompat
import com.example.mylinux.components.ShowVisibleDevices;
import com.example.mylinux.components.ShowConnectedDevices;



class MainActivity : ComponentActivity() {

    // Use a simple state for ungranted permissions
    private var ungrantedPermissions by mutableStateOf<Array<String>>(emptyArray())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        checkPermissions()
        enableEdgeToEdge()
        setContent {
            MyLinuxTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    val modifier = Modifier.padding(innerPadding)

                    if (ungrantedPermissions.isEmpty()) {

                    } else {
                        // Pass the array directly
                        ShowNotGrantedRequest(
                            permissions = ungrantedPermissions,
                            modifier = modifier
                        )
                    }
                }
            }
        }


    }
    private fun checkPermissions() {
        val packageInfo = packageManager.getPackageInfo(packageName, PackageManager.GET_PERMISSIONS)
        val requested = packageInfo.requestedPermissions ?: emptyArray()

        // Filter the requested permissions to find those not yet granted
        val notGranted = requested.filter { permission ->
            ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED
        }.toTypedArray()

        ungrantedPermissions = notGranted
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        if (requestCode == REQUEST_BLUETOOTH) {
            val grantedPermissions = mutableListOf<String>()
            val deniedPermissions = mutableListOf<String>()

            for (i in permissions.indices) {
                if (grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                    grantedPermissions.add(permissions[i])
                } else {
                    deniedPermissions.add(permissions[i])
                }
            }

            // Update your Compose state here
            // Example: remove granted permissions from ungrantedPermissions
            ungrantedPermissions = deniedPermissions.toTypedArray()
        }
    }

}

private const val REQUEST_BLUETOOTH = 101



@Composable
fun ShowNotGrantedRequest(permissions: Array<String>, modifier: Modifier = Modifier) {
    val context = LocalContext.current
    Column(modifier = modifier) {
        Text("The following permissions are not granted:")

        permissions.forEach { permission ->
            Text(text = permission)
        }

        Button(onClick = {
            // Request the missing permissions
            ActivityCompat.requestPermissions(
                context as ComponentActivity,
                permissions,
                REQUEST_BLUETOOTH
            )

        }) {
            Text("Grant Permissions")
        }
    }
}