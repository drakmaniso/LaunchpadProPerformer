//------------------------------------------------------------------------------

function ModeInKey(screen) {
	this.screen = screen

    this.layout_menu = menuLayoutInKey

    this.translation = new_translation_table()
    this.origin_degree = 0
    this.origin_octave = 3
    this.deltax = 1
    this.deltay = 3
    this.key_colors = key_color_schemes[0]
    this.screen_pressed = false
    this.up_pressed = false
    this.down_pressed = false
    this.left_pressed = false
    this.right_pressed = false
    this.nb_degrees = 0
    this.note_positions = new Array(12)
}

ModeInKey.prototype.fill_translation = function () {
    for (i = 0; i < 12; i++) {
        this.note_positions[i] = null
    }
    var s = launchpad.scale
    this.nb_degrees = 0
    var p = 0
    for (i = 0; i < 12; i++) {
        if (s.notes[i] !== false) {
            this.nb_degrees++
            this.note_positions[this.nb_degrees - 1] = p
        }
        p++
    }
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            var n = this.pad_note(x, y)
            set_pad_translation(this.translation, x, y, n)
        }
    }
}

ModeInKey.prototype.pad_note = function(x, y) {
    var deg = this.origin_degree + x * this.deltax + y * this.deltay
    var o = this.origin_octave + Math.floor(deg / this.nb_degrees)
    deg = deg % this.nb_degrees
    var n = this.note_positions[deg] + 12 * o
    if (n > 127 || n < 0) {
        n = -1
    }
    return n
}

//------------------------------------------------------------------------------

ModeInKey.prototype.on_midi = function (status, data1, data2) {
    var h = false
    if (status == 0xb0) {
        switch (data1) {
            case 0x5b:
                if (data2 > 0) {
                    this.up_pressed = true
                    if (this.screen_pressed) {
                        this.origin_octave = this.origin_octave + 1
                    } else if (this.down_pressed) {
                        this.origin_octave = 3
                        this.origin_degree = 0
                    } else {
                        this.origin_octave += Math.floor((this.origin_degree + this.deltay) / this.nb_degrees)
                        this.origin_degree = modulo(this.origin_degree + this.deltay, this.nb_degrees)
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
                        this.origin_octave =  this.origin_octave - 1
                    } else if (this.up_pressed) {
                        this.origin_octave = 3
                        this.origin_degree = 0
                    } else {
                        this.origin_octave += Math.floor((this.origin_degree - this.deltay) / this.nb_degrees)
                        this.origin_degree = modulo(this.origin_degree - this.deltay, this.nb_degrees)
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
                        //TODO
                        this.origin_octave = 3
                        this.origin_degree = 0
                    } else {
                        this.origin_octave += Math.floor((this.origin_degree - this.deltax) / this.nb_degrees)
                        this.origin_degree = modulo(this.origin_degree - this.deltax, this.nb_degrees)
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
                        //TODO
                        this.origin_octave = 3
                        this.origin_degree = 0
                    } else {
                        this.origin_octave += Math.floor((this.origin_degree + this.deltax) / this.nb_degrees)
                        this.origin_degree = modulo(this.origin_degree + this.deltax, this.nb_degrees)
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
        var x = display.pad_x(data1)
        var y = display.pad_y(data1)
        var n = this.pad_note(x, y)
        var nn = (n - launchpad.root_key) % 12
        var no = Math.floor(n / 12)
        var ns = launchpad.scale.notes[nn]
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
                    display.set_pad(x, y, c)
                }
            }
        }
        h = true
    }

    return h    
}

//------------------------------------------------------------------------------

ModeInKey.prototype.update_and_draw = function () {
    this.fill_translation()
    launchpad.note_input.setKeyTranslationTable(this.translation)
    this.draw_grid()
}

//------------------------------------------------------------------------------

ModeInKey.prototype.enter = function() {
    launchpad.screen.menus[3] = this.layout_menu
    display.clear_page_buttons(0x11)
    this.update_and_draw()
}

ModeInKey.prototype.draw_grid = function () {
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            var n = this.pad_note(x, y)
            var nn = (n - launchpad.root_key) % 12
            var no = Math.floor(n / 12)
            var ns = launchpad.scale.notes[nn]
            if (n == -1) {
                display.set_pad(x, y, 0x00)
            } else if (ns === 0) {
                display.set_pad(x, y, this.key_colors[no][ns])
            } else if (ns) {
                display.set_pad(x, y, this.key_colors[no][ns])
            } else {
                display.set_pad(x, y, 0x00)
            }
        }
    }
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
