MarioApp = new Backbone.Marionette.Application();
//========================================================================
var ConnectionTypeModel = Backbone.Model.extend({});
var ConnectionTypeCollection = Backbone.Collection.extend({
  model: ConnectionTypeModel,
});
//--------------------------------------------------
var ConnectionModel = Backbone.Model.extend({
  defaults: {
    name: ' - = * = -',
  },
  initialize: function() {
    this.set('name', this.get('ctype').get('name') +"_"+this.get('gender')+'_'+this.get());
  }
});
var ConnectionCollection = Backbone.Collection.extend({
  model: ConnectionModel,
});
//========================================================================
var ConnectionTypeView = Backbone.Marionette.ItemView.extend({
  template: '#connTypeItemView'
});
var ConnectionTypeEmptyView = Backbone.Marionette.ItemView.extend({
  template: '#connTypeEmptyView'
}); 
var ConnectionTypeListView = Backbone.Marionette.CollectionView.extend({
  itemView: ConnectionTypeView,
  emptyView: ConnectionTypeEmptyView
});
//========================================================================
var ConnectionView = Backbone.Marionette.ItemView.extend({
  template: '#connItemView'
});
var ConnectionEmptyView = Backbone.Marionette.ItemView.extend({
  template: '#connEmptyView'
}); 
var ConnectionListView = Backbone.Marionette.CollectionView.extend({
  itemView: ConnectionView,
  emptyView: ConnectionEmptyView
});
//========================================================================
var UnitModel = Backbone.Model.extend({
  defaults: {
    "name":  "",
    "color": 0x822222,
    "connections": new ConnectionCollection(),
}
});
var UnitCollection = Backbone.Collection.extend({
  model: UnitModel,
});
//========================================================================
MarioApp.addRegions({
  connTypeListRegion: "#connTypeList",
  connListRegion: "#connList",
  unitListRegion: "#unitList"
});
MarioApp.addInitializer(function(){

  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  var con_type_1 = new ConnectionTypeModel({name: 'thread', gender: true, demountable: true, sizes: ['1/2"', '5/8"', '3/4"', '7/8"', '1"', '1,5"', '2"']});
  MarioApp.connectionTypes = new ConnectionTypeCollection([con_type_1,]);

  var con1 = new ConnectionModel({ctype: con_type_1, gender: 'M', size: '1/2"'});
  var con2 = new ConnectionModel({ctype: con_type_1, gender: 'F', size: '1/2"'});

  MarioApp.connections = new ConnectionCollection([con1, con2]);
  MarioApp.units = new UnitCollection([ 
    { Name:        "Муфта", 
      connections: [
        {ctype: con1, position: {X: 0, Y: 0, Z: 6}, rotation: {X: 0, Y: 0, Z: 0}},
        {ctype: con2, position: {X: 0, Y: 0, Z: -6}, rotation: {X: 0, Y: 0, Z: 0}},
      ]
    },
    { Name: "Уголок", 
      Color: 0x660000, 
      connections: [
        {ctype: con1, position: {X: 0, Y: 6, Z: 0}, rotation: {X: 90, Y: 0, Z: 0}},
        {ctype: con2, position: {X: 0, Y: 0, Z: -6}, rotation: {X: 0, Y: 0, Z: 0}},
      ]
    },
    { Name: "Тройник", 
      Color: 0x006600, 
      connections: [
        {ctype: con1, position: {X: 0, Y: 0, Z: 6}, rotation: {X: 0, Y: 0, Z: 0}},
        {ctype: con1, position: {X: 0, Y: 6, Z: 0}, rotation: {X: 90, Y: 0, Z: 0}},
        {ctype: con2, position: {X: 0, Y: 0, Z: -6}, rotation: {X: 0, Y: 0, Z: 0}},
      ]
    },
  ]);
  MarioApp.connTypeListRegion.show(new ConnectionTypeListView({collection: MarioApp.connectionTypes}));
  MarioApp.connListRegion.show(new ConnectionListView({collection: MarioApp.connections}));
});


  MarioApp.start();
/*
MarioApp.on('initialize:after', function(options) {
	console.log('Initialization Finished');
});
MarioApp.on('start', function(options) {
	Backbone.history.start(); // Great time to do this
});

var SomeModule = function(o){
	// Constructor for SomeModule
};

*/

