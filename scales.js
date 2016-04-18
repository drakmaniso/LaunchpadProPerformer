//------------------------------------------------------------------------------

scales = [
	[
		{name: "Major", notes: [0, false, 1, false, 2, 3, false, 4, false, 5, false, 6]},
		{name: "Minor", notes: [0, false, 1, 2, false, 3, false, 4, 5, false, 6, false]},
		{name: "Harmonic Minor", notes: [0, false, 1, 2, false, 3, false, 4, 5, false, false, 6]},
		{name: "Melodic Minor", notes: [0, false, 1, 2, false, 3, false, 4, false, 5, false, 6]},
		null,
		{name: "Major Pentatonic", notes: [0, false, 1, false, 2, false, false, 3, false, 4, false, false]},
		{name: "Minor Pentatonic", notes: [0, false, false, 1, false, 2, false, 3, false, false, 4, false]},
		{name: "Blues", notes: [0, false, false, 1, false, 2, 3, 4, false, false, 5, false]}
	],
	[
		{name: "Ionian Mode", notes: [0, false, 1, false, 2, 3, false, 4, false, 5, false, 6]},
		{name: "Dorian Mode", notes: [0, false, 1, 2, false, 3, false, 4, false, 5, 6, false]},
		{name: "Phrygian Mode", notes: [0, 1, false, 2, false, 3, false, 4, 5, false, 6, false]},
		{name: "Lydian Mode", notes: [0, false, 1, false, 2, false, 3, 4, false, 5, false, 6]},
		{name: "Mixolydian Mode", notes: [0, false, 1, false, 2, 3, false, 4, false, 5, 6, false]},
		{name: "Aeolian Mode", notes: [0, false, 1, 2, false, 3, false, 4, 5, false, 6, false]},
		{name: "Locrian Mode", notes: [0, 1, false, 2, false, 3, 4, false, 5, false, 6, false]}
	],
	[
		{name: "Phrygian Dominant", notes: [0, 1, false, false, 2, 3, false, 4, 5, false, 6, false]},
		{name: "Gypsy", notes: [0, 1, false, false, 2, 3, false, 4, 5, false, false, 6]},
		{name: "Hungarian", notes: [0, false, 1, 2, false, false, 3, 4, 5, false, false, 6]},
		{name: "Persian", notes: [0, 1, false, false, 2, 3, 4, false, 5, false, false, 6]},
		null,
		null,
		null,
		null,
	],
	[
		{name: "Japanese Hirajoshi", notes: [0, false, 1, 2, false, false, false, 3, 4, false, false, false]},
		{name: "Japanese In Sen", notes: [0, 1, false, false, false, 2, false, 3, false, false, 4, false]},
		{name: "Japanese Kumoi", notes: [0, false, 1, 2, false, false, false, 3, false, 4, false, false]},
		null,
		null,
		null,
		{name: "Symetric Diminished", notes: [0, false, 1, 2, false, 3, 4, false, 5, 6, false, 7]},
		{name: "Whole Tone", notes: [0, false, 1, false, 2, false, 3, false, 4, false, 5, false]}
	]
]

//------------------------------------------------------------------------------
// Copyright (c) 2015-2016 - Laurent Moussault <moussault.laurent@gmail.com>
