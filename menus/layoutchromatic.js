//------------------------------------------------------------------------------

menuLayoutChromatic = {
}

//------------------------------------------------------------------------------

menuLayoutChromatic.on_midi = function(status, data1, data2) {
    var m = launchpad.screen.mode
    if (status == 0x90 && data2 > 0) {
        var x = display.padX(data1)
        var y = display.padY(data1)
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
                    m.deltay = 5
                    m.key_colors = keyColorSchemes[0]
                    break;
                case 1:
                    m.deltax = 1
                    m.deltay = 7
                    m.key_colors = keyColorSchemes[0]
                    break;
                case 2:
                    m.deltax = 2
                    m.deltay = 5
                    m.key_colors = keyColorSchemes[0]
                    break;
                case 4:
                    m.deltax = 4
                    m.deltay = 3
                    m.key_colors = keyColorSchemes[1]
                    break;
                case 5:
                    m.deltax = 4
                    m.deltay = 7
                    m.key_colors = keyColorSchemes[1]
                    break;
            }
        }
        this.draw_grid()
    } else if (status == 0xb0 && data2 > 0) {
		switch (data1) {
			case 0x59:
				launchpad.screen.mode.key_colors = keyColorSchemes[0]
				break
			case 0x4f:
				launchpad.screen.mode.key_colors = keyColorSchemes[1]
				break
			case 0x45:
				launchpad.screen.mode.key_colors = keyColorSchemes[2]
				break
		}
        this.draw_grid()
    }
    
    return  ! (status == 0xb0 && data1 == 0x32 && data2 == 0x00)
}

//------------------------------------------------------------------------------

menuLayoutChromatic.enter = function () {
    launchpad.mute()
    display.clearSceneButtons(0x00)

    this.draw_grid()
}

menuLayoutChromatic.draw_grid = function () {
    var kc = launchpad.screen.mode.key_colors    
    display.setSceneButton(0, kc === keyColorSchemes[0] ? 0x12 : 0x13)
    display.setSceneButton(1, kc === keyColorSchemes[1] ? 0x12 : 0x13)
    display.setSceneButton(2, kc === keyColorSchemes[2] ? 0x12 : 0x13)
    
    display.clearPads(0x0)

    var m = launchpad.screen.mode
    
    display.setPad(0, 7, m.deltax == 1 && m.deltay == 5 ? colorSelectedOption : 0x03)
    display.setPad(1, 7, m.deltax == 1 && m.deltay == 7 ? colorSelectedOption : 0x03)
    display.setPad(2, 7, m.deltax == 2 && m.deltay == 5 ? colorSelectedOption : 0x03)
    display.setPad(4, 7, m.deltax == 4 && m.deltay == 3 ? colorSelectedOption : 0x03)
    display.setPad(5, 7, m.deltax == 4 && m.deltay == 7 ? colorSelectedOption : 0x03)

    if (m.deltax >= 0) {
        display.drawBigNumber(0, 0, m.deltax, 0x03)
    } else {
        display.drawBigNumber(0, 0, -m.deltax, 0x0b)
    }    
    if (m.deltay >= 0) {
        display.drawBigNumber(5, 0, m.deltay, 0x03)
    } else {
        display.drawBigNumber(5, 0, -m.deltay, 0x0b)
    }    
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
