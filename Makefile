CMUDICT = ext/cmudict.0.7a

phoneme-groups-with-syllables.json: $(CMUDICT)
	cat $(CMUDICT) | node phonemize-syllablize.js phoneme-groups-with-syllables.json

syllable-follower-analysis.json: $(CMUDICT)
	cat $(CMUDICT) | node phoneme-syllable-analyze.js syllable-follower-analysis.json

phoneme-follow-frequencies.js: $(CMUDICT)
	cat $(CMUDICT) | node phonemize-analyze-ff.js --make-module > phoneme-follow-frequencies.js
