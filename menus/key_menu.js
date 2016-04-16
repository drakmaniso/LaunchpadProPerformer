//------------------------------------------------------------------------------

function Key_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

Key_Menu.prototype.on_midi = function(status, data1, data2) {
    var l = this.screen.launchpad
    if (status == 0x90 && data2 > 0) {
        switch (data1) {
            case 0x47: // C
            case 0x36:
                l.root_key = 0
                break
            case 0x51: // C#
            case 0x0d:
                l.root_key = 1
                break
            case 0x48: // D
            case 0x2e:
                l.root_key = 2
                break
            case 0x52: // D#
            case 0x20:
                l.root_key = 3
                break
            case 0x49: // E
            case 0x1a:
                l.root_key = 4
                break
            case 0x4a: // F
            case 0x35:
                l.root_key = 5
                break
            case 0x54: // F#
            case 0x0e:
                l.root_key = 6
                break
            case 0x4b: // G
            case 0x37:
                l.root_key = 7
                break
            case 0x55: // G#
            case 0x16:
                l.root_key = 8
                break
            case 0x4c: // A
            case 0x24:
                l.root_key = 9
                break
            case 0x56: // A#
            case 0x2a:
                l.root_key = 10
                break
            case 0x4d: // B
            case 0x0f:
                l.root_key = 11
                break
        }
        this.draw_grid()
    }
    return status == 0x90
}

//------------------------------------------------------------------------------

Key_Menu.prototype.enter = function () {
    this.screen.launchpad.mute()
    var d = this.screen.launchpad.display
    // display.set_page_button(5, 0x17)

    d.clear_pads(0x0)

    this.draw_grid()    
}

Key_Menu.prototype.draw_grid = function () {
    var d = this.screen.launchpad.display

    d.set_pad(0, 7, 0x8)
    d.set_pad(1, 7, 0x8)
    d.set_pad(3, 7, 0x8)
    d.set_pad(4, 7, 0x8)
    d.set_pad(5, 7, 0x8)
    for(var x = 0; x < 7; ++x) {
        d.set_pad(x, 6, 0x1)
    }

    d.set_pad(1+1, 4, 0x1)
    d.set_pad(1+2, 4, 0x1)
    d.set_pad(1+3, 4, 0x1)
    d.set_pad(1+4, 3, 0x1)
    d.set_pad(1+4, 2, 0x1)
    d.set_pad(1+4, 1, 0x1)
    d.set_pad(1+3, 0, 0x1)
    d.set_pad(1+2, 0, 0x8)
    d.set_pad(1+1, 0, 0x8)
    d.set_pad(1+0, 1, 0x8)
    d.set_pad(1+0, 2, 0x8)
    d.set_pad(1+0, 3, 0x8)

    switch (this.screen.launchpad.root_key) {
        case 0: // C
            d.set_pad(0, 6, 0x2)
            d.set_pad(1+2, 4, 0x2)
            break
        case 1: // C#
            d.set_pad(0, 7, 0x2)
            d.set_pad(1+1, 0, 0x2)
            break
        case 2: // D
            d.set_pad(1, 6, 0x2)
            d.set_pad(1+4, 3, 0x2)
            break
        case 3: // D#
            d.set_pad(1, 7, 0x2)
            d.set_pad(1+0, 2, 0x2)
            break
        case 4: // E
            d.set_pad(2, 6, 0x2)
            d.set_pad(1+4, 1, 0x2)
            break
        case 5: // F
            d.set_pad(3, 6, 0x2)
            d.set_pad(1+1, 4, 0x2)
            break
        case 6: // F#
            d.set_pad(3, 7, 0x2)
            d.set_pad(1+2, 0, 0x2)
            break
        case 7: // G
            d.set_pad(4, 6, 0x2)
            d.set_pad(1+3, 4, 0x2)
            break
        case 8: // G#
            d.set_pad(4, 7, 0x2)
            d.set_pad(1+0, 1, 0x2)
            break
        case 9: // A
            d.set_pad(5, 6, 0x2)
            d.set_pad(1+4, 2, 0x2)
            break
        case 10: // A#
            d.set_pad(5, 7, 0x2)
            d.set_pad(1+0, 3, 0x2)
            break
        case 11: // B
            d.set_pad(6, 6, 0x2)
            d.set_pad(1+3, 0, 0x2)
            break
    }
}

//------------------------------------------------------------------------------

Key_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(5, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
