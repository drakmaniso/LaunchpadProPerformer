load("page.js")


//--------------------------------------------------------------------------------------------------


function Velocity_Page(screen) {
    Page.call(this, screen)
}


Velocity_Page.prototype = create_object(Page.prototype)


//--------------------------------------------------------------------------------------------------


Velocity_Page.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
    }
}


//--------------------------------------------------------------------------------------------------


Velocity_Page.prototype.enter = function() {
    Page.prototype.enter.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(4, 0x13)

    display.clear_pads(0x0)

    for(var y = 0; y < 8; ++y) {
        display.set_pad(0, y, 0x3)
        display.set_pad(1, y, 0x3)
    }
    display.set_pad(0, 0, 0x2)
    display.set_pad(1, 7, 0x2)
    for(var y = 1; y < 7; ++y) {
        display.set_pad(3, y, 0x3)
    }
    display.set_pad(3, 3, 0x2)
    display.set_pad(3, 4, 0x2)
}


//--------------------------------------------------------------------------------------------------


Velocity_Page.prototype.leave = function() {
    Page.prototype.leave.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(4, 0x11)
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
