//--------------------------------------------------------------------------------------------------


loadAPI(1)

load("main/bitwig.js")
load("main/launchpad.js")


//--------------------------------------------------------------------------------------------------


var launchpad = null


//--------------------------------------------------------------------------------------------------


host.defineController("Novation", "Playpad", "0.1", "dbc14455-2d68-43da-b842-503b9e4292c1")

host.defineMidiPorts(1, 1)
if (host.platformIsWindows()) {
    host.addDeviceNameBasedDiscoveryPair (["MIDIIN2 (Launchpad Pro)"], ["MIDIOUT2 (Launchpad Pro)"])
    host.addDeviceNameBasedDiscoveryPair (["MIDIIN2 (2- Launchpad Pro)"], ["MIDIOUT2 (2- Launchpad Pro)"])
} else if (host.platformIsLinux()) {
    host.addDeviceNameBasedDiscoveryPair (["Launchpad Pro MIDI 2"], ["Launchpad Pro MIDI 2"])
} else if (host.platformIsMac()) {
    host.addDeviceNameBasedDiscoveryPair (["Launchpad Pro Standalone Port"], ["Launchpad Pro Standalone Port"])
}
 

//--------------------------------------------------------------------------------------------------

function init() {
    println("-- Initialization ---------------------------------------------------------------------")

    var b = new Bitwig()
    launchpad = new Launchpad(b, host.getMidiInPort(0), host.getMidiOutPort(0))
    
    println("-- Initialized ------------------------------------------------------------------------")
}

function flush() {
    launchpad.flush()
}

function exit() {
    sendSysex("f000202902100e00f7") // Clear All
    sendSysex("f000202902100a6309f7") // Status Led to Bright Orange
    sendSysex("f000202902102c00f7") // Switch to Note Layout
    println("-- Exit -------------------------------------------------------------------------------")
}


//--------------------------------------------------------------------------------------------------
// Copyright (c) 2015 - Laurent Moussault <moussault.laurent@gmail.com>
