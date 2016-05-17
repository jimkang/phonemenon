phonemenon
==========

phonemenon is a library of phoneme-related utilities.

Installation
------------

    npm install phonemenon

Data structures
---------------

<a name="phoneme-group"></a>
There's something I'll refer to as a "phoneme group" which will look like this:

    {
      "word": "EARTHY",
      "phonemes": [
        {
          "phoneme": "ER",
          "stress": 1
        },
        {
          "phoneme": "TH",
          "stress": -1
        },
        {
          "phoneme": "IY",
          "stress": 0
        }
      ]
    }

They'll all have a `word` property that is the word that the phoneme group represents and a `phonemes` array that contains objects that each contain a `phoneme` and a `stress` value. A `stress` of 1 indicates that a phoneme has the primary stress and 2 indicates secondary. 0 indicates no stress and -1 indicates a phoneme that does not start a syllable.

What do all of these things do?
===============================

You can run these scripts via make targets. After you clone this repo, cd into it, run `npm install`, you can run make targets, like `make phoneme-groups-with-syllables.json`, for example.

Makefile targets
----------------

**phoneme-groups-with-syllables.json:** All the phoneme groups derivable from the [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict).

**syllable-follower-analysis.json:** A listing of all the syllables and many times other syllables in the corpus follow them.

**phoneme-follow-frequencies.js** A module that all the phonemes and how many times other phonemes follow them in the corpus.

Scripts
-------

**phoneme-syllable-analyze.js**

A script that pipes [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) text into `syllablize-through`, then pipes that into `syllable-freq-analysis` to get a JSON object that has a key for every possible syllable with a value like this one for "hey/hay":

    "HH-EY": {
      "M-IY": 2,
      "V-IH-NG": 3,
      "M-EY": 3,
      "G-AH-N": 10,
      "V-AH-N": 5,
      "G-AH-N-Z": 3,
      "B-ER": 6,
      "B-AH-L": 1,
      "B-IY": 1,
      "D-AH-N": 7,
      "D-ER": 2,
      "D-IY-Z": 1,
      "D-AH": 2,
      "F-ER": 1,
      "F-IY": 1,
      "G-AA-R": 1,
      ...
    },

The value lists all of the syllables that could follow it, along with the *number of times* that the syllable did follow it. There is a special key called 'START' that lists all the syllables that can start a word.

    cat ../cmudict/cmudict.0.7a | node phoneme-syllable-analyze.js syllable-analysis.json

**phonemize-analyze-ff.js**

A script that converts [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) text into word/phoneme objects, then analyzes those.

    cat cmudict.0.7a | node phonemize-analyze-ff.js out.js --make-module

**phonemize-console.js**

A script that converts CMU text that's piped in via stdin into stringified JSON objects. Usage example:

    cat cmudict.0.7a | node phonemize-console.js

Output will be a whole bunch of [phoneme group](#phoneme-group) JSON objects.

**phonemize-file.js**

A script that uses `cmuTextToPhonemeStream.js` to create a line-separated JSON file full of  [phoneme groups](#phoneme-group). Example.

    cat cmudict.0.7a | node phonemize-file.js phonemes.json

**phonemize-syllablize.js**

A script that pipes [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) lines into `syllablize-through` to get phoneme groups with syllables, then writes those to a file. Example usage:

    cat ../cmudict/cmudict.0.7a | node phonemize-syllablize.js phoneme-groups-with-syllables.json

Or:

    make phoneme-groups-with-syllables.json

Modules
-------

**cmu-text-to-phoneme.js**

A stream that converts lines of text from the [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict), like this –

    EARTHY  ER1 TH IY0

– into [phoneme group](#phoneme-group) objects.

**followerfreq-analysis-stream.js**

A stream that analyzes phoneme groups you write to it, then returns the analysis via the callback when the end is reached. The analysis will be a dictionary with entries for each phoneme and the number of times other phonemes follow it, like so:

    "EH": {
        "K": 2950,
        "N": 4860,
        "S": 2451,
        "F": 474,
        "R": 3885,
        "M": 1406,
        "TH": 181,
        "L": 4080,
        "T": 1947,
        "D": 1331,
        "G": 514,
        "P": 633,
        "SH": 331,
        "V": 655,
        "JH": 236,
        "B": 296,
        "HH": 54,
        "Z": 465,
        "DH": 101,
        "NG": 259,
        "CH": 147,
        "W": 16,
        "ZH": 38,
        "Y": 4,
        "AH": 3,
        "OW": 1,
        "IY": 1
      }

**followfreqs.js**

The output of a run of phoneme-analyze-ff, saved.

**stringify-through.js**

A stream that converts JSON objects into strings.

**syllablefreq-analysis-stream.js**

A stream that analyzes phoneme groups (that have `syllables` properties) you write to it, then returns the analysis: syllables by frequency and following frequency.

**syllablize-through.js**

Creates streams that adds `syllables` properties to [phoneme groups](#phoneme-group). A phoneme group with `syllables` properties looks like this:

    {
      "word": "ABDELLA",
      "phonemes": [
        {
          "phoneme": "AE",
          "stress": 2
        },
        {
          "phoneme": "B",
          "stress": -1
        },
        {
          "phoneme": "D",
          "stress": -1
        },
        {
          "phoneme": "EH",
          "stress": 1
        },
        {
          "phoneme": "L",
          "stress": -1
        },
        {
          "phoneme": "AH",
          "stress": 0
        }
      ],
      "syllables": [
        [
          "AE",
          "B"
        ],
        [
          "D",
          "EH"
        ],
        [
          "L",
          "AH"
        ]
      ]
    }

**typesofphonemes.js**

A module for classifying phonemes into the broad categories "consonantish" and "vowelish".

See also
--------

If you want a two-way mapping between phonemes and words, [see word-phoneme-map](https://github.com/jimkang/word-phoneme-map).

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
