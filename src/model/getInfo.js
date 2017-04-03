import getDate from './getDate'

module.exports = async function getInfo() {

    var latitude = await getGeo();
    console.log(latitude);

    return latitude;
}


function getGeo() {
    var latitude;
    var longitude;
    navigator.geolocation.getCurrentPosition(
        (position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            return latitude;
        });


}
