//--------------------------------------------------------------------------------------------------


function Screen(launchpad) {
    this.launchpad = launchpad
    this.pages = new Array(8)
    this.current_page = null
    this.momentary_page = null
}


//--------------------------------------------------------------------------------------------------


Screen.prototype.enter = function() {
    this.current_page.enter()
}


//--------------------------------------------------------------------------------------------------


Screen.prototype.leave = function() {
    this.current_page.leave()
}


//--------------------------------------------------------------------------------------------------


Screen.prototype.dispatch_midi_to_page = function(status, data1, data2) {
    if (this.momentary_page != null) {
        return this.momentary_page.on_midi(status, data1, data2)
    } else {
        return this.current_page.on_midi(status, data1, data2)
    }
}


//--------------------------------------------------------------------------------------------------


Screen.prototype.on_page_button = function(page, data2) {
    if(data2 != 0) {
        if(this.momentary_page == null && this.current_page != page) {
            this.current_page.leave()
            this.momentary_page = page
            this.momentary_page.enter()
        }
    } else {
        if(this.momentary_page == page) {
            this.current_page = this.momentary_page
            this.momentary_page = null
        }
    }
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
