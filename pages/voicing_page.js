load("page.js")


//--------------------------------------------------------------------------------------------------


function Voicing_Page(screen) {
    Page.call(this, screen)
}


Voicing_Page.prototype = create_object(Page.prototype)


//--------------------------------------------------------------------------------------------------

 
Voicing_Page.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) { // Note On
    }
}


//--------------------------------------------------------------------------------------------------


Voicing_Page.prototype.enter = function () {
    Page.prototype.enter.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(7, 0x15)

    display.clear_pads(0x0)

    for(var x = 0; x < 3; ++x) {
        display.set_pad(x, 7, 0x5)
    }
    for(var x = 0; x < 6; ++x) {
        display.set_pad(x, 6, 0x5)
    }
    display.set_pad(0, 7, 0x2)
    display.set_pad(0, 6, 0x2)

    for(var y = 0; y < 5; ++y) {
        for(var x = 0; x < 8; ++x) {
            display.set_pad(x, y, 0x5)
        }
    }
    display.set_pad(0, 1, 0x1)
    for(var x = 0; x < 8; ++x) {
        display.set_pad(x, 2, 0x1)
    }
}


//--------------------------------------------------------------------------------------------------


Voicing_Page.prototype.leave = function() {
    Page.prototype.leave.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(7, 0x11)
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
