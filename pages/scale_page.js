load("page.js")


//--------------------------------------------------------------------------------------------------


function Scale_Page(screen) {
    Page.call(this, screen)
}


Scale_Page.prototype = create_object(Page.prototype)


//--------------------------------------------------------------------------------------------------


Scale_Page.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
    }
}


//--------------------------------------------------------------------------------------------------


Scale_Page.prototype.enter = function() {
    Page.prototype.enter.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(6, 0x17)

    display.clear_pads(0x0)

    for(var x = 0; x < 7; ++x) {
        display.set_pad(x, 7, 0x7)
        display.set_pad(x, 5, 0x7)
    }
    display.set_pad(4, 7, 0x0)
    for(var y = 3; y < 5; ++y) {
        for(var x = 0; x < 8; ++x) {
            display.set_pad(x, y, 0x7)
        }
    }

    display.set_pad(0, 0, 0x3)
    display.set_pad(1, 0, 0x7)
    display.set_pad(2, 0, 0x1)
    display.set_pad(3, 0, 0x7)
    display.set_pad(4, 0, 0x1)
    display.set_pad(0, 1, 0x1)
    display.set_pad(1, 1, 0x7)
    display.set_pad(2, 1, 0x1)
    display.set_pad(3, 1, 0x7)
    display.set_pad(4, 1, 0x1)
    display.set_pad(5, 1, 0x7)
    display.set_pad(6, 1, 0x1)

    display.set_pad(0, 7, 0x2)
    display.set_pad(0, 5, 0x2)
}


//--------------------------------------------------------------------------------------------------


Scale_Page.prototype.leave = function() {
    Page.prototype.leave.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(6, 0x11)
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
