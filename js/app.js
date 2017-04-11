//Model
var locations = [
      {
        name: 'Grand Canyon',
        location: {lat: 35.9743629, lng: -112.1267479},
        value: 1
      },
      {
        name: 'Antelope Canyon',
        location: {lat: 36.952766, lng: -111.4412668},
        value: 2
      },
      {
        name: 'Sedona',
        location: {lat: 34.86, lng: -111.789167},
        value: 3
      },
      {
        name: 'The Wave',
        location: {lat: 36.996067, lng: -112.006083},
        value: 4
      },
      {
        name: 'Palatki Cave Dwellings',
        location: {lat: 34.9156, lng: -111.9022},
        value: 5
      },
      {
        name: 'Verde Valley Camp',
        location: {lat: 34.6717463, lng: -111.9407988},
        value: 6
      }
  ];

var Location = function(data) {
    this.name = ko.observable(data.name);
}

/* Map Elements */
    var map;

    var markers=[];

    function initMap() {
        var styles = [
        {elementType: 'geometry', stylers: [{color: '#FDF3DC'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#742D34'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#FFEAC0'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#FFEAC0'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#DE5F4E'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#A8F3BA'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#5D2A23'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#F6FEDD'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#EEFFEF'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#FFE8BE'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#9B201B'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#7EC5D3'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
    ];

    map = new google.maps.Map(document.getElementById('map'), {
        center:{lat: 35.9743629, lng: -112.1267479},
        zoom: 8,
        styles: styles,
        mapTypeControl: false
    });

    function googleError() {
      var message = "Failed to load Google Map";

      addMessage(message);
    };

    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }
     // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('29E058');

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      var position = locations[i].location;
      var name = locations[i].name;
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        position: position,
        name: name,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: i
      });
      // Push the marker to our array of markers.
      markers.push(marker);
      // Create an onclick event to open the large infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      });
      // Two event listeners - one for mouseover, one for mouseout,
      // to change the colors back and forth.
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
    };

    function showPlaces() {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
    };

    showPlaces();

    var largeInfowindow = new google.maps.InfoWindow();
    function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
      if (infowindow.marker != marker) {
      // Clear the infowindow content to give the streetview time to load.
      infowindow.marker = marker;
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
        });
      infowindow.open(map, marker);
      infowindow.setContent('<div>' + marker.name + '</div>');
      };
  }
}

//View model
var ViewModel = function() {
  var self = this;

  this.locationList = ko.observableArray([]);

  locations.forEach(function(locationsItem) {
    self.locationList.push( new Location(locationsItem) );
  });

  this.currentLocation = ko.observable(this.locationList()[0]);

  this.selectLocation = function(locationsItem) {
    self.populateInfoWindow(this, largeInfowindow);
    };
}

ko.applyBindings(new ViewModel())

