//------------------------------------------------------------------------------

function ScreenNote() {
    this.modes = new Array(4)
    this.modes[0] = new ModeChromatic()
    this.modes[1] = new ModeDrum()
    this.modes[2] = new ModeInKey()
    this.modes[3] = new ModeChords()
    this.mode = this.modes[0]
	
    this.menus = new Array(8)
    this.menus[0] = null // new Shift_Menu(this)
    this.menus[1] = menuMode
    this.menus[2] = null // Undo
    this.menus[3] = null // menuLayout
    this.menus[4] = null
    this.menus[5] = menuScale
    this.menus[6] = menuRootKey
    this.menus[7] = null // Record
	this.menu = null
}

//------------------------------------------------------------------------------

ScreenNote.prototype.on_midi = function(status, data1, data2) {
    var h

	if (this.menu != null) {
		h = this.menu.on_midi(status, data1, data2)
    }

    if (!h) {
        h = this.mode.on_midi(status, data1, data2)
    }    

	if (!h && status == 0xb0) {
    	var m = null
        switch (data1) {
            case 0x50:
                m = 0
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
				this.mode.enter()
			}
            h = true
        }
    }

    return h
}

//------------------------------------------------------------------------------

ScreenNote.prototype.enter = function() {
	display.set_action_button(0, 0x11)
	display.set_action_button(1, 0x12)
	display.set_action_button(2, 0x11)
	display.set_action_button(3, 0x13)
	display.set_action_button(4, 0x15)
	display.set_action_button(5, 0x17)
	display.set_action_button(6, 0x18)
	display.set_action_button(7, 0x11)
    display.clear_page_buttons(0x11)
	this.mode.enter()
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
