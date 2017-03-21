angular
  .module("linkBag", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("ItemFactory", [
    "$resource",
    ItemFactoryFunction
  ])
  .controller("IndexController", [
    "ItemFactory",
    "$state",
    IndexControllerFunction
  ])
  .controller("ShowController", [
    "ItemFactory",
    "$stateParams",
    "$state",
    ShowControllerFunction
  ])

  function Router($stateProvider){
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/js/ng-views/welcome.html"
    })
    .state("index", {
      url: "/items",
      templateUrl: "/assets/js/ng-views/index.html",
      controller: "IndexController",
      controllerAs: "vm"
    })
    .state("show", {
      url: "/items/:name",
      templateUrl: "/assets/js/ng-views/show.html",
      controller: "ShowController",
      controllerAs: "vm"
    })
  }

  function ItemFactoryFunction($resource){
    return $resource("/api/items/:name", {}, {
      update: { method: "PUT" }
    })
  }

  function IndexControllerFunction(ItemFactory, $state) {
    this.items = ItemFactory.query()
    this.newItem = new ItemFactory()
    this.create = function(){
      this.newItem.$save().then(function(item){
        $state.go("show", { name: item.name })
      })
    }
  }

  function ShowControllerFunction(ItemFactory, $stateParams, $state) {
    this.item = ItemFactory.get({ name: $stateParams.name })
    this.update = function(){
      console.log("Updating!");
      this.item.$update({ name: $stateParams.name })
    }
    this.destroy = function(){
      this.item.$delete({ name: $stateParams.name }).then(function(){
        $state.go("index")
      })
    }
  }
