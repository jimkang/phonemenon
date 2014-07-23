# Line-separated JSON
syllable-list.json: ../cmudict/cmudict.0.7a
	cat ../cmudict/cmudict.0.7a | node phonemize-syllablize.js syllable-list.json

# 250 Wordnik calls are allowed per minute. This could take a while.
syllablespellings.db: syllable-list.json
	cat syllable-list.json | node matchhypenationstosyllables.js
