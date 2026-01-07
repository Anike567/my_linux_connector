import { BleManager, Device } from "react-native-ble-plx";

class BluetoothService {
    bluetoothManager: BleManager;

    constructor() {
        this.bluetoothManager = new BleManager();
    }

    scanDevices(timeOut = 5000): Promise<Device[]> {
        return new Promise((resolve, reject) => {
            const devices = new Map<String, Device>();

            this.bluetoothManager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    console.log(error);
                    this.bluetoothManager.stopDeviceScan();
                    reject(error);
                    return;
                }

                if (device) {
                    devices.set(device.id, device);
                }
            });

            setTimeout(() => {
                this.bluetoothManager.stopDeviceScan();
                resolve(Array.from(devices.values()));
            }, timeOut);
        });
    }

    async connectToDevice(device : Device) : Promise<Device> {
        try{
            const connectDevice = await device.connect();
            await connectDevice.discoverAllServicesAndCharacteristics();
            return connectDevice;
        }
        catch(error){
            throw error;
        }
    }

    destroy(){
        this.bluetoothManager.destroy();
    }
}

const bluetoothService = new BluetoothService();

export default bluetoothService;