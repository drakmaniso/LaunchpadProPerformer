//------------------------------------------------------------------------------

function Drums_Layout_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

Drums_Layout_Menu.prototype.on_midi = function(status, data1, data2) {
    var d = this.screen.launchpad.display
    var m = this.screen.mode
    if (status == 0x90 && data2 > 0) {
        var y = d.pad_y(data1)
        if (y < 4) {
            this.screen.mode.wide_pads = true
            this.screen.mode.colors = drums_color_schemes[1]
        } else {
            this.screen.mode.wide_pads = false
            this.screen.mode.colors = drums_color_schemes[0]
        }
        this.draw_grid()
    }
    
    return  ! (status == 0xb0 && data1 == 0x32 && data2 == 0x00)
}

//------------------------------------------------------------------------------

Drums_Layout_Menu.prototype.enter = function () {
    this.screen.launchpad.mute()
    var d = this.screen.launchpad.display
    d.clear_page_buttons(0x00)

    this.draw_grid()
}

Drums_Layout_Menu.prototype.draw_grid = function () {
    var d = this.screen.launchpad.display

    // var kc = this.screen.mode.key_colors    
    // d.set_page_button(0, kc === key_color_schemes[0] ? 0x12 : 0x13)
    // d.set_page_button(1, kc === key_color_schemes[1] ? 0x12 : 0x13)
    // d.set_page_button(2, kc === key_color_schemes[2] ? 0x12 : 0x13)

    d.clear_pads(0x00)
    var c = this.screen.mode.wide_pads ? 0x03 : 0x01
    for (y = 4; y < 8; y++) {
        for (x = 0; x < 8; x++) {
            d.set_pad(x, y, (x + y) % 2 == 0 ? c : 0x00)
        }
    }
    c = this.screen.mode.wide_pads ? 0x01 : 0x03
    for (y = 0; y < 4; y++) {
        for (x = 0; x < 8; x++) {
            d.set_pad(x, y, (Math.floor(x/2) + y) % 2 == 0 ? c : 0x00)
        }
    }
}

//------------------------------------------------------------------------------

Drums_Layout_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
