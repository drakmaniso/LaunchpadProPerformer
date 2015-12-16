load("page.js")


//--------------------------------------------------------------------------------------------------


function Drums_Page(screen) {
    Page.call(this, screen)
}


Drums_Page.prototype = create_object(Page.prototype)


//--------------------------------------------------------------------------------------------------


Drums_Page.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
        if (data2 > 0) {
            sendMidi(status, data1, 0x05)
        } else {
            sendMidi(status, data1, 0x0D)
        }
    }
}


//--------------------------------------------------------------------------------------------------


Drums_Page.prototype.enter = function() {
    Page.prototype.enter.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(0, 0x13)

    display.clear_pads(0x0)

    for(var y = 0; y < 4; ++y) {
        for(var x = 0; x < 4; ++x) {
            display.set_pad(x, y, 0x3)
        }
    }
    for(var y = 0; y < 4; ++y) {
        for(var x = 4; x < 8; ++x) {
            display.set_pad(x, y, 0x5)
        }
    }
    for(var y = 4; y < 8; ++y) {
        for(var x = 0; x < 4; ++x) {
            display.set_pad(x, y, 0x7)
        }
    }
    for(var y = 4; y < 8; ++y) {
        for(var x = 4; x < 8; ++x) {
            display.set_pad(x, y, 0x8)
        }
    }
}


//--------------------------------------------------------------------------------------------------


Drums_Page.prototype.leave = function() {
    Page.prototype.leave.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(0, 0x11)
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
