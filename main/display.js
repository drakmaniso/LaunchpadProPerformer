//------------------------------------------------------------------------------

const maskPulsing = 0x40
const maskBlinking = 0x80

//------------------------------------------------------------------------------

const buttonsAll = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x0a, 0x13, 0x14, 0x1d, 0x1e, 0x27, 0x28, 0x31, 0x32, 0x3b, 0x3c, 0x45, 0x46, 0x4f, 0x50, 0x59,
    0x5b, 0x5c, 0x5d, 0x5e, 0x5f, 0x60, 0x61, 0x62 ]

//------------------------------------------------------------------------------

display = {

}

display.init = function() {

    // Switch to Standalone Mode
    sendSysex("f000202902102101f7")

	// Switch to Program Layout
	sendSysex("f000202902102c03f7")

    this.currentGrid = new Array(128)
    for(var i = 0; i < 128; ++i) {
        this.currentGrid[i] = null
    }
    this.nextGrid = new Array(128)
    for(var i = 0; i < 128; ++i) {
        this.nextGrid[i] = 0
    }

    this.clearAll()
}

//------------------------------------------------------------------------------

display.markAllButtonsModified = function() {
    for(var i = 0; i < 32; ++i) {
        if(this.nextGrid[buttonsAll[i]] === null) {
            this.nextGrid[buttonsAll[i]] = this.currentGrid[buttonsAll[i]]
        }
        this.currentGrid[buttonsAll[i]] = null
    }
}

//------------------------------------------------------------------------------

display.clearAll = function() {
    sendSysex("f000202902100e00f7")
    for(var i = 0; i < 128; ++i) {
        this.currentGrid[i] = 0
    }
};

//------------------------------------------------------------------------------

display.clearMenuButtons = function(color) {
    for(var i = 0; i < 8; ++i) {
        this.setMenuButton(i, color)
    }
}

display.setMenuButton = function(index, color) {
    const buttonsMenu = [0x50, 0x46, 0x3c, 0x32, 0x28, 0x1e, 0x14, 0x0a]

    this.nextGrid[buttonsMenu[index]] = color
}

//------------------------------------------------------------------------------

display.clearArrowButtons = function(color) {
    for(var i = 0; i < 4; ++i) {
        this.setArrowButton(i, color)
    }
}

display.setArrowButton = function(index, color) {
    const buttonsArrow = [0x5b, 0x5c, 0x5d, 0x5e]

    this.nextGrid[buttonsArrow[index]] = color
}

//------------------------------------------------------------------------------

display.clearScreenButtons = function(color) {
    for(var i = 0; i < 4; ++i) {
        this.setScreenButton(i, color)
    }
}

display.setScreenButton = function(index, color) {
    const buttonsScreen = [0x5f, 0x60, 0x61, 0x62]

    this.nextGrid[buttonsScreen[index]] = color
    this.nextGrid[0x63] = color
}

//------------------------------------------------------------------------------

display.clearSceneButtons = function(color) {
    for(var i = 0; i < 8; ++i) {
        this.setSceneButton(i, color)
    }
}

display.setSceneButton = function(index, color) {
    const buttonsScene = [0x59, 0x4f, 0x45, 0x3b, 0x31, 0x27, 0x1d, 0x13]

    this.nextGrid[buttonsScene[index]] = color
}

//------------------------------------------------------------------------------

display.clearBottomButtons = function(color) {
    for(var i = 0; i < 8; ++i) {
        this.setBottomButton(i, color)
    }
}

display.setBottomButton = function(index, color) {
    const buttonsBottom = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]

    this.nextGrid[buttonsBottom[index]] = color
}

//------------------------------------------------------------------------------

display.clearPads = function(color) {
    for(var y = 0; y < 8; ++y) {
        for(var x = 0; x < 8; ++x) {
            this.setPad(x, y, color)
        }
    }
}

display.setPad = function(x, y, color) {
    this.nextGrid[0x0b + x + y * 0x0a] = color
}

//------------------------------------------------------------------------------

display.padIndex = function (x, y) {
    return 0x0b + x + y * 0x0a
}

display.padX = function (index) {
    return (index - 0x0b) % 0x0a
}

display.padY = function (index) {
    return Math.floor((index - 0x0b) / 0x0a)
}

//------------------------------------------------------------------------------

