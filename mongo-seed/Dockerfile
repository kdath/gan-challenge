FROM mongo

COPY addresses.json /addresses.json
CMD mongoimport --host mongo --db citydb --collection cities --type json --file /addresses.json --jsonArray