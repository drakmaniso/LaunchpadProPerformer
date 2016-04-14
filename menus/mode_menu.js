//------------------------------------------------------------------------------

function Mode_Menu(screen) {
    this.screen = screen
}

//------------------------------------------------------------------------------

Mode_Menu.prototype.on_midi = function(status, data1, data2) {
    if (status == 0x90 && data2 > 0) {
		if (
			(data1 >= 0x0b && data1 <= 0x0e)
			|| (data1 >= 0x15 && data1 <= 0x18)
			|| (data1 >= 0x1f && data1 <= 0x22)
			|| (data1 >= 0x29 && data1 <= 0x2c)
		) {
			this.screen.mode = this.screen.modes[2]
			this.screen.mode.draw_menus()
			this.draw_grid()
			return true
		}
		else if (
			(data1 >= 0x0f && data1 <= 0x12)
			|| (data1 >= 0x19 && data1 <= 0x1c)
			|| (data1 >= 0x23 && data1 <= 0x26)
			|| (data1 >= 0x2d && data1 <= 0x30)
		) {
			this.screen.mode = this.screen.modes[3]
			this.screen.mode.draw_menus()
			this.draw_grid()
			return true
		}
		else if (
			(data1 >= 0x33 && data1 <= 0x36)
			|| (data1 >= 0x3d && data1 <= 0x40)
			|| (data1 >= 0x47 && data1 <= 0x4a)
			|| (data1 >= 0x51 && data1 <= 0x54)
		) {
			this.screen.mode = this.screen.modes[0]
			this.screen.mode.draw_menus()
			this.draw_grid()
			return true
		}
		else if (
			(data1 >= 0x37 && data1 <= 0x3a)
			|| (data1 >= 0x41 && data1 <= 0x44)
			|| (data1 >= 0x4b && data1 <= 0x4e)
			|| (data1 >= 0x55 && data1 <= 0x58)
		) {
			this.screen.mode = this.screen.modes[1]
			this.screen.mode.draw_menus()
			this.draw_grid()
			return true
		}
    }
}

//------------------------------------------------------------------------------

Mode_Menu.prototype.enter = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(0, 0x12)

    display.clear_pads(0x0)

	this.draw_grid()	
}

//------------------------------------------------------------------------------

Mode_Menu.prototype.draw_grid = function() {
    var d = this.screen.launchpad.display
	var c

	// Chromatic Mode
	if (this.screen.mode === this.screen.modes[0]) {
		c = SELECTED_OPTION_COLOR 
	} else {
		c = 0x07
	}
	d.set_pad(1, 7, c)
	d.set_pad(2, 7, c)
	d.set_pad(0, 6, c)
	d.set_pad(0, 5, c)
	d.set_pad(1, 4, c)
	d.set_pad(2, 4, c)

	// Drums Mode
	if (this.screen.mode === this.screen.modes[1]) {
		c = SELECTED_OPTION_COLOR 
	} else {
		c = 0x07
	}
	d.set_pad(4, 7, c)
	d.set_pad(5, 7, c)
	d.set_pad(4, 6, c)
	d.set_pad(6, 6, c)
	d.set_pad(4, 5, c)
	d.set_pad(6, 5, c)
	d.set_pad(4, 4, c)
	d.set_pad(5, 4, c)

	// In Key Mode
	if (this.screen.mode === this.screen.modes[2]) {
		c = SELECTED_OPTION_COLOR 
	} else {
		c = 0x07
	}
	d.set_pad(0, 2, c)
	d.set_pad(2, 2, c)
	d.set_pad(0, 1, c)
	d.set_pad(1, 1, c)
	d.set_pad(0, 0, c)
	d.set_pad(2, 0, c)

	// Chords Mode
	if (this.screen.mode === this.screen.modes[3]) {
		c = SELECTED_OPTION_COLOR 
	} else {
		c = 0x07
	}
	d.set_pad(4, 2, c)
	d.set_pad(6, 2, c)
	d.set_pad(4, 1, c)
	d.set_pad(5, 1, c)
	d.set_pad(6, 1, c)
	d.set_pad(4, 0, c)
	d.set_pad(6, 0, c)
}

//------------------------------------------------------------------------------

Mode_Menu.prototype.leave = function() {
    var display = this.screen.launchpad.display
    // display.set_page_button(0, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
