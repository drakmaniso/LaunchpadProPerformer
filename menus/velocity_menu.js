//------------------------------------------------------------------------------

function Velocity_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

Velocity_Menu.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90 && data2 > 0) {
    }
    return ! (status == 0xb0 && data1 == 0x28 && data2 == 0x00)
}

//------------------------------------------------------------------------------


Velocity_Menu.prototype.enter = function() {
    this.screen.launchpad.mute()
    var d = this.screen.launchpad.display
    // display.set_page_button(4, 0x13)

    d.clear_pads(0x0)

    for(var y = 0; y < 8; ++y) {
        d.set_pad(y, y, 0x05)
    }
    d.set_pad(0, 0, SELECTED_OPTION_COLOR)
    d.set_pad(7, 7, SELECTED_OPTION_COLOR)
}

//------------------------------------------------------------------------------

Velocity_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(4, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
