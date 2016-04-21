load("../menus/drums_layout_menu.js")

//------------------------------------------------------------------------------

function Drums_Mode(screen) {
	this.screen = screen

    this.layout_menu = new Drums_Layout_Menu(screen)

    this.translation = new_translation_table()
    this.origin = 36
}


const DRUM_COLORS = [
    0x06, 0x06,
    0x09, 0x09,
    0x03, 0x03,
    0x07, 0x07,
    0x02, 0x02,
    0x05, 0x05,
    0x08, 0x08,
    0x0b, 0x0b,
]
// const DRUM_COLORS = [
//     0x06, 0x07,
//     0x09, 0x0b,
//     0x03, 0x04,
//     0x07, 0x08,
//     0x0b, 0x02,
//     0x05, 0x06,
//     0x08, 0x09,
//     0x02, 0x03,
// ]

//------------------------------------------------------------------------------

Drums_Mode.prototype.on_midi = function(status, data1, data2) {
    var h = false
    if (status == 0xb0 && data2 > 0) {
        switch (data1) {
            case 0x5b:
                this.origin = 36
                h = true
                break
            case 0x5c:
                this.origin = 36 + 64
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
    } else if(status == 0x90) {
        var d = this.screen.launchpad.display
        var x = d.pad_x(data1)
        var y = d.pad_y(data1)
        if (data2 > 0) {
            d.set_pad(x, y, 0x0a)
        } else {
            var n = this.pad_note(x, y)
            if (n > -1) {
                n = modulo(n - 4, 128)
                var sq = 2 * Math.floor(n / 16) + Math.floor(n + n / 4) % 2
                d.set_pad(x, y, DRUM_COLORS[sq])
            }
        }
    }
    return h
}

//------------------------------------------------------------------------------

Drums_Mode.prototype.update_and_draw = function () {
    this.fill_translation()
    this.screen.launchpad.note_input.setKeyTranslationTable(this.translation)
    this.draw_grid()
}

Drums_Mode.prototype.fill_translation = function () {
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            var n = this.pad_note(x, y)
            set_pad_translation(this.translation, x, y, n)
        }
    }
}

//------------------------------------------------------------------------------

Drums_Mode.prototype.enter = function() {
    this.screen.menus[3] = this.layout_menu
    this.screen.launchpad.display.clear_page_buttons(0x11)
    this.update_and_draw()    
}

Drums_Mode.prototype.draw_grid = function() {
    var d = this.screen.launchpad.display

    for (var y = 0; y < 8; ++y) {
        for (var x = 0; x < 8; ++x) {
            var n = this.pad_note(x, y)
            if (n > -1) {
                n = modulo(n - 4, 128)
                var sq = 2 * Math.floor(n / 16) + Math.floor(n + n / 4) % 2
                d.set_pad(x, y, DRUM_COLORS[sq])
            } else {
                d.set_pad(x, y, 0x00)
            } 
        }
    }
}

Drums_Mode.prototype.pad_note = function (x, y) {
    var n = this.origin + 4 * y
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

Drums_Mode.prototype.leave = function() {
    var display = this.screen.launchpad.display
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
