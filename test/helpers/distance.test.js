const {calculateDistance} = require('../../src/helpers/distance.js')

test('calculateDistance from example points gives expected', async () => {
    const fromCity = {
        "latitude": 46.965565, "longitude": -172.744857,
    }

    const toCity = {
        "latitude": -1.409358, "longitude": -37.257104,
    }

    expect(calculateDistance(fromCity, toCity)).toBe(13376.38)
});
