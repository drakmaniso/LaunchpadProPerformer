//------------------------------------------------------------------------------

menuScale = {
}

//------------------------------------------------------------------------------

menuScale.on_midi = function(status, data1, data2) {
    if (status == 0x90 && data2 > 0) {
        var x = display.pad_x(data1)
        var y = display.pad_y(data1)
        println("Pad: 0x" + byte_to_hex_string(data1) + " x=" + x + " y=" + y)
        if (y >= 4) {
            if (scales[7 - y][x] != null) {
                launchpad.scale = scales[7 - y][x]
            }
        }
        this.draw_grid()
    } else if (status == 0xb0 && data2 > 0) {
        if (data1 == 0x14) { 
            if (launchpad.scale === scales[0][0]) {
                launchpad.scale = scales[0][1]
                launchpad.root_key += 9
                launchpad.root_key %= 12
            } else if (launchpad.scale === scales[0][1]) {
                launchpad.scale = scales[0][0]
                launchpad.root_key -= 9
                launchpad.root_key %= 12
            }
        this.draw_grid()
        }
    }
    return ! (status == 0xb0 && data1 == 0x1e && data2 == 0x00)
}

//------------------------------------------------------------------------------

menuScale.enter = function() {
    launchpad.mute()

    display.clear_pads(0x0)

    this.draw_grid()    
}

menuScale.draw_grid = function () {
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 4; y++) {
            if (scales[y][x] != null) {
                var eq = true
                for (i = 0; i < 12; i++) {
                    if ((launchpad.scale.notes[i]) != (scales[y][x].notes[i])) {
                        eq = false
                    }
                }
                display.set_pad(x, 7-y, eq ? SELECTED_OPTION_COLOR : 0x07)
            }
        }
    }

    if (true) {
        // Display the scale as bass guitar    
        display.set_pad(1 + 0, 0, 0x3)
        display.set_pad(1 + 1, 0, launchpad.scale.notes[1] ? 0x01 : 0x07)
        display.set_pad(1 + 2, 0, launchpad.scale.notes[2] ? 0x01 : 0x07)
        display.set_pad(1 + 3, 0, launchpad.scale.notes[3] ? 0x01 : 0x07)
        display.set_pad(1 + 4, 0, launchpad.scale.notes[4] ? 0x01 : 0x07)
        display.set_pad(1 + 0, 1, launchpad.scale.notes[5] ? 0x01 : 0x07)
        display.set_pad(1 + 1, 1, launchpad.scale.notes[6] ? 0x01 : 0x07)
        display.set_pad(1 + 2, 1, launchpad.scale.notes[7] ? 0x01 : 0x07)
        display.set_pad(1 + 3, 1, launchpad.scale.notes[8] ? 0x01 : 0x07)
        display.set_pad(1 + 4, 1, launchpad.scale.notes[9] ? 0x01 : 0x07)
        display.set_pad(1 + 0, 2, launchpad.scale.notes[10] ? 0x01 : 0x07)
        display.set_pad(1 + 1, 2, launchpad.scale.notes[11] ? 0x01 : 0x07)
        display.set_pad(1 + 2, 2, 0x5)
    } else {
        // Display the scale on piano    
        display.set_pad(0, 0, 0x3)
        display.set_pad(0, 1, launchpad.scale.notes[1] ? 0x01 : 0x07)
        display.set_pad(1, 0, launchpad.scale.notes[2] ? 0x01 : 0x07)
        display.set_pad(1, 1, launchpad.scale.notes[3] ? 0x01 : 0x07)
        display.set_pad(2, 0, launchpad.scale.notes[4] ? 0x01 : 0x07)
        display.set_pad(3, 0, launchpad.scale.notes[5] ? 0x01 : 0x07)
        display.set_pad(3, 1, launchpad.scale.notes[6] ? 0x01 : 0x07)
        display.set_pad(4, 0, launchpad.scale.notes[7] ? 0x01 : 0x07)
        display.set_pad(4, 1, launchpad.scale.notes[8] ? 0x01 : 0x07)
        display.set_pad(5, 0, launchpad.scale.notes[9] ? 0x01 : 0x07)
        display.set_pad(5, 1, launchpad.scale.notes[10] ? 0x01 : 0x07)
        display.set_pad(6, 0, launchpad.scale.notes[11] ? 0x01 : 0x07)
        display.set_pad(7, 0, 0x5)
    }
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
