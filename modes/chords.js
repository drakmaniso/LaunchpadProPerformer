//------------------------------------------------------------------------------

function ModeChords() {
}

//------------------------------------------------------------------------------

ModeChords.prototype.on_midi = function(status, data1, data2) {
    if(status == 0x90) {
    }
}

//------------------------------------------------------------------------------

ModeChords.prototype.enter = function() {
    display.clearPads(0x0)

    // Pure Triads
    for(var x = 1; x < 8; ++x) { display.setPad(x, 3, 0x1) }
    display.setPad(1, 3, 0x2)
    display.setPad(4, 3, 0x3)
    display.setPad(5, 3, 0x3)
    display.setPad(7, 3, 0x8)

    // Fifth
    for(var x = 1; x < 7; ++x) { display.setPad(x, 0, 0x1) }
    display.setPad(2, 0, 0x7)

    // Suspended Triads
    display.setPad(1, 2, 0x7)
    display.setPad(2, 2, 0x7)
    display.setPad(3, 2, 0x7)
    display.setPad(6, 2, 0x7)

    display.setPad(1, 1, 0x7)
    display.setPad(2, 1, 0x7)
    display.setPad(4, 1, 0x7)
    display.setPad(5, 1, 0x7)
    display.setPad(6, 1, 0x7)

    // Inverted Triads
    for(var x = 1; x < 8; ++x) { display.setPad(x, 4, 0x1) }
    display.setPad(2, 4, 0x8)
    display.setPad(4, 4, 0x7)
    display.setPad(5, 4, 0x7)
    display.setPad(7, 4, 0x7)
    for(var x = 1; x < 8; ++x) { display.setPad(x, 5, 0x1) }
    display.setPad(2, 5, 0x7)
    display.setPad(4, 5, 0x8)
    display.setPad(6, 5, 0x7)
    display.setPad(7, 5, 0x7)

    // Seventh
    display.setPad(1, 6, 0x1)
    display.setPad(2, 6, 0x7)
    display.setPad(4, 6, 0x7)
    display.setPad(5, 6, 0x7)
    for(var x = 1; x < 8; ++x) { display.setPad(x, 7, 0x1) }
    display.setPad(1, 7, 0x7)
    display.setPad(4, 7, 0x7)
    display.setPad(5, 7, 0x7)
    display.setPad(7, 7, 0x7)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
