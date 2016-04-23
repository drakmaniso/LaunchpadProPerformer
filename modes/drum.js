//------------------------------------------------------------------------------

function ModeDrum(screen) {
	this.screen = screen

    this.layout_menu = menuLayoutDrum

    this.wide_pads = false
    this.colors = drums_color_schemes[0]
    this.translation = new_translation_table()
    this.origin = 36
}

//------------------------------------------------------------------------------

ModeDrum.prototype.on_midi = function(status, data1, data2) {
    var h = false
    if (status == 0xb0 && data2 > 0) {
        switch (data1) {
            case 0x5b:
                if (this.wide_pads) {
                    this.origin += 32
                    this.origin = modulo(this.origin, 128)
                } else {
                    this.origin = 36
                }    
                h = true
                break
            case 0x5c:
                if (this.wide_pads) {
                    this.origin -= 32
                    this.origin = modulo(this.origin, 128)
                } else {
                    this.origin = 36 + 64
                }
                h = true
                break
            case 0x5d:
                this.origin -= 16
                this.origin = modulo(this.origin, 128)
                h = true
                break
            case 0x5e:
                this.origin += 16
                this.origin = modulo(this.origin, 128)
                h = true
                break
        }
        if (h) {
            this.update_and_draw()
        }
    } else if (status == 0x90) {
        h = true
        var x = display.pad_x(data1)
        var y = display.pad_y(data1)
        if (data2 > 0) {
            if (this.wide_pads) {
                x = 2 * Math.floor(x / 2)
                display.set_pad(x, y, 0x0a)
                display.set_pad(x+1, y, 0x0a)
            } else {
                display.set_pad(x, y, 0x0a)
            }    
        } else {
            var n = this.pad_note(x, y)
            if (n > -1) {
                n = modulo(n - 4, 128)
                var sq = 2 * Math.floor(n / 16) + Math.floor(n + n / 4) % 2
                if (this.wide_pads) {
                    x = 2 * Math.floor(x / 2)
                    display.set_pad(x, y, this.colors[sq])
                    display.set_pad(x + 1, y, this.colors[sq])
                } else {
                    display.set_pad(x, y, this.colors[sq])
                }    
            }
        }
    }
    return h
}

//------------------------------------------------------------------------------

ModeDrum.prototype.update_and_draw = function () {
    this.fill_translation()
    launchpad.note_input.setKeyTranslationTable(this.translation)
    this.draw_grid()
}

ModeDrum.prototype.fill_translation = function () {
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            var n = this.pad_note(x, y)
            set_pad_translation(this.translation, x, y, n)
        }
    }
}

//------------------------------------------------------------------------------

ModeDrum.prototype.enter = function() {
    launchpad.screen.menus[3] = this.layout_menu
    display.clear_page_buttons(0x11)
    this.update_and_draw()    
}

ModeDrum.prototype.draw_grid = function() {
    for (var y = 0; y < 8; ++y) {
        for (var x = 0; x < 8; ++x) {
            var n = this.pad_note(x, y)
            if (n > -1) {
                n = modulo(n - 4, 128)
                var sq = 2 * Math.floor(n / 16) + Math.floor(n + n / 4) % 2
                display.set_pad(x, y, this.colors[sq])
            } else {
                display.set_pad(x, y, 0x00)
            } 
        }
    }
}

ModeDrum.prototype.pad_note = function (x, y) {
    var n = this.origin + 4 * y
    if (this.wide_pads) {
        x = Math.floor(x / 2)
    }
    if (x > 3) {
        x -= 4
        n += 32
    }
    n += x
    if (n > 127) {
        return n -= 128
    } else if (n < 0) {
        n += 128
    }
    return n
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
