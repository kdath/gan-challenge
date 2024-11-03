const calculateDistance = (fromCity, toCity) => {
    const toRadians = degrees => degrees * (Math.PI / 180);
    const earthRadiusKm = 6371;

    const deltaLatitude = toRadians(toCity.latitude - fromCity.latitude);
    const deltaLongitude = toRadians(toCity.longitude - fromCity.longitude);

    const a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
        Math.cos(toRadians(fromCity.latitude)) * Math.cos(toRadians(toCity.latitude)) *
        Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

    const angularDistance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distanceKm = earthRadiusKm * angularDistance;

    return Math.round(distanceKm * 100) / 100;
}

exports.calculateDistance = calculateDistance