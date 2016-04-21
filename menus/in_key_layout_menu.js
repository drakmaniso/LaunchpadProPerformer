//------------------------------------------------------------------------------

function In_Key_Layout_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

In_Key_Layout_Menu.prototype.on_midi = function(status, data1, data2) {
    var d = this.screen.launchpad.display
    var m = this.screen.mode
    if (status == 0x90 && data2 > 0) {
        var x = d.pad_x(data1)
        var y = d.pad_y(data1)
        if (y < 5) {
            if (x < 4) {
                if (y < 2 && m.deltax > 1) {
                    m.deltax = m.deltax - 1
                } else if (y > 2 && m.deltax < 8) {
                    m.deltax = m.deltax + 1
                }
            } else {
                if (y < 2 && m.deltay > 1) {
                    m.deltay = m.deltay - 1
                } else if (y > 2 && m.deltay < 8) {
                    m.deltay = m.deltay + 1
                }
            }
        } else if (y == 7) {
            switch (x) {
                case 0:
                    m.deltax = 1
                    m.deltay = 3
                    m.key_colors = key_color_schemes[0]
                    break;
                case 4:
                    m.deltax = 2
                    m.deltay = 3
                    m.key_colors = key_color_schemes[1]
                    break;
            }    
        }
        this.draw_grid()
    } else if (status == 0xb0 && data2 > 0) {
		switch (data1) {
			case 0x59:
				this.screen.mode.key_colors = key_color_schemes[0]
				break
			case 0x4f:
				this.screen.mode.key_colors = key_color_schemes[1]
				break
			case 0x45:
				this.screen.mode.key_colors = key_color_schemes[2]
				break
		}
        this.draw_grid()
    }
    
    return  ! (status == 0xb0 && data1 == 0x32 && data2 == 0x00)
}

//------------------------------------------------------------------------------

In_Key_Layout_Menu.prototype.enter = function () {
    this.screen.launchpad.mute()
    var d = this.screen.launchpad.display
    d.clear_page_buttons(0x00)

    this.draw_grid()
}

In_Key_Layout_Menu.prototype.draw_grid = function () {
    var d = this.screen.launchpad.display

    var kc = this.screen.mode.key_colors    
    d.set_page_button(0, kc === key_color_schemes[0] ? 0x12 : 0x13)
    d.set_page_button(1, kc === key_color_schemes[1] ? 0x12 : 0x13)
    d.set_page_button(2, kc === key_color_schemes[2] ? 0x12 : 0x13)
    
    d.clear_pads(0x0)

    var m = this.screen.mode
    
    d.set_pad(0, 7, m.deltax == 1 && m.deltay == 3 ? SELECTED_OPTION_COLOR : 0x03)
    d.set_pad(4, 7, m.deltax == 2 && m.deltay == 3 ? SELECTED_OPTION_COLOR : 0x03)

    if (m.deltax >= 0) {
        d.big_number(0, 0, m.deltax, 0x03)
    } else {
        d.big_number(0, 0, -m.deltax, 0x0b)
    }    
    if (m.deltay >= 0) {
        d.big_number(5, 0, m.deltay, 0x03)
    } else {
        d.big_number(5, 0, -m.deltay, 0x0b)
    }    
}

//------------------------------------------------------------------------------

In_Key_Layout_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
