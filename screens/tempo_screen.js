load("screen.js")
load("../pages/tempo_page.js")


//--------------------------------------------------------------------------------------------------


function Tempo_Screen(launchpad) {
    Screen.call(this, launchpad)

    this.current_page = new Tempo_Page(this)
}


Tempo_Screen.prototype = create_object(Screen.prototype)


//--------------------------------------------------------------------------------------------------


Tempo_Screen.prototype.on_midi = function(status, data1, data2) {
    var page_index
    var is_handled = this.dispatch_midi_to_page(status, data1, data2)

    return is_handled
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
