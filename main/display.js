//--------------------------------------------------------------------------------------------------


const DARK_COLOR = 0x10
const LIGHT_COLOR = 0x20
const PULSING_COLOR = 0x40
const BLINKING_COLOR = 0x80


//--------------------------------------------------------------------------------------------------


const SYSEX_EMPTY_GRID ="f000202902100a0b000c000e000f00100011001200150016001700180019001a001b001c001f00200021002200230024002500260029002a002b002c002d002e002f00300033003400350036003700380039003a003d003e003f00400041004200430044004700480049004a004b004c004d004e0051005200530054005500560057005800"

const COLORS = [0x00, 0x03, 0x09, 0x0d, 0x55, 0x11, 0x1d, 0x29, 0x31, 0x35, 0x05, 0x04, 0x60, 0x60, 0x60, 0x60,
                0x00, 0x01, 0x0b, 0x0f, 0x55, 0x13, 0x1f, 0x2b, 0x33, 0x37, 0x07, 0x07, 0x60, 0x60, 0x60, 0x60]

const ALL_BUTTONS = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x0a, 0x13, 0x14, 0x1d, 0x1e, 0x27, 0x28, 0x31, 0x32, 0x3b, 0x3c, 0x45, 0x46, 0x4f, 0x50, 0x59,
    0x5b, 0x5c, 0x5d, 0x5e, 0x5f, 0x60, 0x61, 0x62 ]

const ACTION_BUTTONS = [0x50, 0x46, 0x3c, 0x32, 0x28, 0x1e, 0x14, 0x0a]
const SCREEN_BUTTONS = [0x5f, 0x60, 0x61, 0x62]
const ARROW_BUTTONS = [0x5b, 0x5c, 0x5d, 0x5e]
const PAGE_BUTTONS = [0x59, 0x4f, 0x45, 0x3b, 0x31, 0x27, 0x1d, 0x13]
const SCENE_BUTTONS = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]


//--------------------------------------------------------------------------------------------------


function Display() {

    // Switch to Standalone Mode
    sendSysex("f000202902102101f7")

    this.current_layout = 0 | 0x100

    this.grid = new Array(128)
    for(var i = 0; i < 128; ++i) {
        this.grid[i] = 0
    }

}


//--------------------------------------------------------------------------------------------------


Display.prototype.set_program_layout = function() {
    if((this.current_layout & 0xff) != 3) {
        this.current_layout = 3 | 0x100
        this.mark_all_buttons_modified()
    }
}


Display.prototype.set_fader_layout = function() {
    if((this.current_layout & 0xff) != 2) {
        this.current_layout = 2 | 0x100
        this.mark_all_buttons_modified()
    }
}


Display.prototype.set_note_layout = function() {
    if((this.current_layout & 0xff) != 0) {
        this.current_layout = 0 | 0x100
        this.mark_all_buttons_modified()
    }
}


Display.prototype.mark_all_buttons_modified = function() {
    for(var i = 0; i < 32; ++i) {
        this.grid[ALL_BUTTONS[i]] |= 0x100
    }
}

//--------------------------------------------------------------------------------------------------


Display.prototype.clear_all = function() {
    sendSysex("f000202902100e00f7")
};


//--------------------------------------------------------------------------------------------------


Display.prototype.clear_action_buttons = function(color) {
    for(var i = 0; i < 8; ++i) {
        this.set_action_button(i, color)
    }
}


Display.prototype.set_action_button = function(index, color) {
    this.grid[ACTION_BUTTONS[index]] = color | 0x100
}


//--------------------------------------------------------------------------------------------------


Display.prototype.clear_screen_buttons = function(color) {
    for(var i = 0; i < 4; ++i) {
        this.set_screen_button(i, color)
    }
}


Display.prototype.set_screen_button = function(index, color) {
    this.grid[SCREEN_BUTTONS[index]] = color | 0x100
    this.grid[0x63] = color | 0x100
}


//--------------------------------------------------------------------------------------------------


Display.prototype.clear_page_buttons = function(color) {
    for(var i = 0; i < 8; ++i) {
        this.set_page_button(i, color)
    }
}


Display.prototype.set_page_button = function(index, color) {
    this.grid[PAGE_BUTTONS[index]] = color | 0x100
}


//--------------------------------------------------------------------------------------------------


Display.prototype.clear_scene_buttons = function(color) {
    for(var i = 0; i < 8; ++i) {
        this.set_scene_button(i, color)
    }
}


Display.prototype.set_scene_button = function(index, color) {
    this.grid[SCENE_BUTTONS[index]] = color | 0x100
}


//--------------------------------------------------------------------------------------------------


Display.prototype.clear_pads = function(color) {
    for(var y = 0; y < 8; ++y) {
        for(var x = 0; x < 8; ++x) {
            this.set_pad(x, y, color)
        }
    }
}


Display.prototype.set_pad = function(x, y, color) {
    this.grid[0x0b + x + y * 0x0a] = color | 0x100
}


//--------------------------------------------------------------------------------------------------


Display.prototype.flush = function() {
    var index, value

    if(this.current_layout & 0x100) {
        switch(this.current_layout & 0xff) {
            case 3:
                sendSysex("f000202902102c03f7")
                break;
            case 2:
                sendSysex("f000202902102c02f7")
                break;
            case 0:
                sendSysex("f000202902102c00f7")
                break;
            default:
                println("Warning: Unkonwn layout required.")
        }
        this.current_layout &= 0xff
    }

    for(var x = 0; x < 8; ++x) {
        for(var y = 0; y < 8; ++y) {
            index = 0x0b + x + y * 0x0a
            value = this.grid[index]
            if(value & 0x100) {
                if(value & BLINKING_COLOR) {
                    sendMidi(0x90, index, 0)
                } else {
                    //println("PAD " + x + ", " + y + " = " + COLORS[value & 0xff])
                    sendMidi(0x90, index, COLORS[value & 0xff])
                    this.grid[index] = value & 0xff
                }
            }
        }
    }

    for(var x = 0; x < 8; ++x) {
        for(var y = 0; y < 8; ++y) {
            index = 0x0b + x + y * 0x0a
            value = this.grid[index]
            if(value & 0x100) {
                if(value & BLINKING_COLOR) {
                    sendSysex("f0002029021023" + byte_to_hex_string(index) + byte_to_hex_string(COLORS[value & 0x0f]) + "f7")
                }
                this.grid[index] = value & 0xff
            }
        }
    }

    for(var i = 0; i < 32; ++i) {
        index = ALL_BUTTONS[i]
        value = this.grid[index]
        if(value & 0x100) {
            sendMidi(0xB0, index, COLORS[value & 0xff])
            this.grid[index] = value & 0xff
        }
    }

    value = this.grid[0x63]
    if(value & 0x100) {
        sendSysex("f000202902100a63" + byte_to_hex_string(COLORS[value & 0xff]) + "f7")
        this.grid[0x63] = value & 0xff
    }
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
