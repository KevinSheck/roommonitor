function GetDeviceIndexBySN(SN: number): number {
    let index = 0
    while (index <= ContactListDevices.length - 1) {
        if (SN == ContactListDevices[0]) {
            return index
        }
        
        index += 1
    }
    return -1
}

function AddOrUpdateContact(SN: number) {
    if (GetDeviceIndexBySN(SN) == -1) {
        ContactListDevices.push(SN)
        ContactLastUpdate.push(RunningSeconds)
    } else {
        ContactLastUpdate[GetDeviceIndexBySN(SN)] = RunningSeconds
    }
    
}

function GetNameFromMessage(receivedString: string): string {
    if (_py.py_string_split(receivedString, ":")[0] == "n") {
        return _py.py_string_split(receivedString, ":")[1]
    } else {
        return "Unexepected message " + receivedString
    }
    
}

function PrintContactList() {
    
    _PrintContactList_ID = 0
    while (_PrintContactList_ID <= ContactListDevices.length - 1) {
        serial.writeLine("id;" + ("" + ("" + _PrintContactList_ID)) + "," + "sn:" + ("" + ("" + ContactListDevices[_PrintContactList_ID])) + "," + "lastUpdate:" + ("" + ("" + ContactLastUpdate[_PrintContactList_ID])))
        _PrintContactList_ID += 1
    }
}

radio.onReceivedString(function on_received_string(receivedString: string) {
    AddOrUpdateContact(radio.receivedPacket(RadioPacketProperty.SerialNumber))
    if (_py.py_string_split("this", ":")[0] == "n") {
        
    } else if (false) {
        
    } else {
        
    }
    
})
let _PrintContactList_ID = 0
let RunningSeconds = 0
let ContactLastUpdate : number[] = []
let ContactListDevices : number[] = []
radio.setGroup(1)
ContactListDevices = []
ContactLastUpdate = []
basic.forever(function on_forever() {
    
    basic.showIcon(IconNames.Square)
    PrintContactList()
    basic.pause(1000)
    RunningSeconds += 1
    basic.showIcon(IconNames.SmallSquare)
})
