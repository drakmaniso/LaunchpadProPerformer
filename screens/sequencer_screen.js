//------------------------------------------------------------------------------

function Sequencer_Screen(launchpad) {
	this.launchpad = launchpad
}

//------------------------------------------------------------------------------

Sequencer_Screen.prototype.on_midi = function(status, data1, data2) {
    var is_handled

    if(status == 0x90) {
        if (data2 > 0) {
            sendMidi(status, data1, 0x03)
        } else {
            // sendMidi(status, data1, 0x0D)
        }
    }

    return is_handled
}

//------------------------------------------------------------------------------

Sequencer_Screen.prototype.enter = function() {
    //Screen.prototype.enter.call(this)

    var display = this.launchpad.display

    display.set_screen_button(3, 0x19)

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

//------------------------------------------------------------------------------

Sequencer_Screen.prototype.leave = function() {
    //Screen.prototype.leave.call(this)
    this.launchpad.display.set_screen_button(3, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
