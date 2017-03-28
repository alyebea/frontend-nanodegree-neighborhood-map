<script type="text/javascript">
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

            var locations = [
                {title: 'Grand Canyon', location: {lat: 35.9743629, lng: -112.1267479}},
                {title: 'Antelope Canyon', location: {lat: 36.952766, lng: -111.4412668}},
                {title: 'Sedona', location: {lat: 34.86, lng: -111.789167}},
                {title: 'The Wave', location: {lat: 36.996067, lng: -112.006083}},
                {title: 'Palatki Cave Dwellings', location: {lat: 34.9156, lng: -111.9022}},
                {title: 'Verde Valley Camp', location: {lat: 34.6717463, lng: -111.9407988}}
            ];

            var largeInfowindow = new google.maps.InfoWindow();

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
              var title = locations[i].title;
              // Create a marker per location, and put into markers array.
              var marker = new google.maps.Marker({
                position: position,
                title: title,
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
            // This function will loop through the markers array and display them all.
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

            }
        }
        </script>