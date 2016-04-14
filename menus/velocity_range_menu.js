//------------------------------------------------------------------------------

function Velocity_Range_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

Velocity_Range_Menu.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
    }
}

//------------------------------------------------------------------------------


Velocity_Range_Menu.prototype.enter = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(4, 0x13)

    display.clear_pads(0x0)

    for(var y = 0; y < 8; ++y) {
        display.set_pad(3, y, 0x3)
        display.set_pad(4, y, 0x3)
    }
    for (var x = 0; x < 5; ++x) {
		display.set_pad(x, 0, SELECTED_OPTION_COLOR)
	}
    for (var x = 3; x < 8; ++x) {
		display.set_pad(x, 7, SELECTED_OPTION_COLOR)
	}
}

//------------------------------------------------------------------------------

Velocity_Range_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(4, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
