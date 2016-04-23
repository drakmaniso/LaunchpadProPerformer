//------------------------------------------------------------------------------

menuRootKey = {
}

//------------------------------------------------------------------------------

menuRootKey.on_midi = function(status, data1, data2) {
    if (status == 0x90 && data2 > 0) {
        switch (data1) {
            case 0x47: // C
            case 0x36:
                launchpad.root_key = 0
                break
            case 0x51: // C#
            case 0x0d:
                launchpad.root_key = 1
                break
            case 0x48: // D
            case 0x2e:
                launchpad.root_key = 2
                break
            case 0x52: // D#
            case 0x20:
                launchpad.root_key = 3
                break
            case 0x49: // E
            case 0x1a:
                launchpad.root_key = 4
                break
            case 0x4a: // F
            case 0x35:
                launchpad.root_key = 5
                break
            case 0x54: // F#
            case 0x0e:
                launchpad.root_key = 6
                break
            case 0x4b: // G
            case 0x37:
                launchpad.root_key = 7
                break
            case 0x55: // G#
            case 0x16:
                launchpad.root_key = 8
                break
            case 0x4c: // A
            case 0x24:
                launchpad.root_key = 9
                break
            case 0x56: // A#
            case 0x2a:
                launchpad.root_key = 10
                break
            case 0x4d: // B
            case 0x0f:
                launchpad.root_key = 11
                break
        }
        this.draw_grid()
    } else if (status == 0xb0 && data2 > 0) {
        if (data1 == 0x1e) { 
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
    return ! (status == 0xb0 && data1 == 0x14 && data2 == 0x00)
}

//------------------------------------------------------------------------------

menuRootKey.enter = function () {
    launchpad.mute()

    display.clear_pads(0x0)

    this.draw_grid()    
}

menuRootKey.draw_grid = function () {
    display.set_pad(0, 7, 0x8)
    display.set_pad(1, 7, 0x8)
    display.set_pad(3, 7, 0x8)
    display.set_pad(4, 7, 0x8)
    display.set_pad(5, 7, 0x8)
    for(var x = 0; x < 7; ++x) {
        display.set_pad(x, 6, 0x1)
    }

    display.set_pad(1+1, 4, 0x1)
    display.set_pad(1+2, 4, 0x1)
    display.set_pad(1+3, 4, 0x1)
    display.set_pad(1+4, 3, 0x1)
    display.set_pad(1+4, 2, 0x1)
    display.set_pad(1+4, 1, 0x1)
    display.set_pad(1+3, 0, 0x1)
    display.set_pad(1+2, 0, 0x8)
    display.set_pad(1+1, 0, 0x8)
    display.set_pad(1+0, 1, 0x8)
    display.set_pad(1+0, 2, 0x8)
    display.set_pad(1+0, 3, 0x8)

    switch (launchpad.root_key) {
        case 0: // C
            display.set_pad(0, 6, 0x2)
            display.set_pad(1+2, 4, 0x2)
            break
        case 1: // C#
            display.set_pad(0, 7, 0x2)
            display.set_pad(1+1, 0, 0x2)
            break
        case 2: // D
            display.set_pad(1, 6, 0x2)
            display.set_pad(1+4, 3, 0x2)
            break
        case 3: // D#
            display.set_pad(1, 7, 0x2)
            display.set_pad(1+0, 2, 0x2)
            break
        case 4: // E
            display.set_pad(2, 6, 0x2)
            display.set_pad(1+4, 1, 0x2)
            break
        case 5: // F
            display.set_pad(3, 6, 0x2)
            display.set_pad(1+1, 4, 0x2)
            break
        case 6: // F#
            display.set_pad(3, 7, 0x2)
            display.set_pad(1+2, 0, 0x2)
            break
        case 7: // G
            display.set_pad(4, 6, 0x2)
            display.set_pad(1+3, 4, 0x2)
            break
        case 8: // G#
            display.set_pad(4, 7, 0x2)
            display.set_pad(1+0, 1, 0x2)
            break
        case 9: // A
            display.set_pad(5, 6, 0x2)
            display.set_pad(1+4, 2, 0x2)
            break
        case 10: // A#
            display.set_pad(5, 7, 0x2)
            display.set_pad(1+0, 3, 0x2)
            break
        case 11: // B
            display.set_pad(6, 6, 0x2)
            display.set_pad(1+3, 0, 0x2)
            break
    }
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
