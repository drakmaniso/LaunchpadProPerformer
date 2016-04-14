//------------------------------------------------------------------------------

function Drums_Mode(screen) {
	this.screen = screen
}

//------------------------------------------------------------------------------

Drums_Mode.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
        if (data2 > 0) {
            sendMidi(status, data1, 0x05)
        } else {
            sendMidi(status, data1, 0x0D)
        }
    }
}

//------------------------------------------------------------------------------

Drums_Mode.prototype.enter = function() {
    var display = this.screen.launchpad.display

	this.draw_menus()	

    display.clear_pads(0x0)

    for(var y = 0; y < 4; ++y) {
        for(var x = 0; x < 4; ++x) {
            display.set_pad(x, y, 0x3)
        }
    }
    for(var y = 0; y < 4; ++y) {
        for(var x = 4; x < 8; ++x) {
            display.set_pad(x, y, 0x5)
        }
    }
    for(var y = 4; y < 8; ++y) {
        for(var x = 0; x < 4; ++x) {
            display.set_pad(x, y, 0x7)
        }
    }
    for(var y = 4; y < 8; ++y) {
        for(var x = 4; x < 8; ++x) {
            display.set_pad(x, y, 0x8)
        }
    }
}

//------------------------------------------------------------------------------

Drums_Mode.prototype.draw_menus = function() {
	var d = this.screen.launchpad.display
	d.set_page_button(0, 0x12)
	d.set_page_button(1, 0x13)
	d.set_page_button(2, 0x13)
	d.set_page_button(3, 0x00)
	d.set_page_button(4, 0x00)
	d.set_page_button(5, 0x00)
	d.set_page_button(6, 0x00)
	d.set_page_button(7, 0x00)
}

//------------------------------------------------------------------------------

Drums_Mode.prototype.leave = function() {
    var display = this.screen.launchpad.display
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
