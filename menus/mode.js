//------------------------------------------------------------------------------

menuMode = {
}

//------------------------------------------------------------------------------

menuMode.on_midi = function (status, data1, data2) {
    if (status == 0x90 && data2 > 0) {
		var x = display.pad_x(data1)
		var y = display.pad_y(data1)
		if (y >= 4) {
			if (x < 4) {
			launchpad.screen.mode = launchpad.screen.modes[0]
			this.draw_grid()
			} else {
			launchpad.screen.mode = launchpad.screen.modes[1]
			this.draw_grid()
			}
		} else {
			if (x < 4) {
			launchpad.screen.mode = launchpad.screen.modes[2]
			this.draw_grid()
			} else {
			launchpad.screen.mode = launchpad.screen.modes[3]
			this.draw_grid()
			}
		}
    }

	return ! (status == 0xb0 && data1 == 0x46 && data2 == 0x00)
}

//------------------------------------------------------------------------------

menuMode.enter = function() {
    launchpad.mute()

    display.clear_pads(0x0)

	this.draw_grid()	
}

//------------------------------------------------------------------------------

menuMode.draw_grid = function() {
	var c

	// Chromatic Mode
	if (launchpad.screen.mode === launchpad.screen.modes[0]) {
		c = SELECTED_OPTION_COLOR 
	} else {
		c = 0x02
	}
	display.set_pad(1, 7, c)
	display.set_pad(2, 7, c)
	display.set_pad(0, 6, c)
	display.set_pad(0, 5, c)
	display.set_pad(1, 4, c)
	display.set_pad(2, 4, c)

	// Drums Mode
	if (launchpad.screen.mode === launchpad.screen.modes[1]) {
		c = SELECTED_OPTION_COLOR 
	} else {
		c = 0x02
	}
	display.set_pad(4, 7, c)
	display.set_pad(5, 7, c)
	display.set_pad(4, 6, c)
	display.set_pad(6, 6, c)
	display.set_pad(4, 5, c)
	display.set_pad(6, 5, c)
	display.set_pad(4, 4, c)
	display.set_pad(5, 4, c)

	// In Key Mode
	if (launchpad.screen.mode === launchpad.screen.modes[2]) {
		c = SELECTED_OPTION_COLOR 
	} else {
		c = 0x02
	}
	display.set_pad(0, 2, c)
	display.set_pad(2, 2, c)
	display.set_pad(0, 1, c)
	display.set_pad(1, 1, c)
	display.set_pad(0, 0, c)
	display.set_pad(2, 0, c)

	// Chords Mode
	if (launchpad.screen.mode === launchpad.screen.modes[3]) {
		c = SELECTED_OPTION_COLOR 
	} else {
		c = 0x02
	}
	display.set_pad(4, 2, c)
	display.set_pad(6, 2, c)
	display.set_pad(4, 1, c)
	display.set_pad(5, 1, c)
	display.set_pad(6, 1, c)
	display.set_pad(4, 0, c)
	display.set_pad(6, 0, c)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
