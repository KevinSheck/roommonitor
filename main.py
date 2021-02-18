def on_button_pressed_a():
    radio.send_string("n:Kevin Sheck")
input.on_button_pressed(Button.A, on_button_pressed_a)

def AddOrUpdateContact(SN: number):
    if ContactListDevices.index(SN) == -1:
        ContactListDevices.append(SN)
        ContactLastUpdate.append(control.millis())
    else:
        ContactLastUpdate[ContactListDevices.index(SN)] = control.millis()
def GetNameFromMessage(Message: str):
    if Message.split(":")[0] == "n":
        return Message.split(":")[1]
    else:
        return "Unexepected message " + Message
def PrintContactList():
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

ContactLastUpdate: List[number] = []
ContactListDevices: List[number] = []
radio.set_group(1)
radio.set_transmit_power(7)
ContactListDevices = []
ContactLastUpdate = []

def on_forever():
    PrintContactList()
    basic.pause(6000)
basic.forever(on_forever)
