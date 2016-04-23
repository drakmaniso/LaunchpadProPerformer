//------------------------------------------------------------------------------

function ScreenSession() {
    this.menus = new Array(8)
    this.menus[0] = null // new Shift_Menu(this)
    this.menus[1] = menuTempo
    this.menus[2] = null // Undo
    this.menus[3] = null // Delete
    this.menus[4] = menuQuantization
    this.menus[5] = null // Duplicate
    this.menus[6] = null // Double
    this.menus[7] = null // Record
	this.menu = null
}

//------------------------------------------------------------------------------

ScreenSession.prototype.on_midi = function(status, data1, data2) {
	var h

	var m = null
    if (status == 0xb0) {
        switch (data1) {
            case 0x5b:
                if (data2 > 0) {
                    bitwig.trackBank.scrollScenesUp()
                }    
                break
            case 0x5c:
                if (data2 > 0) {
                    bitwig.trackBank.scrollScenesDown()
                }    
                break
            case 0x5d:
                if (data2 > 0) {
                    bitwig.trackBank.scrollChannelsUp()
                }    
                break
            case 0x5e:
                if (data2 > 0) {
                    bitwig.trackBank.scrollChannelsDown()
                }    
                break
            case 0x50:
                m = 0
                if (data2 > 0) {
                    display.clearMenuButtons(0x11)
                } else {
                    display.setMenuButton(1, 0x12)
                    display.setMenuButton(4, 0x12)
                    display.setMenuButton(6, 0x13)
                }
                h = true
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
                if (data2 > 0) {
                    for (x = 0; x < 8; ++x) {
                        display.setPad(x, 1, 0x13)
                        display.setPad(x, 0, 0x12)
                    }
                    display.clearSceneButtons(0x18)
                    display.clearBottomButtons(0x18)
                } else {
                    for (x = 0; x < 8; ++x) {
                        display.setPad(x, 1, 0x00)
                        display.setPad(x, 0, 0x00)
                    }
                    display.clearSceneButtons(0x11)
                    display.clearBottomButtons(0x00)
                }
                h = true
                break
            case 0x0a:
                m = 7;
                break
        }
        if (m != null) {
			if (data2 > 0 && this.menu === null && this.menus[m] != null) {
                this.menu = this.menus[m]
                this.menu.enter()
			} else if (data2 <= 0 && this.menu != null) {
				this.menu = null
				this.enter()
			}
            h = true
        }
    }    

    return h
}

//------------------------------------------------------------------------------

ScreenSession.prototype.enter = function() {
    launchpad.mute()

    display.setScreenButton(0, 0x12)
    
	display.setMenuButton(0, 0x11)
	display.setMenuButton(1, 0x11)
	display.setMenuButton(2, 0x11)
	display.setMenuButton(3, 0x18)
	display.setMenuButton(4, 0x17)
	display.setMenuButton(5, 0x15)
	display.setMenuButton(6, 0x13)
	display.setMenuButton(7, 0x11)

    display.clearPads(0x00)

    // d.setPad(0, 7, 0x02)
    // d.setPad(0, 6, 0x02 | BLINKING_COLOR)
    // d.setPad(0, 5, 0x02)
    // d.setPad(0, 4, 0x02)

    // d.setPad(1, 7, 0x03)
    // d.setPad(1, 6, 0x03 | BLINKING_COLOR)
    // d.setPad(1, 5, 0x03)
    // d.setPad(1, 4, 0x03)
    // d.setPad(1, 3, 0x03)

    // d.setPad(2, 7, 0x04 | BLINKING_COLOR)
    // d.setPad(2, 6, 0x04)
    // d.setPad(2, 5, 0x04)

    // d.setPad(3, 6, 0x05)
    // d.setPad(3, 5, 0x05)
    // d.setPad(3, 4, 0x05)
    // d.setPad(3, 2, 0x05)

    // d.setPad(4, 6, 0x06)
    // d.setPad(4, 5, 0x06)
    // d.setPad(4, 4, 0x06 | BLINKING_COLOR)
    // d.setPad(4, 3, 0x06)

    // d.setPad(5, 7, 0x07)
    // d.setPad(5, 6, 0x07)
    // d.setPad(5, 5, 0x07)

    // d.setPad(6, 6, 0x08)
    // d.setPad(6, 5, 0x08)
    // d.setPad(6, 4, 0x08)

    // d.setPad(7, 5, 0x09)
    // d.setPad(7, 4, 0x09)
    // d.setPad(7, 3, 0x09)

    // tracks.getClipLauncherScenes().setIndication(true)    
    // tracks.scrollChannelsDown()
    // act.selectFirst()
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
