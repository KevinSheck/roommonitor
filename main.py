def AddOrUpdateContact(SN: number):
    if ContactListDevices.index(SN) == -1:
        ContactListDevices.append(SN)
        ContactLastUpdate.append(RunningSeconds)
    else:
        ContactLastUpdate[ContactListDevices.index(SN)] = RunningSeconds
def GetNameFromMessage(receivedString: str):
    if receivedString.split(":")[0] == "n":
        return receivedString.split(":")[1]
    else:
        return "Unexepected message " + receivedString
def PrintContactList():
    global _PrintContactList_ID
    _PrintContactList_ID = 0
    while _PrintContactList_ID <= len(ContactListDevices) - 1:
        index = 0
        serial.write_line("id;" + ("" + str(_PrintContactList_ID)) + "," + "sn:" + ("" + str(ContactListDevices[index])) + "," + "lastUpdate:" + ("" + str(ContactLastUpdate[index])))
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
    serial.write_line("RunningSeconds:" + ("" + str(RunningSeconds)))
    PrintContactList()
    basic.pause(5000)
basic.forever(on_forever)

def on_in_background():
    global RunningSeconds
    basic.pause(1000)
    RunningSeconds = RunningSeconds + 1
control.in_background(on_in_background)