display.flush = function() {
    var idx, cv, nv

    for(var x = 0; x < 8; ++x) {
        for(var y = 0; y < 8; ++y) {
            idx = 0x0b + x + y * 0x0a
            cv = this.currentGrid[idx]
            nv = this.nextGrid[idx]
            if(nv != null && cv != nv) {
                if(nv & maskBlinking) {
                    sendMidi(0x90, idx, 0)
                } else {
                    //println("PAD " + x + ", " + y + " = " + byteToHexString(colors[next_value & 0xff]))
                    sendMidi(0x90, idx, colors[nv & 0xff])
                    this.currentGrid[idx] = nv
                }
            }
        }
    }

    for(var x = 0; x < 8; ++x) {
        for(var y = 0; y < 8; ++y) {
            idx = 0x0b + x + y * 0x0a
            cv = this.currentGrid[idx]
            nv = this.nextGrid[idx]
            if(nv != null && cv != nv) {
                if(nv & maskBlinking) {
                    sendSysex("f0002029021023" + byteToHexString(idx) + byteToHexString(colors[nv & 0x0f]) + "f7")
                }
                this.currentGrid[idx] = nv
            }
        }
    }

    for(var i = 0; i < 32; ++i) {
        idx = buttonsAll[i]
        cv = this.currentGrid[idx]
        nv = this.nextGrid[idx]
        if(nv != null && cv != nv) {
            sendMidi(0xB0, idx, colors[nv & 0xff])
            this.currentGrid[idx] = nv
        }
    }

    cv = this.currentGrid[0x63]
    nv = this.nextGrid[0x63]
    if(nv != null && cv != nv) {
        sendSysex("f000202902100a63" + byteToHexString(colors[nv & 0xff]) + "f7")
        this.currentGrid[0x63] = nv
    }
}

//------------------------------------------------------------------------------

display.drawBigNumber = function (x, y, number, color) {
    switch (number) {
        case 0:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+2, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+2, y+2, color)
            this.setPad(x+0, y+1, color)
            this.setPad(x+2, y+1, color)
            this.setPad(x+0, y+0, color)
            this.setPad(x+1, y+0, color)
            this.setPad(x+2, y+0, color)
            break;
        case 1:
            this.setPad(x+1, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+1, y+3, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+1, y+1, color)
            this.setPad(x+0, y+0, color)
            this.setPad(x+1, y+0, color)
            this.setPad(x+2, y+0, color)
            break;
        case 2:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            this.setPad(x+2, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+2, y+2, color)
            this.setPad(x+0, y+1, color)
            this.setPad(x+0, y+0, color)
            this.setPad(x+1, y+0, color)
            this.setPad(x+2, y+0, color)
            break
        case 3:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            this.setPad(x+2, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+2, y+2, color)
            this.setPad(x+2, y+1, color)
            this.setPad(x+0, y+0, color)
            this.setPad(x+1, y+0, color)
            this.setPad(x+2, y+0, color)
            break
        case 4:
            this.setPad(x+0, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+2, y+2, color)
            this.setPad(x+0, y+1, color)
            this.setPad(x+1, y+1, color)
            this.setPad(x+2, y+1, color)
            this.setPad(x+2, y+0, color)
            break
        case 5:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+2, y+2, color)
            this.setPad(x+2, y+1, color)
            this.setPad(x+0, y+0, color)
            this.setPad(x+1, y+0, color)
            this.setPad(x+2, y+0, color)
            break
        case 6:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+2, y+2, color)
            this.setPad(x+0, y+1, color)
            this.setPad(x+2, y+1, color)
            this.setPad(x+0, y+0, color)
            this.setPad(x+1, y+0, color)
            this.setPad(x+2, y+0, color)
            break
        case 7:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            this.setPad(x+2, y+3, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+2, y+2, color)
            this.setPad(x+2, y+1, color)
            this.setPad(x+2, y+0, color)
            break
        case 8:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+2, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+2, y+2, color)
            this.setPad(x+0, y+1, color)
            this.setPad(x+2, y+1, color)
            this.setPad(x+0, y+0, color)
            this.setPad(x+1, y+0, color)
            this.setPad(x+2, y+0, color)
            break
        case 9:
            this.setPad(x+0, y+0, color)
            this.setPad(x+1, y+0, color)
            this.setPad(x+2, y+0, color)
            this.setPad(x+2, y+1, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+2, y+2, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+2, y+3, color)
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            break
        case 10:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+2, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+2, y+2, color)
            this.setPad(x+0, y+1, color)
            this.setPad(x+2, y+1, color)
            this.setPad(x+0, y+0, color)
            this.setPad(x+2, y+0, color)
            break
        case 11:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+2, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+0, y+1, color)
            this.setPad(x+2, y+1, color)
            this.setPad(x+0, y+0, color)
            this.setPad(x+1, y+0, color)
            break
        case 12:
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+0, y+1, color)
            this.setPad(x+1, y+0, color)
            this.setPad(x+2, y+0, color)
            break
        case 13:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+2, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+2, y+2, color)
            this.setPad(x+0, y+1, color)
            this.setPad(x+2, y+1, color)
            this.setPad(x+0, y+0, color)
            this.setPad(x+1, y+0, color)
            break
        case 14:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+0, y+1, color)
            this.setPad(x+0, y+0, color)
            this.setPad(x+1, y+0, color)
            this.setPad(x+2, y+0, color)
            break
        case 15:
            this.setPad(x+0, y+4, color)
            this.setPad(x+1, y+4, color)
            this.setPad(x+2, y+4, color)
            this.setPad(x+0, y+3, color)
            this.setPad(x+0, y+2, color)
            this.setPad(x+1, y+2, color)
            this.setPad(x+0, y+1, color)
            this.setPad(x+0, y+0, color)
            break
    }
}

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
