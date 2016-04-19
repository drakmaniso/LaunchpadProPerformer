//------------------------------------------------------------------------------

function Chromatic_Mode(screen) {
    this.screen = screen

    this.translation = new_translation_table()
    this.origin = 48
    this.deltax = 1
    this.deltay = 5
    this.key_colors = key_color_schemes[0]
    this.screen_pressed = false
    this.up_pressed = false
    this.down_pressed = false
    this.left_pressed = false
    this.right_pressed = false
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
            var nn = (n - l.root_key) % 12
            var no = Math.floor(n / 12)
            var ns = l.scale.notes[nn]
            if (n == -1) {
                d.set_pad(x, y, 0x00)
            } else if (ns === 0) {
                d.set_pad(x, y, this.key_colors[no][ns])
            } else if (ns) {
                d.set_pad(x, y, this.key_colors[no][ns])
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
    if (status == 0xb0) {
        switch (data1) {
            case 0x60:
                if (data2 > 0) {
                    this.screen_pressed = true
                } else {
                    this.screen_pressed = false
                }
                h = true
                break
            case 0x5b:
                if (data2 > 0) {
                    this.up_pressed = true
                    if (this.screen_pressed) {
                        this.origin = this.origin + 12
                    } else if (this.down_pressed) {
                        this.origin = 48 + this.screen.launchpad.root_key
                    } else {
                        this.origin = this.origin + this.deltay
                    }    
                } else {
                    this.up_pressed = false
                }
                h = true
                break                
            case 0x5c:
                if (data2 > 0) {
                    this.down_pressed = true
                    if (this.screen_pressed) {
                        this.origin =  this.origin - 12
                    } else if (this.up_pressed) {
                        this.origin = 48 + this.screen.launchpad.root_key
                    } else {
                        this.origin = this.origin - this.deltay
                    }    
                } else {
                    this.down_pressed = false
                }   
                h = true
                break                
            case 0x5d:
                if (data2 > 0) {
                    this.left_pressed = true
                    if (this.screen_pressed) {
                        this.origin =  this.origin - 1
                    } else if (this.right_pressed) {
                        this.origin = 48
                    } else {
                        this.origin = this.origin - this.deltax
                    }    
                } else {
                    this.left_pressed = false
                }  
                h = true
                break                
            case 0x5e:
                if (data2 > 0) {
                    this.right_pressed = true
                    if (this.screen_pressed) {
                        this.origin =  this.origin + 1
                    } else if (this.left_pressed) {
                        this.origin = 48
                    } else {
                        this.origin = this.origin + this.deltax
                    }    
                } else {
                    this.right_pressed = false
                }  
                h = true
                break                
        }
        if (h) {
            this.update_and_draw()
        }
    } else if (status == 0x90) {
        var l = this.screen.launchpad
        var d = this.screen.launchpad.display
        var x = d.pad_x(data1)
        var y = d.pad_y(data1)
        var n = this.pad_note(x, y)
        var nn = (n - l.root_key) % 12
        var no = Math.floor(n / 12)
        var ns = l.scale.notes[nn]
        var c = 0x0a
        if (data2 > 0) {
            if (n == -1) {
                c = 0x00
            } else {
                c = pressed_key_color
            }
        } else {
            if (n == -1) {
                c = 0x00
            } else if (ns === 0) {
                c = this.key_colors[no][ns]
            } else if (ns) {
                c = this.key_colors[no][ns]
            } else {
                c = 0x00
            }
        }
        for (x = 0; x < 8; x++) {
            for (y = 0; y < 8; y++) {
                var xyn = this.pad_note(x, y)
                if (xyn == n) {
                    d.set_pad(x, y, c)
                }
            }
        }
        h = true
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
    this.screen.launchpad.display.clear_page_buttons(0x11)
    this.update_and_draw()
}

//------------------------------------------------------------------------------

Chromatic_Mode.prototype.leave = function() {
    var display = this.screen.launchpad.display
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
