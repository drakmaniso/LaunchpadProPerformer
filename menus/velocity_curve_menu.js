//------------------------------------------------------------------------------

function Velocity_Curve_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

Velocity_Curve_Menu.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
    }
}

//------------------------------------------------------------------------------


Velocity_Curve_Menu.prototype.enter = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(4, 0x13)

    display.clear_pads(0x0)

    for(var y = 0; y < 8; ++y) {
        display.set_pad(y, y, 0x3)
    }
}

//------------------------------------------------------------------------------

Velocity_Curve_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(4, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
