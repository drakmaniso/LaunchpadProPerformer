//------------------------------------------------------------------------------

function Chromatic_Mode(screen) {
	this.screen = screen
}

//------------------------------------------------------------------------------

Chromatic_Mode.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
        if (data2 > 0) {
            sendMidi(status, data1, 0x05)
        } else {
            sendMidi(status, data1, 0x00)
        }
    }
}

//------------------------------------------------------------------------------

Chromatic_Mode.prototype.enter = function() {
    var display = this.screen.launchpad.display

	this.draw_menus()	

    display.clear_pads(0x0)

    display.set_pad(0, 0, 0x3)
    display.set_pad(2, 0, 0x1)
    display.set_pad(4, 0, 0x1)
    display.set_pad(5, 0, 0x1)
    display.set_pad(7, 0, 0x1)
    display.set_pad(0, 1, 0x1)
    display.set_pad(2, 1, 0x1)
    display.set_pad(4, 1, 0x1)
    display.set_pad(6, 1, 0x1)
    display.set_pad(7, 1, 0x5)
    display.set_pad(1, 2, 0x1)
    display.set_pad(2, 2, 0x5)
    display.set_pad(4, 2, 0x1)
    display.set_pad(6, 2, 0x1)
    display.set_pad(7, 2, 0x1)
    display.set_pad(1, 3, 0x1)

    display.set_pad(4, 4, 0x7)
    display.set_pad(6, 6, 0x8)
    display.set_pad(1, 7, 0x8)
}

//------------------------------------------------------------------------------

Chromatic_Mode.prototype.draw_menus = function() {
	var d = this.screen.launchpad.display
}

//------------------------------------------------------------------------------

Chromatic_Mode.prototype.leave = function() {
    var display = this.screen.launchpad.display
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
