load("../menus/tempo_menu.js")
load("../menus/quantization_menu.js")

//------------------------------------------------------------------------------

function Session_Screen(launchpad) {
	this.launchpad = launchpad
	
    this.menus = new Array(8)
    this.menus[0] = null // new Shift_Menu(this)
    this.menus[1] = new Tempo_Menu(this)
    this.menus[2] = null // Undo
    this.menus[3] = null // Delete
    this.menus[4] = new Quantization_Menu(this)
    this.menus[5] = null // Duplicate
    this.menus[6] = null // Double
    this.menus[7] = null // Record
	this.menu = null
}

//------------------------------------------------------------------------------

Session_Screen.prototype.on_midi = function(status, data1, data2) {
	var h

	var d = this.launchpad.display	
	var b = this.launchpad.bitwig	

	var m = null
    if (status == 0xb0) {
        switch (data1) {
            case 0x5b:
                if (data2 > 0) {
                    b.trackBank.scrollScenesUp()
                }    
                break
            case 0x5c:
                if (data2 > 0) {
                    b.trackBank.scrollScenesDown()
                }    
                break
            case 0x5d:
                if (data2 > 0) {
                    b.trackBank.scrollChannelsUp()
                }    
                break
            case 0x5e:
                if (data2 > 0) {
                    b.trackBank.scrollChannelsDown()
                }    
                break
            case 0x50:
                m = 0
                if (data2 > 0) {
                    d.clear_action_buttons(0x11)
                } else {
                    d.set_action_button(1, 0x12)
                    d.set_action_button(4, 0x12)
                    d.set_action_button(6, 0x13)
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
                        d.set_pad(x, 1, 0x13)
                        d.set_pad(x, 0, 0x12)
                    }
                    d.clear_page_buttons(0x18)
                    d.clear_scene_buttons(0x18)
                } else {
                    for (x = 0; x < 8; ++x) {
                        d.set_pad(x, 1, 0x00)
                        d.set_pad(x, 0, 0x00)
                    }
                    d.clear_page_buttons(0x11)
                    d.clear_scene_buttons(0x00)
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
				this.menu.leave()
				this.menu = null
				this.enter()
			}
            h = true
        }
    }    

    return h
}

//------------------------------------------------------------------------------

Session_Screen.prototype.enter = function() {
    this.launchpad.mute()
    var d = this.launchpad.display

    d.set_screen_button(0, 0x12)
    
	d.set_action_button(0, 0x11)
	d.set_action_button(1, 0x11)
	d.set_action_button(2, 0x11)
	d.set_action_button(3, 0x18)
	d.set_action_button(4, 0x17)
	d.set_action_button(5, 0x15)
	d.set_action_button(6, 0x13)
	d.set_action_button(7, 0x11)

    d.clear_pads(0x00)

    // d.set_pad(0, 7, 0x02)
    // d.set_pad(0, 6, 0x02 | BLINKING_COLOR)
    // d.set_pad(0, 5, 0x02)
    // d.set_pad(0, 4, 0x02)

    // d.set_pad(1, 7, 0x03)
    // d.set_pad(1, 6, 0x03 | BLINKING_COLOR)
    // d.set_pad(1, 5, 0x03)
    // d.set_pad(1, 4, 0x03)
    // d.set_pad(1, 3, 0x03)

    // d.set_pad(2, 7, 0x04 | BLINKING_COLOR)
    // d.set_pad(2, 6, 0x04)
    // d.set_pad(2, 5, 0x04)

    // d.set_pad(3, 6, 0x05)
    // d.set_pad(3, 5, 0x05)
    // d.set_pad(3, 4, 0x05)
    // d.set_pad(3, 2, 0x05)

    // d.set_pad(4, 6, 0x06)
    // d.set_pad(4, 5, 0x06)
    // d.set_pad(4, 4, 0x06 | BLINKING_COLOR)
    // d.set_pad(4, 3, 0x06)

    // d.set_pad(5, 7, 0x07)
    // d.set_pad(5, 6, 0x07)
    // d.set_pad(5, 5, 0x07)

    // d.set_pad(6, 6, 0x08)
    // d.set_pad(6, 5, 0x08)
    // d.set_pad(6, 4, 0x08)

    // d.set_pad(7, 5, 0x09)
    // d.set_pad(7, 4, 0x09)
    // d.set_pad(7, 3, 0x09)

    // tracks.getClipLauncherScenes().setIndication(true)    
    // tracks.scrollChannelsDown()
    // act.selectFirst()
}

//------------------------------------------------------------------------------

Session_Screen.prototype.leave = function() {
    //Screen.prototype.leave.call(this)
    this.launchpad.display.set_screen_button(0, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
