// -----------------------------------------------------------------------------

var bitwig = {
}

// -----------------------------------------------------------------------------

bitwig.init = function () {
  this.trackBank = host.createMainTrackBank(8, 1, 8)
  this.trackBank.addChannelCountObserver(function (c) {
    // println("COUNT: " + c.toString())
  })
  for (var i = 0; i < 8; i++) {
    var t = this.trackBank.getChannel(i)
    t.addPositionObserver(function (bw, idx) {
      return function (position) {
        // println("Track " + idx.toString() + " is at " + position.toString())
      }
    }(this, i))
    t.addNameObserver(16, '', (function (bw, idx) {
      return function (name) {
        // println("Track " + idx.toString() + " is named " + name)
      }
    }(this, i)))
    var cls = t.getClipLauncherSlots()
    cls.setIndication(true)
    cls.addHasContentObserver(function (bw, track) {
      return function (slot, has_clip) {
        // println("HasContent: " + track.toString() + ", " + slot.toString() + ": " + has_clip.toString())
        bw.onHasContent(track, slot, has_clip)
      }
    }(this, i))
  }
  // act = host.createArrangerCursorTrack(0, 8)

  // this.arrangerCursor = host.createArrangerCursorTrack(0, 8)
  // this.cursor = host.createCursorTrack("Playpad", 0, 8)
  // var c = this.cursor.createMainTrackBank(1, 0, 0, false)
  // this.cursor.selectChannel(c.getChannel(0))
  // this.arrangerCursor.addNameObserver(16, '', function (name) {
  //   println('Cursor Track is named "' + name + '"')
  // })
  // this.arrangerCursor.selectFirst()
  // this.arrangerCursor.selectNext()
  // this.arrangerCursor.selectNext()
  // this.arrangerCursor.selectLast()
}

// -----------------------------------------------------------------------------

bitwig.onHasContent = function (track, slot, has_clip) {
  // display.setPad(track, 7 - slot, has_clip ? 0x02 : 0x00)
}

// -----------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
