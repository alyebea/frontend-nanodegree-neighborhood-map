
"use strict";

//Model
var locations = [
    {
      name: 'Rockland Bakery',
      location: {lat: 41.100032, lng: -73.999976},
      value: 1,
      category: 'Food'
    },
    {
      name: 'Patisserie Didier Dumas',
      location: {lat: 41.091596, lng: -73.922681},
      value: 2,
      category: 'Food'
    },
    {
      name: 'Posa Posa',
      location: {lat: 41.091472, lng: -74.003912},
      value: 3,
      category: 'Food'
    },
    {
      name: 'Peekskill Brewery',
      location: {lat: 41.286954, lng: -73.928955},
      value: 4,
      category: 'Shopping'
    },
    {
      name: 'Jean-Jaques Culinary Creations',
      location: {lat: 41.132992, lng: -73.792726},
      value: 5,
      category: 'Food'
    },
    {
      name: 'Le Bouchon',
      location: {lat: 41.417913, lng: -73.958186},
      value: 6,
      category: 'Shopping'
    },
    {
      name: 'Palisades Mall',
      location: {lat: 41.098037, lng: -73.956764},
      value: 7,
      category: 'Shopping'
    },
    {
      name: 'The Shops at Nanuet',
      location: {lat: 41.095844, lng: -74.015929},
      value: 8,
      category: 'Shopping'
    },
    {
      name: 'The Westchester',
      location: {lat: 41.031515, lng: -73.758551},
      value: 9,
      category: 'Shopping'
    },
    {
      name: 'Veterans Memorial Park',
      location: {lat: 41.090476, lng: -73.919462},
      value: 10,
      category: 'Outdoor Activities'
    },
    {
      name: 'Bear Mountain State Park',
      location: {lat: 41.311888, lng: -73.988696},
      value: 11,
      category: 'Outdoor Activities'
    },
    {
      name: 'The Haverstraw Marina',
      location: {lat: 41.216742, lng: -73.967936},
      value: 12,
      category: 'Outdoor Activities'
    },
    {
      name: 'Rockland Lake',
      location: {lat: 41.164732, lng: -73.931705},
      value: 13,
      category: 'Outdoor Activities'
    }
  ];




/** Styles the map **/
var styles = [
    {
      elementType: 'geometry',
      stylers: [{color: '#FFF3EA'}]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{color: '#742D34'}]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{color: '#FFEAC0'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#FFEAC0'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#579C47'}]
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
      stylers: [{color: '#E3E2D6'}]
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
      stylers: [{color: '#DCD7D5'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#C3C5C1'}]
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




//View model
var ViewModel = function() {
  var self = this;

  var map;
  var largeInfowindow;
  var markers = [];
  var currentMarker;


  // Style the markers a bit. This will be our listing marker icon.
  var defaultIcon = makeMarkerIcon('0091ff');
  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  var highlightedIcon = makeMarkerIcon('29E058');
  /**
   *
   */
  function createMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center:{lat: 41.216742, lng: -73.967936},
        zoom: 3,
        styles: styles,
        mapTypeControl: false
    });
  }

  /**
   *
   */
  function showPlaces() {
      var bounds = new google.maps.LatLngBounds();
      // Extend the boundaries of the map for each marker and displays the marker
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
      }
      map.fitBounds(bounds);
  };

  /**
   *
   */
  function initMap() {
    createMap();
    createInfoWindow();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      var marker = createMarker(locations[i], i);
      // Push the marker to our array of markers.
      markers.push(marker);
    };

    showPlaces();
  }

  /**
   *
   */
  function createMarker(location, i) {
      var position = location.location;
      var name = location.name;
      var category = location.category;

      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        position: position,
        name: name,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: i
      });
      // Create an onclick event to open the large infowindow at each marker.
      marker.addListener('click', function() {
        currentMarker = this;
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

      return marker;
  }

  /**
   *
   */
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

  /**
   *
   */
  function createInfoWindow() {
    largeInfowindow = new google.maps.InfoWindow();
  }

  /**
  Pulls in flickr content according to location
  **/
  // function flickr() {
  //     // Get the position from the location array.
  //     var latlong = (locations[i], i);

  //     for (var i = 0; i < locations.length; i++) {

  //     var flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon=" + latlong + "&api_key=8a6534b1aada1cc326cce22ece45b12f&secret=77c17bd4a3aafa95"
  //   };
  //   return flickrAPI;
  // }

  /**
   *
   */
  function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      // Clear the infowindow content to give the streetview time to load.
      infowindow.marker = marker;
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }

    infowindow.open(map, marker);
    infowindow.setContent('<div>' + marker.name + '</div>');
  }


  //Connects sidebar locations to markers on map
  this.selectLocation = function(locationsItem) {
    if (currentMarker) {
      currentMarker.setIcon(defaultIcon);
    }
    var markerIndex = locationsItem.markerIndex;
    var markerIndexOffset = 1;
    var marker = markers[markerIndex - markerIndexOffset];

    populateInfoWindow(marker, largeInfowindow);
    currentMarker = marker;

    marker.setIcon(highlightedIcon);
  };


  // var filterMarkers = function(locationsItem) {
  //   for (i = 0; i < markers.length; i++) {

  //       // If is same category or category not picked
  //       if (marker.category == category || category.length === 0) {
  //           marker.setVisible(true);
  //       }
  //       // Categories don't match
  //       else {
  //           marker.setVisible(false);
  //       }
  //     }
  // };



//Location data
  var Location = function(data) {
    this.name = ko.observable(data.name);
    this.markerIndex = data.value;
    this.category = ko.observable(data.category);
}



  // Initialization
  this.locationList = ko.observableArray([]);

  locations.forEach(function(locationsItem) {
    self.locationList.push( new Location(locationsItem) );
  });

  this.currentLocation = ko.observable(this.locationList()[0]);

  // this.currentLocation = ko.observableArray([]);

  this.categories = ["All", "Food", "Shopping", "Outdoor Activities"];
  this.selectedCategory = ko.observable(this.categories[0]);


  initMap();
}



function initApp() {
  ko.applyBindings(new ViewModel());
}


