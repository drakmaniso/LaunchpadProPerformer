//------------------------------------------------------------------------------

menuLayoutInKey = {
}

//------------------------------------------------------------------------------

menuLayoutInKey.on_midi = function(status, data1, data2) {
    var m = launchpad.screen.mode
    if (status == 0x90 && data2 > 0) {
        var x = display.pad_x(data1)
        var y = display.pad_y(data1)
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
				launchpad.screen.mode.key_colors = key_color_schemes[0]
				break
			case 0x4f:
				launchpad.screen.mode.key_colors = key_color_schemes[1]
				break
			case 0x45:
				launchpad.screen.mode.key_colors = key_color_schemes[2]
				break
		}
        this.draw_grid()
    }
    
    return  ! (status == 0xb0 && data1 == 0x32 && data2 == 0x00)
}

//------------------------------------------------------------------------------

menuLayoutInKey.enter = function () {
    launchpad.mute()
    display.clear_page_buttons(0x00)

    this.draw_grid()
}

menuLayoutInKey.draw_grid = function () {
    var kc = launchpad.screen.mode.key_colors    
    display.set_page_button(0, kc === key_color_schemes[0] ? 0x12 : 0x13)
    display.set_page_button(1, kc === key_color_schemes[1] ? 0x12 : 0x13)
    display.set_page_button(2, kc === key_color_schemes[2] ? 0x12 : 0x13)
    
    display.clear_pads(0x0)

    var m = launchpad.screen.mode
    
    display.set_pad(0, 7, m.deltax == 1 && m.deltay == 3 ? SELECTED_OPTION_COLOR : 0x03)
    display.set_pad(4, 7, m.deltax == 2 && m.deltay == 3 ? SELECTED_OPTION_COLOR : 0x03)

    if (m.deltax >= 0) {
        display.big_number(0, 0, m.deltax, 0x03)
    } else {
        display.big_number(0, 0, -m.deltax, 0x0b)
    }    
    if (m.deltay >= 0) {
        display.big_number(5, 0, m.deltay, 0x03)
    } else {
        display.big_number(5, 0, -m.deltay, 0x0b)
    }    
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
