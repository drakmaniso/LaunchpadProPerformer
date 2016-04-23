//------------------------------------------------------------------------------

bitwig = {
}

//------------------------------------------------------------------------------

bitwig.init = function() {
    this.trackBank = host.createMainTrackBank(8, 1, 8)
    this.trackBank.addChannelCountObserver(function (c) {
        // println("COUNT: " + c.toString())
    })
    for (i = 0; i < 8; i++) {
        t = this.trackBank.getChannel(i)
        t.addPositionObserver(function (bw, idx) {
            return function (position) {
                // println("Track " + idx.toString() + " is at " + position.toString())
            }
        } (this, i))
        t.addNameObserver(16, "", function (bw, idx) {
            return function (name) {
                // println("Track " + idx.toString() + " is named " + name)
            }
        } (this, i))
        cls = t.getClipLauncherSlots() 
        cls.setIndication(true)
        cls.addHasContentObserver(function (bw, track) {
            return function (slot, has_clip) {
                // println("HasContent: " + track.toString() + ", " + slot.toString() + ": " + has_clip.toString())
                bw.on_has_content(track, slot, has_clip)
            }
        } (this, i) )
    }
    // act = host.createArrangerCursorTrack(0, 8)
}

//------------------------------------------------------------------------------

bitwig.on_has_content = function (track, slot, has_clip) {
    // display.set_pad(track, 7 - slot, has_clip ? 0x02 : 0x00)
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
