//------------------------------------------------------------------------------

function ModeChromatic() {
    this.layout_menu = menuLayoutChromatic

    this.translation = new_translation_table()
    this.origin = 48
    this.deltax = 1
    this.deltay = 5
    this.key_colors = keyColorSchemes[0]
    this.screen_pressed = false
    this.up_pressed = false
    this.down_pressed = false
    this.left_pressed = false
    this.right_pressed = false
}

//------------------------------------------------------------------------------

ModeChromatic.prototype.fill_translation = function () {
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            var n = this.pad_note(x, y)
            set_pad_translation(this.translation, x, y, n)
        }
    }
}

ModeChromatic.prototype.draw_grid = function () {
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            var n = this.pad_note(x, y)
            var nn = (n - launchpad.root_key) % 12
            var no = Math.floor(n / 12)
            var ns = launchpad.scale.notes[nn]
            if (n == -1) {
                display.setPad(x, y, 0x00)
            } else if (ns === 0) {
                display.setPad(x, y, this.key_colors[no][ns])
            } else if (ns) {
                display.setPad(x, y, this.key_colors[no][ns])
            } else {
                display.setPad(x, y, 0x00)
            }
        }
    }
}

ModeChromatic.prototype.pad_note = function(x, y) {
    var n = this.origin + x * this.deltax + y * this.deltay
    if (n > 127 || n < 0) {
        n = -1
    }
    return n
}

//------------------------------------------------------------------------------

ModeChromatic.prototype.on_midi = function (status, data1, data2) {
    var h = false
    if (status == 0xb0) {
        switch (data1) {
            case 0x5b:
                if (data2 > 0) {
                    this.up_pressed = true
                    if (this.screen_pressed) {
                        this.origin = this.origin + 12
                    } else if (this.down_pressed) {
                        this.origin = 48 + launchpad.root_key
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
                        this.origin = 48 + launchpad.root_key
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
        var x = display.padX(data1)
        var y = display.padY(data1)
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
                    display.setPad(x, y, c)
                }
            }
        }
        h = true
    }

    return h
}

//------------------------------------------------------------------------------

ModeChromatic.prototype.update_and_draw = function () {
    this.fill_translation()
    launchpad.note_input.setKeyTranslationTable(this.translation)
    this.draw_grid()
}

//------------------------------------------------------------------------------

ModeChromatic.prototype.enter = function () {
    launchpad.screen.menus[3] = this.layout_menu
    display.clearSceneButtons(0x11)
    this.update_and_draw()
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
