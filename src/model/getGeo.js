module.exports = () => {
    var latitude = null;
    var longitude

    navigator.geolocation.getCurrentPosition(
        (position) => {
            var latitude = position.coords.latitude,
            var longitude = position.coords.longitude,
        }
    );
}