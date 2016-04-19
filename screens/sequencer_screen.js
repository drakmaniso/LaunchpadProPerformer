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
    this.launchpad.mute()
    var d = this.launchpad.display

    d.set_screen_button(2, 0x19)

    d.clear_pads(0x00)
    
    for (var y = 0; y < 4; ++y) {
        for (x = 0; x < 4; x++) {
            d.set_pad(x, y, 0x17)
            d.set_pad(4+x, 4+y, 0x17)
            d.set_pad(x, 4+y, 0x18)
            d.set_pad(4+x, y, 0x18)
        }    
        d.set_pad(0, y, 0x13)
        d.set_pad(4+0, 4+y, 0x13)
        d.set_pad(0, 4+y, 0x13)
        d.set_pad(4+0, y, 0x13)
    }
    d.set_pad(4+0, 4+3, 0x12)
    d.set_pad(0, 3, 0x12)
    d.set_pad(4+0, 3, 0x12)
    d.set_pad(0, 4+3, 0x12)
}

//------------------------------------------------------------------------------

Sequencer_Screen.prototype.leave = function() {
    this.launchpad.display.set_screen_button(2, 0x11)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
