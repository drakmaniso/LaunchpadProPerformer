//------------------------------------------------------------------------------

function Chromatic_Mode(screen) {
    this.screen = screen

    this.translation = new_translation_table()
    this.origin = 48
    this.deltax = 1
    this.deltay = 5
    this.fill_translation()
}

//------------------------------------------------------------------------------

Chromatic_Mode.prototype.fill_translation = function () {
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            var n = this.pad_note(x, y)
            set_pad_translation(this.translation, x, y, n)
        }
    }
}

Chromatic_Mode.prototype.draw_grid = function () {
    var l = this.screen.launchpad
    var d = l.display
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            var n = this.pad_note(x, y)
            var nn = n % 12
            var no = Math.floor(n / 12)
            if (n != -1 && nn == l.root_key) {
                d.set_pad(x, y, ROOT_KEYS_COLORS[no])
            } else if (n != -1 && l.scale[nn]) {
                d.set_pad(x, y, WHITE_KEY_COLOR)
            } else {
                d.set_pad(x, y, 0x00)
            }
        }
    }
}

Chromatic_Mode.prototype.pad_note = function(x, y) {
    var n = this.origin + x * this.deltax + y * this.deltay
    if (n > 127 || n < 0) {
        n = -1
    }
    return n
}

//------------------------------------------------------------------------------

Chromatic_Mode.prototype.on_midi = function (status, data1, data2) {
    var h = false
    if (status = 0xb0 && data2 > 0) {
        switch (data1) {
            case 0x5b:
                this.origin = this.origin + this.deltay
                h = true
                break                
            case 0x5c:
                this.origin = this.origin - this.deltay
                h = true
                break                
            case 0x5d:
                this.origin = this.origin - this.deltax
                h = true
                break                
            case 0x5e:
                this.origin = this.origin + this.deltax
                h = true
                break                
        }
        if (h) {
            this.update_and_draw()
        }
    }

    return h
}

//------------------------------------------------------------------------------

Chromatic_Mode.prototype.update_and_draw = function () {
    this.fill_translation()
    this.screen.launchpad.note_input.setKeyTranslationTable(this.translation)
    this.draw_grid()
}

//------------------------------------------------------------------------------

Chromatic_Mode.prototype.enter = function () {
    this.update_and_draw()
	this.draw_menus()	
    this.draw_grid()
}

//------------------------------------------------------------------------------

Chromatic_Mode.prototype.draw_menus = function() {
	var d = this.screen.launchpad.display
}

//------------------------------------------------------------------------------

Chromatic_Mode.prototype.leave = function() {
    var display = this.screen.launchpad.display
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
