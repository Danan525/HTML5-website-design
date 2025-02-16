
function getAddr() {

	var map = new BMap.Map("allmap");
	var geoc = new BMap.Geocoder();  //地址解析对象
	var markersArray = [];
	var point = new BMap.Point(116.331398, 39.897445);
	map.centerAndZoom(point, 12);

	var geolocation = new BMap.Geolocation();

	//try html5 geolocation
	// if (navigator.geolocation) {
	// 	navigator.geolocation.getCurrentPosition(function(position){
	// 		var pos = {
	// 			lat : position.coords.latitude,
	// 			lng : position.coords.longitude
	// 		};

	// 		var mk = new BMap.Marker(pos);
	// 		map.addOverlay(mk);
	// 		map.panTo(pos);

	// 	},function(){
	// 		handleLocationError(true , infoWindow, map.getCenter());
	// 	});
	// }else{
	// 	//提示不支持html5 geolocation
	// 	handleLocationError(false, infoWindow, map.getCenter());
	// }

	geolocation.getCurrentPosition(function (r) {
		if (this.getStatus() == BMAP_STATUS_SUCCESS) {

			navigator.geolocation.getCurrentPosition(function (position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};


				r.point.lat = pos.lat;
				r.point.lng = pos.lng;

				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				map.panTo(r.point);
				alert('您的位置：' + r.point.lng + ',' + r.point.lat);

				savePosition(r.point.lng, r.point.lat);

			}, function () {
				handleLocationError(true, infoWindow, map.getCenter());
			});
		}
		else {
			alert('failed' + this.getStatus());
		}
	}, { enableHighAccuracy: true });
	map.addEventListener("click", showInfo);//添加点击事件监听

	//点击地图时间处理
	function showInfo(e) {
		document.getElementById('lng').value = e.point.lng;
		document.getElementById('lat').value = e.point.lat;
		geoc.getLocation(e.point, function (rs) {
			var addComp = rs.addressComponents;
			var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
			if (confirm("确定要地址是" + address + "?")) {
				document.getElementById('allmap').style.display = 'none';
				document.getElementById('sever_add').value = address;
			}
		});
		addMarker(e.point);
	}

	function validate() {
		var sever_add = document.getElementsByName('sever_add')[0].value;
		if (isNull(sever_add)) {
			alert('请选择地址');
			return false;
		}
		return true;
	}
	//判断是否是空
	function isNull(a) {
		return (a == '' || typeof (a) == 'undefined' || a == null) ? true : false;
	}

	//清除标识
	function clearOverlays() {
		if (markersArray) {
			for (i in markersArray) {
				map.removeOverlay(markersArray[i])
			}
		}
	}
	//地图上标注
	function addMarker(point) {
		var marker = new BMap.Marker(point);
		markersArray.push(marker);
		clearOverlays();
		map.addOverlay(marker);
	}

}

function getAddrByIP() {
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398, 39.897445);
	map.centerAndZoom(point, 12);

	function myFun(result) {
		var cityName = result.name;
		map.setCenter(cityName);
		alert("当前定位城市:" + cityName);
	}
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);
}
function getAddrBySDK() {
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398, 39.897445);
	map.centerAndZoom(point, 12);

	var geolocation = new BMap.Geolocation();
	// 开启SDK辅助定位
	geolocation.enableSDKLocation();
	geolocation.getCurrentPosition(function (r) {
		if (this.getStatus() == BMAP_STATUS_SUCCESS) {
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			alert('您的位置：' + r.point.lng + ',' + r.point.lat);
		}
		else {
			alert('failed' + this.getStatus());
		}
	});
}
function getAddrFromGoogle() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: -34.397, lng: 150.644 },
		zoom: 6
	});
	var infoWindow = new google.maps.InfoWindow({ map: map });

	//try html5 geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent('已定位您所在位置...');
			map.setCenter(pos);
			console.log('位置：', pos);

		}, function () {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		//提示不支持html5 geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');


}

function getAddrInfoFromLatLng() {

	const latitude = $("#lat").val();
	const longitude = $("#lng").val();

	if (latitude == "" || longitude == "") {
		alert("请输入经纬度");
		return;
	}

	// 使用百度地理编码服务进行逆地址解析
	$.ajax({
		url: 'https://restapi.amap.com/v3/geocode/regeo',
		data: {
			key: '1aa8c7a92d0bab5a8d77997978bdc32c',
			location: `${longitude},${latitude}`,
		},
		success: function (response) {
			const address = response.regeocode.formatted_address;
			console.log('逆地址解析结果：', address);

			// 将id=server_address的input的值设置为address
			$("#server_address").val(address);
		}
	});
}



function savePosition(lng, lat) {
	$("#lng").attr("value", lng);
	$("#lat").attr("value", lat);
}
