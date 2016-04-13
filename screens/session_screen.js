load("screen.js")
load("../pages/launcher_page.js")
load("../pages/step_sequencer_page.js")


//--------------------------------------------------------------------------------------------------


function Session_Screen(launchpad) {
    Screen.call(this, launchpad)

    this.pages = new Array()
    this.pages[0] = new Launcher_Page(this)

    this.current_page = this.pages[0]
}


Session_Screen.prototype = create_object(Screen.prototype)


//--------------------------------------------------------------------------------------------------


Session_Screen.prototype.on_midi = function(status, data1, data2) {
    var page_index
    var is_handled = this.dispatch_midi_to_page(status, data1, data2)

    if(! is_handled && status == 0xb0) {
        switch (data1) {
            case 0x59:
                page_index = 0
                break
            case 0x4F:
                // page_index = 1
                break
            case 0x45:
                break
            case 0x3B:
                // page_index = 3
                break
            case 0x31:
                break;
            case 0x27:
                break
            case 0x1D:
                break
            case 0x13:
                // page_index = 7
                break
            default:
        }
        if(page_index != null) {
            this.on_page_button(this.pages[page_index], data2)
            is_handled = true
        }
    }

    return is_handled
}


//--------------------------------------------------------------------------------------------------


Session_Screen.prototype.enter = function() {
    Screen.prototype.enter.call(this)
    this.launchpad.display.set_screen_button(0, 0x12)
}


//--------------------------------------------------------------------------------------------------


Session_Screen.prototype.leave = function() {
    Screen.prototype.leave.call(this)
    this.launchpad.display.set_screen_button(0, 0x11)
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
