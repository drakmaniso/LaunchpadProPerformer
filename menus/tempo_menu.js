//------------------------------------------------------------------------------

function Tempo_Menu(screen) {
	this.screen = screen
}

//------------------------------------------------------------------------------

Tempo_Menu.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90 && data2 > 0) {
    }

    return ! (status == 0xb0 && data1 == 0x46 && data2 == 0x00)
}

//------------------------------------------------------------------------------

Tempo_Menu.prototype.enter = function() {
    this.screen.launchpad.mute()
    var display = this.screen.launchpad.display

    display.clear_pads(0x00)

    display.set_pad(1, 7, 0x1)
    display.set_pad(0, 6, 0x1)
    display.set_pad(1, 6, 0x1)
    display.set_pad(1, 5, 0x1)
    display.set_pad(1, 4, 0x1)
    display.set_pad(1, 3, 0x1)

    display.set_pad(3, 7, 0x1)
    display.set_pad(4, 7, 0x1)
    display.set_pad(4, 6, 0x1)
    display.set_pad(3, 5, 0x1)
    display.set_pad(4, 5, 0x1)
    display.set_pad(3, 4, 0x1)
    display.set_pad(3, 3, 0x1)
    display.set_pad(4, 3, 0x1)

    display.set_pad(6, 7, 0x1)
    display.set_pad(7, 7, 0x1)
    display.set_pad(6, 6, 0x1)
    display.set_pad(7, 6, 0x1)
    display.set_pad(6, 5, 0x1)
    display.set_pad(7, 5, 0x1)
    display.set_pad(6, 4, 0x1)
    display.set_pad(7, 4, 0x1)
    display.set_pad(6, 3, 0x1)
    display.set_pad(7, 3, 0x1)
}

//------------------------------------------------------------------------------

Tempo_Menu.prototype.leave = function() {
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
