load("page.js")


//--------------------------------------------------------------------------------------------------


function Launcher_Page(screen) {
    Page.call(this, screen)
}


Launcher_Page.prototype = create_object(Page.prototype)


//--------------------------------------------------------------------------------------------------


Launcher_Page.prototype.on_midi = function(status, data1, data2) {
    var is_handled = false
    var display = this.screen.launchpad.display

    if(status == 0xb0 && data1 == 0x50) {
        if(data2 > 0) {
            display.set_action_button(6, 0x11)
        } else {
            display.set_action_button(6, 0x13)
        }
        is_handled = true
    } else if(status == 0xb0 && data1 == 0x14) {
        is_handled = true
        if(data2 > 0) {
            for(y = 0; y < 8; ++y) {
                display.set_pad(6, y, 0x12)
                display.set_pad(7, y, 0x13)
            }
            display.clear_page_buttons(0x18)
            display.clear_scene_buttons(0x18)
        } else {
            for(y = 0; y < 8; ++y) {
                display.set_pad(6, y, 0x00)
                display.set_pad(7, y, 0x00)
            }
            display.clear_page_buttons(0x11)
            display.set_page_button(0, 0x12)
            display.clear_scene_buttons(0x00)
        }
    }

    return is_handled
}


//--------------------------------------------------------------------------------------------------


Launcher_Page.prototype.enter = function() {
    Page.prototype.enter.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(0, 0x12)

    display.clear_pads(0x00)

    display.set_pad(0, 7, 0x02)
    display.set_pad(1, 7, 0x02 | BLINKING_COLOR)
    display.set_pad(2, 7, 0x02)
    display.set_pad(3, 7, 0x02)

    display.set_pad(0, 6, 0x03)
    display.set_pad(1, 6, 0x03 | BLINKING_COLOR)
    display.set_pad(2, 6, 0x03)
    display.set_pad(3, 6, 0x03)
    display.set_pad(4, 6, 0x03)

    display.set_pad(0, 5, 0x04 | BLINKING_COLOR)
    display.set_pad(1, 5, 0x04)
    display.set_pad(2, 5, 0x04)

    display.set_pad(1, 4, 0x05)
    display.set_pad(2, 4, 0x05)
    display.set_pad(3, 4, 0x05)
    display.set_pad(5, 4, 0x05)

    display.set_pad(1, 3, 0x06)
    display.set_pad(2, 3, 0x06)
    display.set_pad(3, 3, 0x06 | BLINKING_COLOR)
    display.set_pad(4, 3, 0x06)

    display.set_pad(0, 2, 0x07)
    display.set_pad(1, 2, 0x07)
    display.set_pad(2, 2, 0x07)

    display.set_pad(1, 1, 0x08)
    display.set_pad(2, 1, 0x08)
    display.set_pad(3, 1, 0x08)

    display.set_pad(2, 0, 0x09)
    display.set_pad(3, 0, 0x09)
    display.set_pad(4, 0, 0x09)
}


//--------------------------------------------------------------------------------------------------


Launcher_Page.prototype.leave = function() {
    Page.prototype.leave.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(0, 0x11)
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
