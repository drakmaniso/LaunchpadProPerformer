load("../scales.js")

//------------------------------------------------------------------------------

function Scale_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

Scale_Menu.prototype.on_midi = function(status, data1, data2) {
    var l = this.screen.launchpad
    if (status == 0x90 && data2 > 0) {
        var x = l.display.pad_x(data1)
        var y = l.display.pad_y(data1)
        println("Pad: 0x" + byte_to_hex_string(data1) + " x=" + x + " y=" + y)
        if (y >= 4) {
            if (scales[7 - y][x] != null) {
                l.scale = scales[7 - y][x]
            }
        }
        this.draw_grid()
    }
    return ! (status == 0xb0 && data1 == 0x1e && data2 == 0x00)
}

//------------------------------------------------------------------------------

Scale_Menu.prototype.enter = function() {
    this.screen.launchpad.mute()
    var d = this.screen.launchpad.display

    d.clear_pads(0x0)

    this.draw_grid()    
}

Scale_Menu.prototype.draw_grid = function () {
    var l = this.screen.launchpad
    var d = this.screen.launchpad.display

    for (x = 0; x < 8; x++) {
        for (y = 0; y < 4; y++) {
            if (scales[y][x] != null) {
                var eq = true
                for (i = 0; i < 12; i++) {
                    if ((l.scale.notes[i]) != (scales[y][x].notes[i])) {
                        eq = false
                    }
                }
                d.set_pad(x, 7-y, eq ? SELECTED_OPTION_COLOR : 0x07)
            }
        }
    }

    if (true) {
        // Display the scale as bass guitar    
        d.set_pad(1 + 0, 0, 0x3)
        d.set_pad(1 + 1, 0, l.scale.notes[1] ? 0x01 : 0x07)
        d.set_pad(1 + 2, 0, l.scale.notes[2] ? 0x01 : 0x07)
        d.set_pad(1 + 3, 0, l.scale.notes[3] ? 0x01 : 0x07)
        d.set_pad(1 + 4, 0, l.scale.notes[4] ? 0x01 : 0x07)
        d.set_pad(1 + 0, 1, l.scale.notes[5] ? 0x01 : 0x07)
        d.set_pad(1 + 1, 1, l.scale.notes[6] ? 0x01 : 0x07)
        d.set_pad(1 + 2, 1, l.scale.notes[7] ? 0x01 : 0x07)
        d.set_pad(1 + 3, 1, l.scale.notes[8] ? 0x01 : 0x07)
        d.set_pad(1 + 4, 1, l.scale.notes[9] ? 0x01 : 0x07)
        d.set_pad(1 + 0, 2, l.scale.notes[10] ? 0x01 : 0x07)
        d.set_pad(1 + 1, 2, l.scale.notes[11] ? 0x01 : 0x07)
        d.set_pad(1 + 2, 2, 0x5)
    } else {
        // Display the scale on piano    
        d.set_pad(0, 0, 0x3)
        d.set_pad(0, 1, l.scale.notes[1] ? 0x01 : 0x07)
        d.set_pad(1, 0, l.scale.notes[2] ? 0x01 : 0x07)
        d.set_pad(1, 1, l.scale.notes[3] ? 0x01 : 0x07)
        d.set_pad(2, 0, l.scale.notes[4] ? 0x01 : 0x07)
        d.set_pad(3, 0, l.scale.notes[5] ? 0x01 : 0x07)
        d.set_pad(3, 1, l.scale.notes[6] ? 0x01 : 0x07)
        d.set_pad(4, 0, l.scale.notes[7] ? 0x01 : 0x07)
        d.set_pad(4, 1, l.scale.notes[8] ? 0x01 : 0x07)
        d.set_pad(5, 0, l.scale.notes[9] ? 0x01 : 0x07)
        d.set_pad(5, 1, l.scale.notes[10] ? 0x01 : 0x07)
        d.set_pad(6, 0, l.scale.notes[11] ? 0x01 : 0x07)
        d.set_pad(7, 0, 0x5)
    }
}

//------------------------------------------------------------------------------

Scale_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
