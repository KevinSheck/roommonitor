input.onButtonPressed(Button.A, function () {
    radio.sendString("n:Kevin Sheck")
})
function AddOrUpdateContact (SN: number) {
    if (_py.py_array_index(ContactListDevices, SN) == -1) {
        ContactListDevices.push(SN)
        ContactLastUpdate.push(control.millis())
    } else {
        ContactLastUpdate[_py.py_array_index(ContactListDevices, SN)] = control.millis()
    }
}
function GetNameFromMessage (Message: string) {
    if (_py.py_string_split(Message, ":")[0] == "n") {
        return _py.py_string_split(Message, ":")[1]
    } else {
        return "Unexepected message " + Message
    }
}
function PrintContactList () {
    for (let _PrintContactList_ID = 0; _PrintContactList_ID <= ContactListDevices.length - 1; _PrintContactList_ID++) {
        let index = 0
        serial.writeLine("id;" + ("" + _PrintContactList_ID) + "," + "sn:" + ("" + ContactListDevices[index]) + "," + "lastUpdate:" + ("" + ContactLastUpdate[index]))
    }
}
radio.onReceivedString(function (receivedString) {
    AddOrUpdateContact(radio.receivedPacket(RadioPacketProperty.SerialNumber))
    if (_py.py_string_split("this", ":")[0] == "n") {
    	
    } else if (false) {
    	
    } else {
    	
    }
})
let ContactLastUpdate: number[] = []
let ContactListDevices : number[] = []
radio.setGroup(1)
radio.setTransmitPower(7)
ContactListDevices = []
ContactLastUpdate = []
basic.forever(function () {
    PrintContactList()
    basic.pause(6000)
})
