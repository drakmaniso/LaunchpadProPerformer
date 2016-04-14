load("screen.js")
load("../modes/drums_mode.js")
load("../modes/chromatic_mode.js")
load("../modes/in_key_mode.js")
load("../modes/chords_mode.js")
load("../menus/mode_menu.js")
load("../menus/velocity_range_menu.js")
load("../menus/velocity_curve_menu.js")
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
	
    this.menus = new Array(8)
    this.menus[0] = new Mode_Menu(this)
    this.menus[1] = new Velocity_Range_Menu(this)
    this.menus[2] = new Velocity_Curve_Menu(this)
    this.menus[3] = new Key_Menu(this)
    this.menus[4] = new Scale_Menu(this)
    this.menus[5] = new Voicing_Menu(this)
    this.menus[6] = null
    this.menus[7] = null
	this.menu = null
}

//------------------------------------------------------------------------------

Note_Screen.prototype.on_midi = function(status, data1, data2) {
	var m
    var h

	if (this.menu != null) {
		h = this.menu.on_midi(status, data1, data2)
	}

	if (!h && status == 0xb0) {
        switch (data1) {
            case 0x59:
                m = 0
                break
            case 0x4F:
                m = 1
                break
            case 0x45:
                m = 2
                break
            case 0x3B:
                m = 3
                break
            case 0x31:
                m = 4
                break;
            case 0x27:
                m = 5
                break
            case 0x1D:
                //m = 6
                break
            case 0x13:
                //m = 7
                break
            default:
        }
        if (m != null) {
			if (data2 > 0 && this.menu === null) {
				if (
					m <= 2
					|| (m <= 4 && this.mode != this.modes[1])
					|| (m == 5 && this.mode === this.modes[3])
				) {
					this.menu = this.menus[m]
					this.menu.enter()
				}
			} else if (data2 <= 0) {
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
        d.set_screen_button(2, 0x15)
    } else {
        d.set_screen_button(1, 0x17)
    }
	this.mode.enter()
}

//------------------------------------------------------------------------------

Note_Screen.prototype.leave = function() {
    if(this.is_secondary) {
        this.launchpad.display.set_screen_button(2, 0x11)
    } else {
        this.launchpad.display.set_screen_button(1, 0x11)
    }
	this.mode.leave()
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
