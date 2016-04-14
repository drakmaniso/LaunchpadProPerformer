//------------------------------------------------------------------------------

function Velocity_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

Velocity_Menu.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
    }
}

//------------------------------------------------------------------------------


Velocity_Menu.prototype.enter = function() {
    var d = this.screen.launchpad.display
    // display.set_page_button(4, 0x13)

    d.clear_pads(0x0)

    for(var y = 0; y < 8; ++y) {
        d.set_pad(y, y, 0x03)
    }
    d.set_pad(0, 0, 0x02)
    d.set_pad(7, 7, 0x02)
}

//------------------------------------------------------------------------------

Velocity_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(4, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
