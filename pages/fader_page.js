load("page.js")


//--------------------------------------------------------------------------------------------------


function Fader_Page(screen) {
    Page.call(this, screen)
}


Fader_Page.prototype = create_object(Page.prototype)


//--------------------------------------------------------------------------------------------------


Fader_Page.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
    }
}


//--------------------------------------------------------------------------------------------------


Fader_Page.prototype.enter = function() {
    Page.prototype.enter.call(this)

    var display = this.screen.launchpad.display

    display.clear_pads(0x0)
}


//--------------------------------------------------------------------------------------------------


Fader_Page.prototype.leave = function() {
    Page.prototype.leave.call(this)
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
