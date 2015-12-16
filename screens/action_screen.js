load("screen.js")
load("../pages/tempo_page.js")
load("../pages/quantization_page.js")


//--------------------------------------------------------------------------------------------------


function Action_Screen(launchpad) {
    Screen.call(this, launchpad)

    this.tempo_page = new Tempo_Page(this)
    this.quantization_page = new Quantization_Page(this)

    this.current_page = this.tempo_page
}


Action_Screen.prototype = create_object(Screen.prototype)


//--------------------------------------------------------------------------------------------------


Action_Screen.prototype.select_tempo_page = function(index) {
    this.current_page = this.tempo_page
}


Action_Screen.prototype.select_quantization_page = function(index) {
    this.current_page = this.quantization_page
}


//--------------------------------------------------------------------------------------------------


Action_Screen.prototype.on_midi = function(status, data1, data2) {
    var page_index
    var is_handled = this.dispatch_midi_to_page(status, data1, data2)

    return is_handled
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
