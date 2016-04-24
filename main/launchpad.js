// -----------------------------------------------------------------------------

var launchpad = {

}

// -----------------------------------------------------------------------------

launchpad.init = function () {
  this.input = host.getMidiInPort(0)
  this.output = host.getMidiOutPort(0)

  this.tonic = 0
  this.scale = scales[0][0]

  this.screens = new Array(4)
  this.screens[0] = new ScreenSession()
  this.screens[1] = new ScreenNote()
  this.screens[2] = new ScreenNote()
  this.screens[3] = new ScreenNote()

  this.screens[2].mode = this.screens[2].modes[1]
  this.screens[3].mode = this.screens[3].modes[2]

  this.screen = this.screens[1]

  this.menus = new Array(8)
  this.menu = null

  this.shifted = false

  var lp = this
  this.input.setMidiCallback(function (status, data1, data2) { lp.onMidi(status, data1, data2) })
  this.input.setSysexCallback(function (data) { lp.onSysEx(data) })
  this.output.setShouldSendMidiBeatClock(true)

  this.noteInput = this.input.createNoteInput('Note', '80????', '90????', 'A0????', 'D0????')
  this.noteInput.setShouldConsumeEvents(false)
  // this.user_input = this.input.createNoteInput("User", "80????", "90????", "A0????", "D0????")
  // this.user_input.setShouldConsumeEvents(false)

  display.clearMenuButtons(0x11)
  display.clearArrowButtons(0x11)
  display.clearScreenButtons(0x11)
  display.setScreenButton(1, 0x17)
  display.clearSceneButtons(0x11)
  this.screen.enter()
}

// -----------------------------------------------------------------------------

launchpad.onMidi = function (status, data1, data2) {
  var h

  if (this.menu != null) {
    h = this.menu.onMidi(status, data1, data2)
  }

  if (!h) {
    h = this.screen.onMidi(status, data1, data2)
  }

  var s = null
  var m = null
  if (!h && status === 0xb0) {
    switch (data1) {
      // Screen Buttons

      case 0x5F:
        s = 0
        display.clearScreenButtons(0x11)
        display.setScreenButton(s, 0x12)
        break
      case 0x60:
        s = 1
        display.clearScreenButtons(0x11)
        display.setScreenButton(s, 0x17)
        break
      case 0x61:
        s = 2
        display.clearScreenButtons(0x11)
        display.setScreenButton(s, 0x19)
        break
      case 0x62:
        s = 3
        display.clearScreenButtons(0x11)
        display.setScreenButton(s, 0x15)
        break

      // Menu Buttons

      case 0x50:
        this.shifted = data2 > 0
        break
      case 0x46:
        m = 1
        break
      case 0x3c:
        m = 2
        break
      case 0x32:
        m = 3
        break
      case 0x28:
        m = 4
        break
      case 0x1e:
        m = 5
        break
      case 0x14:
        m = 6
        break
      case 0x0a:
        m = 7
        break
    }
    if (m != null) {
      if (data2 > 0 && this.menu === null && this.menus[m] != null) {
        this.menu = this.menus[m]
        this.menu.enter()
      } else if (data2 <= 0 && this.menu != null) {
        this.menu = null
        this.screen.enter()
      }
    } else if (s != null && data2 > 0) {
      if (this.screen !== this.screens[s]) {
        this.screen = this.screens[s]
        this.screen.enter()
      }
    }
    h = true
  }

  if (!h && status !== 0xa0) {
    println('Unhandled Midi Event: ' + byteToHexString(status) + ' ' + byteToHexString(data1) + ' ' + byteToHexString(data2))
  }

  return h
}

// -----------------------------------------------------------------------------

launchpad.onSysEx = function (data) {
  println('Received SysEx: ' + data)
}

// -----------------------------------------------------------------------------

launchpad.mute = function () {
  this.noteInput.setKeyTranslationTable(muteTable)
}

// -----------------------------------------------------------------------------

launchpad.unbindMenus = function () {
  for (var i = 0; i < 8; i++) {
    this.menus[i] = null
  }
  display.clearMenuButtons(0x11)
}

launchpad.bindMenu = function (button, menu) {
  this.menus[button] = menu
  if (menu != null) {
    display.setMenuButton(button, menu.color | 0x10)
  } else {
    display.setMenuButton(button, 0x11)
  }
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
