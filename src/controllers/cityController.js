const {Cities} = require('../models/cityModel')
const {calculateDistance} = require('../helpers/distance.js')


const getByTag = async (req, res, next) => {
    try {
        const tag = req.query.tag;
        const isActive = req.query.isActive;
        if (!tag) {
            throw Error(`Missing required parameter in call: ${req.query}`)
        }

        let query = {
            tags: tag
        };

        if (isActive !== undefined) {
            query.isActive = isActive
        }

        const cities = await Cities.find(query).exec()
        res.json({
            success: true, cities: cities
        })
    } catch (e) {
        next(e)
    }
}

const getDistance = async (req, res, next) => {
    try {
        const fromGuid = req.query.from;
        const toGuid = req.query.to;

        if (!fromGuid || !toGuid) {
            throw Error(`Missing required parameter in call: ${req.query}`)
        }

        const fromCity = await Cities.findOne({
            guid: fromGuid
        }).exec()
        const toCity = await Cities.findOne({
            guid: toGuid
        }).exec()

        res.json({
            success: true, from: fromCity, to: toCity, unit: 'km', distance: calculateDistance(fromCity, toCity)
        })
    } catch (e) {
        next(e)
    }
}

const getAllCities = async (req, res) => {
    res.writeHead(200, {
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
        "Content-Type": "application/stream+json",
    });

    const jsonTransform = () => {
        let firstElement = true
        return (data) => {
            if (firstElement) {
                firstElement = false
                return JSON.stringify(data)
            }
            return `,${JSON.stringify(data)}`
        }
    }

    res.write('[')
    Cities.find().cursor({transform: jsonTransform()})
        .on('end', () => {
            res.write(']')
            res.end()
        })
        .pipe(res)
}

exports.getByTag = getByTag
exports.getDistance = getDistance
exports.getAllCities = getAllCities