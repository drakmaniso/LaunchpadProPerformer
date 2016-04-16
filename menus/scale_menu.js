//------------------------------------------------------------------------------

function Scale_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

Scale_Menu.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
    }
}

//------------------------------------------------------------------------------

Scale_Menu.prototype.enter = function() {
    this.screen.launchpad.mute()
    var display = this.screen.launchpad.display
    // display.set_page_button(6, 0x17)

    display.clear_pads(0x0)

    for(var x = 0; x < 7; ++x) {
        display.set_pad(x, 7, 0x8)
        display.set_pad(x, 5, 0x8)
    }
    display.set_pad(4, 7, 0x0)
    for(var y = 4; y < 5; ++y) {
        for(var x = 0; x < 8; ++x) {
            display.set_pad(x, y, 0x8)
        }
    }

    display.set_pad(0, 0, 0x3)
    display.set_pad(1, 0, 0x8)
    display.set_pad(2, 0, 0x1)
    display.set_pad(3, 0, 0x8)
    display.set_pad(4, 0, 0x1)
    display.set_pad(0, 1, 0x1)
    display.set_pad(1, 1, 0x8)
    display.set_pad(2, 1, 0x1)
    display.set_pad(3, 1, 0x8)
    display.set_pad(4, 1, 0x1)
    display.set_pad(0, 2, 0x8)
    display.set_pad(1, 2, 0x1)
    display.set_pad(2, 2, 0x3)

    display.set_pad(0, 7, SELECTED_OPTION_COLOR)
    display.set_pad(0, 5, SELECTED_OPTION_COLOR)
}

//------------------------------------------------------------------------------

Scale_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(6, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
