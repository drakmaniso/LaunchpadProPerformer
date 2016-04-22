//------------------------------------------------------------------------------

function Bitwig() {
	this.trackBank = host.createMainTrackBank(8, 1, 8)
    for (i = 0; i < 8; i++) {
        t = this.trackBank.getChannel(i)
        cls = t.getClipLauncherSlots() 
        cls.setIndication(true)
        cls.addHasContentObserver(function (bw, track) {
            return function (slot, has_clip) {
                println("HasContent: " + track.toString() + ", " + slot.toString() + ": " + has_clip.toString())
                bw.on_has_content(track, slot, has_clip)
            }
        } (this, i) )
    }
    // act = host.createArrangerCursorTrack(0, 8)
}

//------------------------------------------------------------------------------

Bitwig.prototype.setLaunchpad = function (launchpad) {
    this.launchpad = launchpad
}

//------------------------------------------------------------------------------

Bitwig.prototype.on_has_content = function (track, slot, has_clip) {
    this.launchpad.display.set_pad(track, 7 - slot, has_clip ? 0x02 : 0x00)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
