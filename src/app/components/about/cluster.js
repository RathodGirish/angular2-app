MarkerClusterer.prototype.createClusters_ = function() {
  if (!this.ready_) {
    return;
  }

  for (var i = 0, marker; marker = this.markers_[i]; i++) {
    //if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {    
    if (!marker.isAdded) {    
      this.addToClosestCluster_(marker);
    }
  }
};

function initMap(data) {
    var center = new google.maps.LatLng(59.339025,18.065818);

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

 
    var markers = [];
    for (var i = 0; i < data.photos.length; i++) {
        var dataPhoto = data.photos[i];
        var latLng = new google.maps.LatLng(dataPhoto.latitude,dataPhoto.longitude);
        var marker = new google.maps.Marker({
            position: latLng
        });
        markers.push(marker);
    }
    markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m' });

    google.maps.event.addListenerOnce(map, 'idle', function(){
        console.log("Total number of clusters: " + markerCluster.getTotalClusters());
    });
}
google.maps.event.addDomListener(window, 'load', 
function(){
    initMap({
    "count": 10785236,
    "photos": [
        {
            "photo_id": 27932,
            "photo_title": "Atardecer en Embalse",
            "photo_url": "http://www.panoramio.com/photo/27932",
            "photo_file_url": "http://mw2.google.com/mw-panoramio/photos/medium/27932.jpg",
            "longitude": -64.404945,
            "latitude": -32.202924,
            "width": 500,
            "height": 375,
            "upload_date": "25 June 2006",
            "owner_id": 4483,
            "owner_name": "Miguel Coranti",
            "owner_url": "http://www.panoramio.com/user/4483"
        },
        {
            "photo_id": 522084,
            "photo_title": "In Memoriam Antoine de Saint ExupÃ©ry",
            "photo_url": "http://www.panoramio.com/photo/522084",
            "photo_file_url": "http://mw2.google.com/mw-panoramio/photos/medium/522084.jpg",
            "longitude": 17.470493,
            "latitude": 47.867077,
            "width": 500,
            "height": 350,
            "upload_date": "21 January 2007",
            "owner_id": 109117,
            "owner_name": "Busa PÃ©ter",
            "owner_url": "http://www.panoramio.com/user/109117"
        }],
    });
});