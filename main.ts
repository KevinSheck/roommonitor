function AddOrUpdateContact(SN: number) {
    if (_py.py_array_index(ContactListDevices, SN) == -1) {
        ContactListDevices.push(SN)
        ContactLastUpdate.push(RunningSeconds)
    } else {
        ContactLastUpdate[_py.py_array_index(ContactListDevices, SN)] = RunningSeconds
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
    let index: number;
    
    _PrintContactList_ID = 0
    while (_PrintContactList_ID <= ContactListDevices.length - 1) {
        index = 0
        serial.writeLine("id;" + ("" + ("" + _PrintContactList_ID)) + "," + "sn:" + ("" + ("" + ContactListDevices[index])) + "," + "lastUpdate:" + ("" + ("" + ContactLastUpdate[index])))
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
    serial.writeLine("RunningSeconds:" + ("" + ("" + RunningSeconds)))
    PrintContactList()
    basic.pause(5000)
})
control.inBackground(function on_in_background() {
    
    basic.pause(1000)
    RunningSeconds += 1
})
