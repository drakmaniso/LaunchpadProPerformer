load("page.js")


//--------------------------------------------------------------------------------------------------


function Step_Sequencer_Page(screen) {
    Page.call(this, screen)
}


Step_Sequencer_Page.prototype = create_object(Page.prototype)


//--------------------------------------------------------------------------------------------------


Step_Sequencer_Page.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
        if (data2 > 0) {
            sendMidi(status, data1, 0x03)
        } else {
            // sendMidi(status, data1, 0x0D)
        }
    }
}


//--------------------------------------------------------------------------------------------------


Step_Sequencer_Page.prototype.enter = function() {
    Page.prototype.enter.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(2, 0x13)

    for(y = 0; y < 4; ++y) {
        for(var x = 0; x < 8; ++x) {
            display.set_pad(x, y+4, 0x17)
            display.set_pad(x, y, 0x18)
        }
    }
    for(var y = 0; y < 4; ++y) {
        display.set_pad(0, y+4, 0x12)
        display.set_pad(4, y+4, 0x13)
        display.set_pad(0, y, 0x13)
        display.set_pad(4, y, 0x13)
    }
}


//--------------------------------------------------------------------------------------------------


Step_Sequencer_Page.prototype.leave = function() {
    Page.prototype.leave.call(this)

    var display = this.screen.launchpad.display
    display.set_page_button(2, 0x11)
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
