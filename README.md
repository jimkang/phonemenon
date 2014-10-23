phonemenon
==========

phonemenon is a library of phoneme-related utilities.

Installation
------------

    npm install phonemenon

TODO: Add build step to package.json.

What do all of these things do?
-------------------------------

**cmu-text-to-phoneme.js**

A stream that converts lines of text from the [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict), like this –

    EARTHY  ER1 TH IY0

– into objects like this:

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

**phoneme-syllable-analyze.js**


**phonemize-analyze-ff.js**

A script that converts [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) text into word/phoneme objects then analyzes those.

    cat cmudict.0.7a | node phonemize-analyze-ff.js out.js --make-module

`followfreqs.js` is an example of its output.

**phonemize-console.js**

A script that converts CMU text that's piped in via stdin into stringified JSON objects. Usage example:

    cat cmudict.0.7a | node phonemize-console.js

Output will be a whole bunch of JSON objects like this:

    {
      "word": "CONTRITION",
      "phonemes": [
        {
          "phoneme": "K",
          "stress": -1
        },
        {
          "phoneme": "AH",
          "stress": 0
        },
        {
          "phoneme": "N",
          "stress": -1
        },
        {
          "phoneme": "T",
          "stress": -1
        },
        {
          "phoneme": "R",
          "stress": -1
        },
        {
          "phoneme": "IH",
          "stress": 1
        },
        {
          "phoneme": "SH",
          "stress": -1
        },
        {
          "phoneme": "AH",
          "stress": 0
        },
        {
          "phoneme": "N",
          "stress": -1
        }
      ]
    }{
      "word": "CONTRIVANCE",
      "phonemes": [
        {
          "phoneme": "K",
          "stress": -1
        },
        {
          "phoneme": "AH",
          "stress": 0
        },
        {
          "phoneme": "N",
          "stress": -1
        },
        {
          "phoneme": "T",
          "stress": -1
        },
        {
          "phoneme": "R",
          "stress": -1
        },
        {
          "phoneme": "AY",
          "stress": 1
        },
        {
          "phoneme": "V",
          "stress": -1
        },
        {
          "phoneme": "AH",
          "stress": 0
        },
        {
          "phoneme": "N",
          "stress": -1
        },
        {
          "phoneme": "S",
          "stress": -1
        }
      ]
    }

**phonemize-file.js**


**phonemize-syllablize.js**


**stringify-through.js**

A stream that converts JSON objects into strings.

**syllable-analysis.js**


**syllable-list.json**


**syllablefreq-analysis-stream.js**


**syllablize-through.js**


**typesofphonemes.js**


****


Tests
-----

Run tests with `make test`.

[Specification](specification.md)

License
-------

MIT.
