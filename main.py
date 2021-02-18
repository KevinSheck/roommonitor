def GetDeviceIndexBySN(SN: number):
    global index
    index = 0
    while index <= len(ContactListDevices) - 1:
        if SN == ContactListDevices[0]:
            return index
        index += 1
    return -1
def AddOrUpdateContact(SN: number):
    if GetDeviceIndexBySN(SN) == -1:
        ContactListDevices.append(SN)
        ContactLastUpdate.append(RunningSeconds)
    else:
        ContactLastUpdate[GetDeviceIndexBySN(SN)] = RunningSeconds
def GetNameFromMessage(receivedString: str):
    if receivedString.split(":")[0] == "n":
        return receivedString.split(":")[1]
    else:
        return "Unexepected message " + receivedString
def PrintContactList():
    global _ContactNames_Index
    serial.write_line("Number of Contacts:" + ("" + str(len(ContactListDevices))))
    _ContactNames_Index = 0
    while _ContactNames_Index <= len(ContactNames) - 1:
        serial.write_line("id;" + ("" + str(_ContactNames_Index)) + "," + "n:" + ("" + ContactNames[_ContactNames_Index]) + "," + "lastUpdate:" + ("" + str(ContactLastUpdate[_ContactNames_Index])))
        _ContactNames_Index += 1
def AddOrUpdateContactByName(ContactName: str):
    if GetContactIndexByName(ContactName) == -1:
        ContactNames.append(ContactName)
        ContactLastUpdate.append(RunningSeconds)
    else:
        ContactLastUpdate[GetContactIndexByName(ContactName)] = RunningSeconds

def on_received_string(receivedString):
    basic.show_string(receivedString)
    # AddOrUpdateContact(radio.received_packet(RadioPacketProperty.SERIAL_NUMBER))
    AddOrUpdateContactByName(receivedString)
radio.on_received_string(on_received_string)

def GetContactIndexByName(NameToFind: str):
    global _GetContactIndexByName_Index
    _GetContactIndexByName_Index = 0
    while _GetContactIndexByName_Index <= len(ContactNames) - 1:
        if NameToFind == ContactNames[_GetContactIndexByName_Index]:
            return _GetContactIndexByName_Index
        _GetContactIndexByName_Index += 1
    return -1
_GetContactIndexByName_Index = 0
_ContactNames_Index = 0
RunningSeconds = 0
index = 0
ContactLastUpdate: List[number] = []
ContactListDevices: List[number] = []
ContactNames: List[str] = []
ContactNames = []
radio.set_group(1)
ContactListDevices = []
ContactLastUpdate = []

def on_forever():
    global RunningSeconds
    basic.show_icon(IconNames.SQUARE)
    PrintContactList()
    basic.pause(1000)
    RunningSeconds += 1
    basic.show_icon(IconNames.SMALL_SQUARE)
    # AddOrUpdateContactByName("kevin")
basic.forever(on_forever)
