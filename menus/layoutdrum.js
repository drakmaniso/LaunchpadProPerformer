//------------------------------------------------------------------------------

menuLayoutDrum = {
}

//------------------------------------------------------------------------------

menuLayoutDrum.on_midi = function(status, data1, data2) {
    var m = launchpad.screen.mode
    if (status == 0x90 && data2 > 0) {
        var y = display.pad_y(data1)
        if (y < 4) {
            launchpad.screen.mode.wide_pads = true
            launchpad.screen.mode.colors = drums_color_schemes[1]
        } else {
            launchpad.screen.mode.wide_pads = false
            launchpad.screen.mode.colors = drums_color_schemes[0]
        }
        this.draw_grid()
    }
    
    return  ! (status == 0xb0 && data1 == 0x32 && data2 == 0x00)
}

//------------------------------------------------------------------------------

menuLayoutDrum.enter = function () {
    launchpad.mute()
    display.clear_page_buttons(0x00)

    this.draw_grid()
}

menuLayoutDrum.draw_grid = function () {
    display.clear_pads(0x00)
    var c = launchpad.screen.mode.wide_pads ? 0x03 : 0x01
    for (y = 4; y < 8; y++) {
        for (x = 0; x < 8; x++) {
            display.set_pad(x, y, (x + y) % 2 == 0 ? c : 0x00)
        }
    }
    c = launchpad.screen.mode.wide_pads ? 0x01 : 0x03
    for (y = 0; y < 4; y++) {
        for (x = 0; x < 8; x++) {
            display.set_pad(x, y, (Math.floor(x/2) + y) % 2 == 0 ? c : 0x00)
        }
    }
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
