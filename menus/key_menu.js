//------------------------------------------------------------------------------

function Key_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

Key_Menu.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
    }
}

//------------------------------------------------------------------------------

Key_Menu.prototype.enter = function () {
    this.screen.launchpad.mute()
    var display = this.screen.launchpad.display
    // display.set_page_button(5, 0x17)

    display.clear_pads(0x0)

    display.set_pad(0, 7, 0x8)
    display.set_pad(1, 7, 0x8)
    display.set_pad(3, 7, 0x8)
    display.set_pad(4, 7, 0x8)
    display.set_pad(5, 7, 0x8)
    for(var x = 0; x < 7; ++x) {
        display.set_pad(x, 6, 0x1)
    }

    display.set_pad(1, 4, 0x1)
    display.set_pad(2, 4, 0x1)
    display.set_pad(3, 4, 0x1)
    display.set_pad(4, 3, 0x1)
    display.set_pad(4, 2, 0x1)
    display.set_pad(4, 1, 0x1)
    display.set_pad(3, 0, 0x1)
    display.set_pad(2, 0, 0x8)
    display.set_pad(1, 0, 0x8)
    display.set_pad(0, 1, 0x8)
    display.set_pad(0, 2, 0x8)
    display.set_pad(0, 3, 0x8)

    display.set_pad(0, 6, 0x2)
    display.set_pad(4, 2, 0x2)
}

//------------------------------------------------------------------------------

Key_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(5, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
