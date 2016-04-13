load("screen.js")
load("../pages/drums_page.js")
load("../pages/chromatic_page.js")
load("../pages/in_key_page.js")
load("../pages/chords_page.js")
load("../pages/velocity_page.js")
load("../pages/key_page.js")
load("../pages/scale_page.js")
load("../pages/voicing_page.js")


//--------------------------------------------------------------------------------------------------


function Note_Screen(launchpad, is_secondary) {
    Screen.call(this, launchpad)
	
    this.is_secondary = is_secondary

    this.pages[0] = new Drums_Page(this)
    this.pages[1] = new Chromatic_Page(this)
    this.pages[2] = new In_Key_Page(this)
    this.pages[3] = new Chords_Page(this)
    this.pages[4] = new Velocity_Page(this)
    this.pages[5] = new Key_Page(this)
    this.pages[6] = new Scale_Page(this)
    this.pages[7] = new Voicing_Page(this)

    this.current_page = this.pages[0]

    this.modes = new Array(4)
    this.modes[0] = new Drums_Page(this)
    this.modes[1] = new Chromatic_Page(this)
    this.modes[2] = new In_Key_Page(this)
    this.modes[3] = new Chords_Page(this)
    this.mode = this.modes[0]
	
    this.menus = new Array(8)
    this.menus[0] = new Drums_Page(this)
    this.menus[1] = new Chromatic_Page(this)
    this.menus[2] = new In_Key_Page(this)
    this.menus[3] = new Chords_Page(this)
    this.menus[4] = new Velocity_Page(this)
    this.menus[5] = new Key_Page(this)
    this.menus[6] = new Scale_Page(this)
    this.menus[7] = new Voicing_Page(this)
	this.menu = null
}


Note_Screen.prototype = create_object(Screen.prototype)


//--------------------------------------------------------------------------------------------------


Note_Screen.prototype.on_midi = function(status, data1, data2) {
    var page_index
    var is_handled = this.dispatch_midi_to_page(status, data1, data2)

    if(! is_handled && status == 0xb0) {
        switch (data1) {
            case 0x59:
                page_index = 0
                break
            case 0x4F:
                page_index = 1
                break
            case 0x45:
                page_index = 2
                break
            case 0x3B:
                page_index = 3
                break
            case 0x31:
                page_index = 4
                break;
            case 0x27:
                page_index = 5
                break
            case 0x1D:
                page_index = 6
                break
            case 0x13:
                page_index = 7
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


Note_Screen.prototype.enter = function() {
    if(this.is_secondary) {
        this.launchpad.display.set_screen_button(2, 0x15)
    } else {
        this.launchpad.display.set_screen_button(1, 0x17)
    }
    Screen.prototype.enter.call(this)
}


//--------------------------------------------------------------------------------------------------


Note_Screen.prototype.leave = function() {
    Screen.prototype.leave.call(this)
    if(this.is_secondary) {
        this.launchpad.display.set_screen_button(2, 0x11)
    } else {
        this.launchpad.display.set_screen_button(1, 0x11)
    }
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
