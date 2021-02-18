def GetDeviceIndexBySN(SN: number):
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
    global _PrintContactList_ID
    _PrintContactList_ID = 0
    while _PrintContactList_ID <= len(ContactListDevices) - 1:
        serial.write_line("id;" + ("" + str(_PrintContactList_ID)) + "," + "sn:" + ("" + str(ContactListDevices[_PrintContactList_ID])) + "," + "lastUpdate:" + ("" + str(ContactLastUpdate[_PrintContactList_ID])))
        _PrintContactList_ID += 1

def on_received_string(receivedString):
    AddOrUpdateContact(radio.received_packet(RadioPacketProperty.SERIAL_NUMBER))
    if "this".split(":")[0] == "n":
        pass
    elif False:
        pass
    else:
        pass
radio.on_received_string(on_received_string)

_PrintContactList_ID = 0
RunningSeconds = 0
ContactLastUpdate: List[number] = []
ContactListDevices: List[number] = []
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
basic.forever(on_forever)
