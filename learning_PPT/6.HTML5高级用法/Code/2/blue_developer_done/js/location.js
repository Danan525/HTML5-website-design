	
function getAddr(){

	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398,39.897445);
	map.centerAndZoom(point,12);

	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			alert('您的位置：'+r.point.lng+','+r.point.lat);
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
}
function getAddrFromGoogle(){
	var map = new google.maps.Map(document.getElementById('map'),{
		center: {lat: -34.397, lng: 150.644},
		zoom:6
	});
	var infoWindow = new google.maps.InfoWindow({map: map});

	//try html5 geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			var pos = {
				lat : position.coords.latitude,
				lng : position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent('已定位您所在位置...');
			map.setCenter(pos);
			console.log('位置：',pos);

		},function(){
			handleLocationError(true , infoWindow, map.getCenter());
		});
	}else{
		//提示不支持html5 geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}
function handleLocationError(browserHasGeolocation, infoWindow, pos){
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ? 
						'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');


}