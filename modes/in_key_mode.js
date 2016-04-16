//------------------------------------------------------------------------------

function In_Key_Mode(screen) {
	this.screen = screen
}

//------------------------------------------------------------------------------

In_Key_Mode.prototype.on_midi = function(status, data1, data2) {
    // if(status == 0x90) { // Note On
    //     if (data2 > 0) {
    //         sendMidi(status, data1, 0x05)
    //     } else {
    //         sendMidi(status, data1, 0x03)
    //     }
    // }
}

//------------------------------------------------------------------------------

In_Key_Mode.prototype.enter = function() {
    var display = this.screen.launchpad.display

	this.draw_menus()	

    display.clear_pads(0x1)

    display.set_pad(0, 0, 0x3)
    display.set_pad(7, 0, 0x5)
    display.set_pad(4, 1, 0x5)
    display.set_pad(1, 2, 0x5)
    display.set_pad(5, 3, 0x7)
    display.set_pad(2, 4, 0x7)
    display.set_pad(6, 5, 0x8)
    display.set_pad(3, 6, 0x8)
    display.set_pad(0, 7, 0x8)
    display.set_pad(7, 7, 0x9)
}

//------------------------------------------------------------------------------

In_Key_Mode.prototype.draw_menus = function() {
	var d = this.screen.launchpad.display
}

//------------------------------------------------------------------------------

In_Key_Mode.prototype.leave = function() {
    var display = this.screen.launchpad.display
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
