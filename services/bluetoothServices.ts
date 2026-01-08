import { BleManager, Device } from "react-native-ble-plx";

class BluetoothService {
    bluetoothManager: BleManager;

    constructor() {
        this.bluetoothManager = new BleManager();
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
    getBluetoothManager() :BleManager{
        return this.bluetoothManager;
    }
    
    destroy(){
        this.bluetoothManager.destroy();
    }
}

const bluetoothService = new BluetoothService();

export default bluetoothService;