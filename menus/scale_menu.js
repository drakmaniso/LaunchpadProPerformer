//------------------------------------------------------------------------------

function Scale_Menu(screen) {
    this.screen = screen

    this.scales = new Array(4)
    this.scales[0] = [IONIAN_MAJOR_SCALE, AEOLIAN_MINOR_SCALE, HARMONIC_MINOR_SCALE, MELODIC_MINOR_SCALE, null, MINOR_PENTATONIC_SCALE, BLUES_SCALE, null]
    this.scales[1] = [IONIAN_MAJOR_SCALE, DORIAN_MODE_SCALE, PHRYGIAN_MODE_SCALE, LYDIAN_MODE_SCALE, MIXOLYDIAN_MODE_SCALE, AEOLIAN_MINOR_SCALE, LOCRIAN_MODE_SCALE, null]
    this.scales[2] = [PHRYGIAN_DOMINANT_SCALE, GYPSY_SCALE, HUNGARIAN_MINOR_SCALE, PERSIAN_SCALE, null, null, SYMETRIC_DIMINISHED_SCALE, WHOLE_TONE_SCALE]
    this.scales[3] = [JAPANESE_HIRAJOSHI_SCALE, JAPANESE_IN_SCALE, JAPANESE_IN_SEN_SCALE, null, PENTATONIC_MAJOR_SCALE, null, null, null]
}

//------------------------------------------------------------------------------

Scale_Menu.prototype.on_midi = function(status, data1, data2) {
    var l = this.screen.launchpad
    if (status == 0x90 && data2 > 0) {
        var x = l.display.pad_x(data1)
        var y = l.display.pad_y(data1)
        println("Pad: 0x" + byte_to_hex_string(data1) + " x=" + x + " y=" + y)
        if (y >= 4) {
            if (this.scales[7 - y][x] != null) {
                l.scale = this.scales[7 - y][x]
            }
        }
        this.draw_grid()
    }
    return status == 0x90
}

//------------------------------------------------------------------------------

Scale_Menu.prototype.enter = function() {
    this.screen.launchpad.mute()
    var d = this.screen.launchpad.display
    // display.set_page_button(6, 0x17)

    d.clear_pads(0x0)

    this.draw_grid()    
}

Scale_Menu.prototype.draw_grid = function () {
    var l = this.screen.launchpad
    var d = this.screen.launchpad.display

    for (x = 0; x < 8; x++) {
        for (y = 0; y < 4; y++) {
            if (this.scales[y][x] != null) {
                var eq = true
                for (i = 0; i < 12; i++) {
                    if ((l.scale[i]) != (this.scales[y][x][i])) {
                        eq = false
                    }
                }
                d.set_pad(x, 7-y, eq ? 0x02 : 0x08)
            }
        }
    }

    d.set_pad(1+0, 0, 0x3)
    d.set_pad(1+1, 0, l.scale[1] ? WHITE_KEYS_COLORS[4] : 0x8)
    d.set_pad(1+2, 0, l.scale[2] ? WHITE_KEYS_COLORS[4] : 0x8)
    d.set_pad(1+3, 0, l.scale[3] ? WHITE_KEYS_COLORS[4] : 0x8)
    d.set_pad(1+4, 0, l.scale[4] ? WHITE_KEYS_COLORS[4] : 0x8)
    d.set_pad(1+0, 1, l.scale[5] ? WHITE_KEYS_COLORS[4] : 0x8)
    d.set_pad(1+1, 1, l.scale[6] ? WHITE_KEYS_COLORS[4] : 0x8)
    d.set_pad(1+2, 1, l.scale[7] ? WHITE_KEYS_COLORS[4] : 0x8)
    d.set_pad(1+3, 1, l.scale[8] ? WHITE_KEYS_COLORS[4] : 0x8)
    d.set_pad(1+4, 1, l.scale[9] ? WHITE_KEYS_COLORS[4] : 0x8)
    d.set_pad(1+0, 2, l.scale[10] ? WHITE_KEYS_COLORS[4] : 0x8)
    d.set_pad(1+1, 2, l.scale[11] ? WHITE_KEYS_COLORS[4] : 0x8)
    d.set_pad(1+2, 2, 0x5)
}

//------------------------------------------------------------------------------

Scale_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(6, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
