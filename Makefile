CMUDICT = ext/cmudict.0.7a

phoneme-groups-with-syllables.json: $(CMUDICT)
	cat $(CMUDICT) | node phonemize-syllablize.js phoneme-groups-with-syllables.json

syllable-follower-analysis.json: $(CMUDICT)
	cat $(CMUDICT) | node phoneme-syllable-analyze.js syllable-follower-analysis.json

phoneme-follow-frequencies.js: $(CMUDICT)
	cat $(CMUDICT) | node phonemize-analyze-ff.js --make-module > phoneme-follow-frequencies.js

phoneme-follow-frequencies-in-syllables.json: $(CMUDICT)
	cat $(CMUDICT) | node phonemize-analyze-ff.js --make-module --analyze-in-syllables > phoneme-follow-frequencies-in-syllables.js

phoneme-preceding-frequencies-in-syllables.json: $(CMUDICT)
	cat $(CMUDICT) | node phonemize-analyze-ff.js --make-module --analyze-in-syllables --reverse true > phoneme-preceding-frequencies-in-syllables.js

test-followerfreq-analysis-stream: test/phoneme-follow-frequencies-baseline.js
	rm phoneme-follow-frequencies.js
	make phoneme-follow-frequencies.js
	diff phoneme-follow-frequencies.js test/phoneme-follow-frequencies-baseline.js

test-followerfreq-syllable: test/phoneme-follow-frequencies-in-syllables-baseline.js
	rm phoneme-follow-frequencies-in-syllables.js
	make phoneme-follow-frequencies-in-syllables.js
	diff phoneme-follow-frequencies-in-syllables.js test/phoneme-follow-frequencies-in-syllables-baseline.js
