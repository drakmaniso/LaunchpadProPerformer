load("tools.js")
load("display.js")
load("../screens/session_screen.js")
load("../screens/note_screen.js")
load("../screens/device_screen.js")
load("../screens/action_screen.js")


//--------------------------------------------------------------------------------------------------


function Launchpad(input, output) {
    this.input = input
    this.output = output

    this.display = new Display()
    this.display.set_program_layout()
    this.display.clear_all()
    this.setup_buttons()

    this.screens = new Array()
    this.screens[0] = new Session_Screen(this)
    this.screens[1] = new Note_Screen(this, false)
    this.screens[2] = new Device_Screen(this)
    this.screens[3] = new Note_Screen(this, true)

    this.action_screen = new Action_Screen(this)

    this.current_screen = this.screens[0]
    this.momentary_screen = null

    var lp = this
    input.setMidiCallback(function(status, data1, data2) {lp.on_midi(status, data1, data2)})
    input.setSysexCallback(function(data) {lp.on_sysex(data)})
    output.setShouldSendMidiBeatClock(true)

    this.note_input = this.input.createNoteInput("Note", "80????", "90????", "A0????", "D0????")
    this.note_input.setShouldConsumeEvents(false)
    // this.user_input = this.input.createNoteInput("User", "80????", "90????", "A0????", "D0????")
    // this.user_input.setShouldConsumeEvents(false)

    this.current_screen.enter()

    this.display.flush()
}


//--------------------------------------------------------------------------------------------------


Launchpad.prototype.setup_buttons = function() {
    this.display.clear_action_buttons(0x11)
    this.display.set_action_button(6, 0x13)
    this.display.clear_screen_buttons(0x11)
    this.display.clear_page_buttons(0x11)
}


//--------------------------------------------------------------------------------------------------


Launchpad.prototype.on_midi = function(status, data1, data2) {
    var screen = null
    var is_handled = this.dispatch_midi_to_screen(status, data1, data2)



    if(!is_handled && status == 0xb0 && data1 == 0x46) {
        if(data2 > 0) {
            if(this.momentary_page == null) {
                this.current_screen.leave()
                this.action_screen.select_tempo_page()
                this.momentary_screen = this.action_screen
                this.momentary_screen.enter()
            }
        } else if(this.momentary_screen === this.action_screen) {
            this.momentary_screen.leave()
            this.momentary_screen = null
            this.current_screen.enter()
        }
        is_handled = true
    } else if(!is_handled && status == 0xb0 && data1 == 0x28) {
        if(data2 > 0) {
            if(this.momentary_page == null) {
                this.current_screen.leave()
                this.action_screen.select_quantization_page()
                this.momentary_screen = this.action_screen
                this.momentary_screen.enter()
            }
        } else if(this.momentary_screen === this.action_screen)  {
            this.momentary_screen.leave()
            this.momentary_screen = null
            this.current_screen.enter()
        }
        is_handled = true
    }

    if(!is_handled && status == 0xb0) {
        switch (data1) {
            case 0x5F:
                screen = 0
                break
            case 0x60:
                screen = 1
                break
            case 0x61:
                screen = 2
                break
            case 0x62:
                screen = 3
                break
            default:
        }
        if(screen != null) {
            this.on_screen_button(screen, data2)
            is_handled = true
        }
    }

    if(! is_handled){
        println("Unhandled Midi Event: " + byte_to_hex_string(status) + " " + byte_to_hex_string(data1) + " " + byte_to_hex_string(data2))
    }

    return is_handled
}


//--------------------------------------------------------------------------------------------------


Launchpad.prototype.on_sysex = function(data) {
    println("SYSEX: " + data)
}


//--------------------------------------------------------------------------------------------------


Launchpad.prototype.flush = function() {
    this.display.flush()
}


//--------------------------------------------------------------------------------------------------


Launchpad.prototype.dispatch_midi_to_screen = function(status, data1, data2) {
    if (this.momentary_screen != null) {
        return this.momentary_screen.on_midi(status, data1, data2)
    } else {
        return this.current_screen.on_midi(status, data1, data2)
    }
}


//--------------------------------------------------------------------------------------------------


Launchpad.prototype.on_screen_button = function (screen_index, data2) {
    var screen = this.screens[screen_index]
    if(data2 != 0) {
        if(this.momentary_screen == null
                && this.momentary_page == null
                && this.current_screen != screen) {
            // this.current_screen.current_page.leave()
            this.current_screen.leave()
            this.momentary_screen = screen
            this.momentary_screen.enter()
        }
    } else {
        if(this.momentary_screen == screen) {
            this.current_screen = this.momentary_screen
            this.momentary_screen = null
            this.momentary_page = null
        }
    }
};


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
