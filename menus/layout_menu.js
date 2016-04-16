//------------------------------------------------------------------------------

function Layout_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

Layout_Menu.prototype.on_midi = function(status, data1, data2) {
    var d = this.screen.launchpad.display
    var m = this.screen.mode
    if (status == 0x90 && data2 > 0) { // Note On
        var x = d.pad_x(data1)
        var y = d.pad_y(data1)
        if (y < 5) {
            if (x < 4) {
                if (y < 2 && m.deltax > -12) {
                    m.deltax = m.deltax - 1
                } else if (y > 2 && m.deltax < 12) {
                    m.deltax = m.deltax + 1
                }
            } else {
                if (y < 2 && m.deltay > -12) {
                    m.deltay = m.deltay - 1
                } else if (y > 2 && m.deltay < 12) {
                    m.deltay = m.deltay + 1
                }
            }
        }
        this.draw_grid()
    }
    return  ! (status == 0xb0 && data1 == 0x32 && data2 == 0x00)
}

//------------------------------------------------------------------------------

Layout_Menu.prototype.enter = function () {
    this.screen.launchpad.mute()
    var d = this.screen.launchpad.display
    // display.set_page_button(7, 0x15)

    this.draw_grid()
}

Layout_Menu.prototype.draw_grid = function () {
    var d = this.screen.launchpad.display

    d.clear_pads(0x0)

    var m = this.screen.mode
    if (m.deltax >= 0) {
        d.big_number(0, 0, m.deltax, 0x01)
    } else {
        d.big_number(0, 0, -m.deltax, 0x0b)
    }    
    if (m.deltay >= 0) {
        d.big_number(5, 0, m.deltay, 0x01)
    } else {
        d.big_number(5, 0, -m.deltay, 0x0b)
    }    
}

//------------------------------------------------------------------------------

Layout_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(7, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
