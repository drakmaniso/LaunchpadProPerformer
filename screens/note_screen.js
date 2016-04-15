load("../modes/drums_mode.js")
load("../modes/chromatic_mode.js")
load("../modes/in_key_mode.js")
load("../modes/chords_mode.js")
load("../menus/mode_menu.js")
load("../menus/velocity_menu.js")
load("../menus/key_menu.js")
load("../menus/scale_menu.js")
load("../menus/voicing_menu.js")

//------------------------------------------------------------------------------

function Note_Screen(launchpad, is_secondary) {
	this.launchpad = launchpad
    this.is_secondary = is_secondary

    this.modes = new Array(4)
    this.modes[0] = new Chromatic_Mode(this)
    this.modes[1] = new Drums_Mode(this)
    this.modes[2] = new In_Key_Mode(this)
    this.modes[3] = new Chords_Mode(this)
    this.mode = this.modes[0]
    if (is_secondary) {
        this.mode = this.modes[1]
    }
	
    this.menus = new Array(8)
    this.menus[0] = null // new Shift_Menu(this)
    this.menus[1] = new Mode_Menu(this)
    this.menus[2] = null // Undo
    this.menus[3] = new Voicing_Menu(this)
    this.menus[4] = new Velocity_Menu(this)
    this.menus[5] = new Key_Menu(this)
    this.menus[6] = new Scale_Menu(this)
    this.menus[7] = null // Record
	this.menu = null
}

//------------------------------------------------------------------------------

Note_Screen.prototype.on_midi = function(status, data1, data2) {
    var h

	if (this.menu != null) {
		h = this.menu.on_midi(status, data1, data2)
    }

    h = this.mode.on_midi(status, data1, data2)

	var m = null
	if (!h && status == 0xb0) {
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
				this.menu.leave()
				this.menu = null
				this.mode.enter()
			}
            h = true
        }
    }

    return h
}

//------------------------------------------------------------------------------

Note_Screen.prototype.enter = function() {
    var d = this.launchpad.display
    if(this.is_secondary) {
        d.set_screen_button(3, 0x15)
    } else {
        d.set_screen_button(1, 0x17)
    }
	d.set_action_button(0, 0x11)
	d.set_action_button(1, 0x17)
	d.set_action_button(2, 0x11)
	d.set_action_button(3, 0x15)
	d.set_action_button(4, 0x13)
	d.set_action_button(5, 0x18)
	d.set_action_button(6, 0x18)
	d.set_action_button(7, 0x11)
	this.mode.enter()
}

//------------------------------------------------------------------------------

Note_Screen.prototype.leave = function() {
    if(this.is_secondary) {
        this.launchpad.display.set_screen_button(3, 0x11)
    } else {
        this.launchpad.display.set_screen_button(1, 0x11)
    }
	this.mode.leave()
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
