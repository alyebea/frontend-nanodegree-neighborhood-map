var locations = [
      {
        name: 'All'
      },
      {
        name: 'Grand Canyon'
      },
      {
        name: 'Antelope Canyon'
      },
      {
        name: 'Sedona'
      },
      {
        name: 'The Wave'
      },
      {
        name: 'Palatki Cave Dwellings'
      },
      {
        name: 'Verde Valley Camp'
      }
  ];

var Location = function(data) {
    this.name = ko.observable(data.name);
}

var ViewModel = function() {
  var self = this;

  this.locationList = ko.observableArray([]);

  locations.forEach(function(locationsItem) {
    self.locationList.push( new Location(locationsItem) );
  });

  this.currentLocation = ko.observable(this.locationList()[0]);

  this.setLocation = function(clickedLocation) {
    self.currentLocation(clickedLocation);
  };

}

ko.applyBindings(new ViewModel())