//============================================================
/*
var UnitModel = Backbone.Model.extend({
defaults: {
"Name":  "",
"Color": 0x822222,
"connections": [],
}
});
var UnitCollection = Backbone.Collection.extend({
model: UnitModel,
});
var units = new UnitCollection([ // 
  { Name:        "Муфта", 
    connections: [
      {ctype: 'thread_3/4_M', position: {X: 0, Y: 0, Z: 6}, rotation: {X: 0, Y: 0, Z: 0}},
      {ctype: 'thread_3/4_F', position: {X: 0, Y: 0, Z: -6}, rotation: {X: 0, Y: 0, Z: 0}},
    ]
  },
  { Name: "Уголок", 
    Color: 0x660000, 
    connections: [
      {ctype: 'thread_3/4_M', position: {X: 0, Y: 6, Z: 0}, rotation: {X: 90, Y: 0, Z: 0}},
      {ctype: 'thread_3/4_F', position: {X: 0, Y: 0, Z: -6}, rotation: {X: 0, Y: 0, Z: 0}},
    ]
  },
  { Name: "Тройник", 
    Color: 0x006600, 
    connections: [
      {ctype: 'thread_3/4_M', position: {X: 0, Y: 0, Z: 6}, rotation: {X: 0, Y: 0, Z: 0}},
      {ctype: 'thread_3/4_M', position: {X: 0, Y: 6, Z: 0}, rotation: {X: 90, Y: 0, Z: 0}},
      {ctype: 'thread_3/4_F', position: {X: 0, Y: 0, Z: -6}, rotation: {X: 0, Y: 0, Z: 0}},
    ]
  },
]);
//============================================================

//============================================================
var Controller = Backbone.Router.extend({
routes: {
"": "start", // Пустой hash-тэг
"!/": "start", // Начальная страница
"!/success": "success", // Блок удачи
"!/error": "error" // Блок ошибки
},

start: function () {
$(".routing-block").hide(); // Прячем все блоки
$("#start").show(); // Показываем нужный
$("ul.nav li").removeClass('active');
$("#m_item_start").addClass('active');
},

success: function () {
$(".routing-block").hide();
$("#success").show();
$("ul.nav li").removeClass('active');
$("#m_item_success").addClass('active');
},

error: function () {
	       $(".routing-block").hide();
	       $("#error").show();
	       $("ul.nav li").removeClass('active');
	       $("#m_item_error").addClass('active');
       }
});

//==================================================================
var controller = new Controller(); // Создаём контроллер
Backbone.history.start();  // Запускаем HTML5 History push   
//==================================================================




var UnitDetailView = Backbone.View.extend({
  el: $("#unit-detail"), // DOM элемент widget'а
  model: appState,
  initialize: function () { // Подписка на событие модели
    this.model.bind('change', this.render, this);
  },
  templates: {
    "empty": _.template($('#udetail-empty').html()),
    "show":  _.template($('#udetail-show').html()),
    "edit":  _.template($('#udetail-edit').html()),
  },
  events: {
    "click #edit_unit": "active_unit_to_edit_mode",
    "click #view_unit": "active_unit_to_show_mode",
  },
  active_unit_to_edit_mode: function () {
    this.model.set("state", "edit");
  },
  active_unit_to_show_mode: function () {
    this.model.set("state", "show");
  },
  test_event: function () {
    alert('test_event');
    this.render();
  },
  render: function () {
    var unit_state = this.model.get("state");
    $(this.el).html(this.templates[unit_state](this.model.get('active_unit').toJSON()));
  }
});
//=================================================================
var unit_detail = new UnitDetailView();
//==================================================================
var StartView = Backbone.View.extend({
el: $("#start"), // DOM элемент widget'а
events: {
"click a": "test_event" // Обработчик клика на кнопке "Проверить"
},
test_event: function () {
//alert('WoW');
//controller.navigate("success", true); // переход на страницу success
this.render();
},
render: function () {
list_ul = $(this.el).find('ul#unit-list');
list_ul.empty();
units.each(function(mel){
	list_ul.append('<li><a href="#" onclick="set_active('+"'"+mel.cid+"'"+')">'+mel.get("Name")+'</a></li>')
	})
}
});
//=================================================================
var start = new StartView();
var container, stats;
var camera, controls, scene, renderer;
var cross;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 50;

	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', render );

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

	// world

	var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
	var material =  new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading } );

	holder_obj = new THREE.Mesh( new THREE.SphereGeometry( 0.5, 16, 8 ), material );
	scene.add( holder_obj );
        scene.add( new THREE.AxisHelper( 10 ) );
	// lights

	light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	scene.add( light );

	light = new THREE.DirectionalLight( 0x002288 );
	light.position.set( -1, -1, -1 );
	scene.add( light );

	light = new THREE.AmbientLight( 0x222222 );
	scene.add( light );


	// renderer

	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setClearColor( scene.fog.color, 1 );
	renderer.setSize( window.innerWidth, window.innerHeight );

	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );

	stats = new Stats();
	stats.domElement.style.zIndex = 100;
	//container.appendChild( stats.domElement );
        $('ul.nav.nav-list li.nav-header:first').append( stats.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "310px";
	//renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}

function animate() {

	requestAnimationFrame( animate );
	controls.update();

}

function render() {

	renderer.render( scene, camera );
	stats.update();
}

function set_active(cid){
        //alert('W'+cid);
	if( holder_obj.children ){
		while( holder_obj.children.length!=0  ) {
			var len = holder_obj.children.length;
			holder_obj.remove( holder_obj.children[len -1 ] );
			scene.remove( holder_obj.children[len -1 ] );
		}
	}
	var unit = units.get(cid);
        var material = new THREE.MeshBasicMaterial( { color: unit.get('Color') } );
        appState.set( {state: "show", active_unit: unit} );
	var no = new THREE.Object3D();
	var con_geom = new THREE.PlaneGeometry( 2, 2 );
	_.each(unit.get('connections'), function(con){ 
	  var con_object = new THREE.Mesh( con_geom, material );
          con_object.material.side = THREE.DoubleSide;
          no.add( con_object );
          con_object.position.set(con.position.X, con.position.Y, con.position.Z); 
          con_object.rotation.set(con.rotation.X * Math.PI / 180, con.rotation.Y * Math.PI / 180, con.rotation.Z * Math.PI / 180); 
	}); 
	holder_obj.add( no ); 
        render();
}
//==================================================================
onWindowResize();

*/
