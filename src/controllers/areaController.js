const {Areas} = require('../models/areaModel')
const {Cities} = require('../models/cityModel')
const {host, port} = require('../config')
const {calculateDistance} = require('../helpers/distance.js')

const getAreaResult = async (req, res, next) => {
    try {
        const guid = req.params.guid

        const result = await Areas.findOne({
            guid: guid
        }).exec()

        if (result.status === 'processing') {
            res.sendStatus(202)
        }
        if (result.status === 'done') {
            res.status(200).json(result)
        }
    } catch (e) {
        next(e)
    }
}

const calculateCitiesInArea = async (req, res, next) => {
    try {
        const fromGuid = req.query.from;
        const maxDistance = req.query.distance

        if (!fromGuid || !maxDistance) {
            throw Error(`Missing required parameter in call: ${req.query}`)
        }
        // Hardcoded guid || crypto.randomUUID();
        let guid = '2152f96f-50c7-4d76-9e18-f7033bd14428';

        // Create processing object (Upsert to handle hardcoded guid)
        await Areas.findOneAndUpdate(
            {},
            {guid: guid, cities: [], status: 'processing'},
            {upsert: true, useFindAndModify: false})

        new Promise(async () => {
            const fromCity = await Cities.findOne({
                guid: fromGuid
            }).exec();

            const allCities = await Cities.find().exec()

            let filteredCities = allCities.filter(city => {
                if (city.guid === fromCity.guid) {
                    return false
                }
                const distance = calculateDistance(fromCity, city)
                return distance <= maxDistance
            });

            // Update Area object with results
            await Areas.findOneAndUpdate(
                {guid: guid},
                {cities: filteredCities, status: 'done'},
                {useFindAndModify: false}).exec()
        });

        res.status(202).json({
            resultsUrl: `http://${host}:${port}/area-result/${guid}`
        })
    } catch (e) {
        next(e)
    }
}

exports.getAreaCities = calculateCitiesInArea
exports.getAreaResult = getAreaResult