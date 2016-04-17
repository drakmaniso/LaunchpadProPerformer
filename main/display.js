//------------------------------------------------------------------------------

const DARK_COLOR = 0x10
const LIGHT_COLOR = 0x20
const PULSING_COLOR = 0x40
const BLINKING_COLOR = 0x80

//------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------

const SELECTED_OPTION_COLOR = 0x02 

//------------------------------------------------------------------------------

var pressed_key_color = 0x0a

const key_color_schemes = [
    [
        [0x18, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
        [0x19, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
        [0x1a, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
        [0x02, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
        [0x03, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
        [0x05, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
        [0x07, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
        [0x08, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
        [0x09, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
        [0x0b, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
        [0x1a, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01],
    ],

    [
        [0x01, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18],
        [0x01, 0x19, 0x19, 0x19, 0x19, 0x19, 0x19, 0x19, 0x19, 0x19, 0x19, 0x19],
        [0x01, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a],
        [0x01, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02],
        [0x01, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03],
        [0x01, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05, 0x05],
        [0x01, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07, 0x07],
        [0x01, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08],
        [0x01, 0x09, 0x09, 0x09, 0x09, 0x09, 0x09, 0x09, 0x09, 0x09, 0x09, 0x09],
        [0x01, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
        [0x01, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a, 0x1a],
    ],

    [
        [0x01, 0x06, 0x05, 0x03, 0x02, 0x08, 0x07, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
        [0x01, 0x06, 0x05, 0x03, 0x02, 0x08, 0x07, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
        [0x01, 0x06, 0x05, 0x03, 0x02, 0x08, 0x07, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
        [0x01, 0x06, 0x05, 0x03, 0x02, 0x08, 0x07, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
        [0x01, 0x06, 0x05, 0x03, 0x02, 0x08, 0x07, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
        [0x01, 0x06, 0x05, 0x03, 0x02, 0x08, 0x07, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
        [0x01, 0x06, 0x05, 0x03, 0x02, 0x08, 0x07, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
        [0x01, 0x06, 0x05, 0x03, 0x02, 0x08, 0x07, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
        [0x01, 0x06, 0x05, 0x03, 0x02, 0x08, 0x07, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
        [0x01, 0x06, 0x05, 0x03, 0x02, 0x08, 0x07, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
        [0x01, 0x06, 0x05, 0x03, 0x02, 0x08, 0x07, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
    ]
]

//------------------------------------------------------------------------------

function Display() {

    // Switch to Standalone Mode
    sendSysex("f000202902102101f7")

	// Switch to Program Layout	
	sendSysex("f000202902102c03f7")

    this.current_grid = new Array(128)
    for(var i = 0; i < 128; ++i) {
        this.current_grid[i] = null
    }
    this.next_grid = new Array(128)
    for(var i = 0; i < 128; ++i) {
        this.next_grid[i] = 0
    }

}

//------------------------------------------------------------------------------

Display.prototype.mark_all_buttons_modified = function() {
    for(var i = 0; i < 32; ++i) {
        if(this.next_grid[ALL_BUTTONS[i]] === null) {
            this.next_grid[ALL_BUTTONS[i]] = this.current_grid[ALL_BUTTONS[i]]
        }
        this.current_grid[ALL_BUTTONS[i]] = null
    }
}

//------------------------------------------------------------------------------

Display.prototype.clear_all = function() {
    sendSysex("f000202902100e00f7")
    for(var i = 0; i < 128; ++i) {
        this.current_grid[i] = 0
    }
};

//------------------------------------------------------------------------------

Display.prototype.clear_action_buttons = function(color) {
    for(var i = 0; i < 8; ++i) {
        this.set_action_button(i, color)
    }
}

Display.prototype.set_action_button = function(index, color) {
    this.next_grid[ACTION_BUTTONS[index]] = color
}

//------------------------------------------------------------------------------

Display.prototype.clear_arrow_buttons = function(color) {
    for(var i = 0; i < 4; ++i) {
        this.set_arrow_button(i, color)
    }
}

Display.prototype.set_arrow_button = function(index, color) {
    this.next_grid[ARROW_BUTTONS[index]] = color
}

//------------------------------------------------------------------------------

Display.prototype.clear_screen_buttons = function(color) {
    for(var i = 0; i < 4; ++i) {
        this.set_screen_button(i, color)
    }
}

Display.prototype.set_screen_button = function(index, color) {
    this.next_grid[SCREEN_BUTTONS[index]] = color
    this.next_grid[0x63] = color
}

//------------------------------------------------------------------------------

Display.prototype.clear_page_buttons = function(color) {
    for(var i = 0; i < 8; ++i) {
        this.set_page_button(i, color)
    }
}

Display.prototype.set_page_button = function(index, color) {
    this.next_grid[PAGE_BUTTONS[index]] = color
}

//------------------------------------------------------------------------------

Display.prototype.clear_scene_buttons = function(color) {
    for(var i = 0; i < 8; ++i) {
        this.set_scene_button(i, color)
    }
}

Display.prototype.set_scene_button = function(index, color) {
    this.next_grid[SCENE_BUTTONS[index]] = color
}

//------------------------------------------------------------------------------

Display.prototype.clear_pads = function(color) {
    for(var y = 0; y < 8; ++y) {
        for(var x = 0; x < 8; ++x) {
            this.set_pad(x, y, color)
        }
    }
}

Display.prototype.set_pad = function(x, y, color) {
    this.next_grid[0x0b + x + y * 0x0a] = color
}

//------------------------------------------------------------------------------

Display.prototype.pad_index = function (x, y) {
    return 0x0b + x + y * 0x0a
}

Display.prototype.pad_x = function (index) {
    return (index - 0x0b) % 0x0a
}

Display.prototype.pad_y = function (index) {
    return Math.floor((index - 0x0b) / 0x0a)
}

//------------------------------------------------------------------------------

Display.prototype.flush = function() {
    var index, current_value, next_value

    for(var x = 0; x < 8; ++x) {
        for(var y = 0; y < 8; ++y) {
            index = 0x0b + x + y * 0x0a
            current_value = this.current_grid[index]
            next_value = this.next_grid[index]
            if(next_value != null && current_value != next_value) {
                if(next_value & BLINKING_COLOR) {
                    sendMidi(0x90, index, 0)
                } else {
                    //println("PAD " + x + ", " + y + " = " + byte_to_hex_string(COLORS[next_value & 0xff]))
                    sendMidi(0x90, index, COLORS[next_value & 0xff])
                    this.current_grid[index] = next_value
                }
            }
        }
    }

    for(var x = 0; x < 8; ++x) {
        for(var y = 0; y < 8; ++y) {
            index = 0x0b + x + y * 0x0a
            current_value = this.current_grid[index]
            next_value = this.next_grid[index]
            if(next_value != null && current_value != next_value) {
                if(next_value & BLINKING_COLOR) {
                    sendSysex("f0002029021023" + byte_to_hex_string(index) + byte_to_hex_string(COLORS[next_value & 0x0f]) + "f7")
                }
                this.current_grid[index] = next_value
            }
        }
    }

    for(var i = 0; i < 32; ++i) {
        index = ALL_BUTTONS[i]
        current_value = this.current_grid[index]
        next_value = this.next_grid[index]
        if(next_value != null && current_value != next_value) {
            sendMidi(0xB0, index, COLORS[next_value & 0xff])
            this.current_grid[index] = next_value
        }
    }

    current_value = this.current_grid[0x63]
    next_value = this.next_grid[0x63]
    if(next_value != null && current_value != next_value) {
        sendSysex("f000202902100a63" + byte_to_hex_string(COLORS[next_value & 0xff]) + "f7")
        this.current_grid[0x63] = next_value
    }
}

//------------------------------------------------------------------------------

Display.prototype.big_number = function (x, y, number, color) {
    switch (number) {
        case 0:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+2, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+2, y+2, color)
            this.set_pad(x+0, y+1, color)
            this.set_pad(x+2, y+1, color)
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+1, y+0, color)
            this.set_pad(x+2, y+0, color)
            break;
        case 1:
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+1, y+3, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+1, y+1, color)
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+1, y+0, color)
            this.set_pad(x+2, y+0, color)
            break;
        case 2:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            this.set_pad(x+2, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+2, y+2, color)
            this.set_pad(x+0, y+1, color)
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+1, y+0, color)
            this.set_pad(x+2, y+0, color)
            break
        case 3:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            this.set_pad(x+2, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+2, y+2, color)
            this.set_pad(x+2, y+1, color)
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+1, y+0, color)
            this.set_pad(x+2, y+0, color)
            break
        case 4:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+2, y+2, color)
            this.set_pad(x+0, y+1, color)
            this.set_pad(x+1, y+1, color)
            this.set_pad(x+2, y+1, color)
            this.set_pad(x+2, y+0, color)
            break
        case 5:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+2, y+2, color)
            this.set_pad(x+2, y+1, color)
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+1, y+0, color)
            this.set_pad(x+2, y+0, color)
            break
        case 6: 
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+2, y+2, color)
            this.set_pad(x+0, y+1, color)
            this.set_pad(x+2, y+1, color)
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+1, y+0, color)
            this.set_pad(x+2, y+0, color)
            break
        case 7:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            this.set_pad(x+2, y+3, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+2, y+2, color)
            this.set_pad(x+2, y+1, color)
            this.set_pad(x+2, y+0, color)
            break
        case 8:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+2, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+2, y+2, color)
            this.set_pad(x+0, y+1, color)
            this.set_pad(x+2, y+1, color)
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+1, y+0, color)
            this.set_pad(x+2, y+0, color)
            break
        case 9:
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+1, y+0, color)
            this.set_pad(x+2, y+0, color)
            this.set_pad(x+2, y+1, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+2, y+2, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+2, y+3, color)
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            break
        case 10:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+2, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+2, y+2, color)
            this.set_pad(x+0, y+1, color)
            this.set_pad(x+2, y+1, color)
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+2, y+0, color)
            break
        case 11:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+2, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+0, y+1, color)
            this.set_pad(x+2, y+1, color)
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+1, y+0, color)
            break
        case 12:
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+0, y+1, color)
            this.set_pad(x+1, y+0, color)
            this.set_pad(x+2, y+0, color)
            break
        case 13:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+2, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+2, y+2, color)
            this.set_pad(x+0, y+1, color)
            this.set_pad(x+2, y+1, color)
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+1, y+0, color)
            break
        case 14:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+0, y+1, color)
            this.set_pad(x+0, y+0, color)
            this.set_pad(x+1, y+0, color)
            this.set_pad(x+2, y+0, color)
            break
        case 15:
            this.set_pad(x+0, y+4, color)
            this.set_pad(x+1, y+4, color)
            this.set_pad(x+2, y+4, color)
            this.set_pad(x+0, y+3, color)
            this.set_pad(x+0, y+2, color)
            this.set_pad(x+1, y+2, color)
            this.set_pad(x+0, y+1, color)
            this.set_pad(x+0, y+0, color)
            break
    }
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
