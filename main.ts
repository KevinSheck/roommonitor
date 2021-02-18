function GetDeviceIndexBySN(SN: number): number {
    
    index = 0
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
    
    serial.writeLine("Number of Contacts:" + ("" + ("" + ContactListDevices.length)))
    _ContactNames_Index = 0
    while (_ContactNames_Index <= ContactNames.length - 1) {
        serial.writeLine("id;" + ("" + ("" + _ContactNames_Index)) + "," + "n:" + ("" + ContactNames[_ContactNames_Index]) + "," + "lastUpdate:" + ("" + ("" + ContactLastUpdate[_ContactNames_Index])))
        _ContactNames_Index += 1
    }
}

function AddOrUpdateContactByName(ContactName: string) {
    if (GetContactIndexByName(ContactName) == -1) {
        ContactNames.push(ContactName)
        ContactLastUpdate.push(RunningSeconds)
    } else {
        ContactLastUpdate[GetContactIndexByName(ContactName)] = RunningSeconds
    }
    
}

radio.onReceivedString(function on_received_string(receivedString: string) {
    basic.showString(receivedString)
    //  AddOrUpdateContact(radio.received_packet(RadioPacketProperty.SERIAL_NUMBER))
    AddOrUpdateContactByName(receivedString)
})
function GetContactIndexByName(NameToFind: string): number {
    
    _GetContactIndexByName_Index = 0
    while (_GetContactIndexByName_Index <= ContactNames.length - 1) {
        if (NameToFind == ContactNames[_GetContactIndexByName_Index]) {
            return _GetContactIndexByName_Index
        }
        
        _GetContactIndexByName_Index += 1
    }
    return -1
}

let _GetContactIndexByName_Index = 0
let _ContactNames_Index = 0
let RunningSeconds = 0
let index = 0
let ContactLastUpdate : number[] = []
let ContactListDevices : number[] = []
let ContactNames : string[] = []
ContactNames = []
radio.setGroup(1)
ContactListDevices = []
ContactLastUpdate = []
//  AddOrUpdateContactByName("kevin")
basic.forever(function on_forever() {
    
    basic.showIcon(IconNames.Square)
    PrintContactList()
    basic.pause(1000)
    RunningSeconds += 1
    basic.showIcon(IconNames.SmallSquare)
})
