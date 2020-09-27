document.getElementById("zipForm").addEventListener("submit",getZipInfo);

function getZipInfo(e){
	document.getElementById("output").innerHTML=""
	e.preventDefault();
	let zipInput=document.getElementById("zipInput").value;
	let url=`http://api.zippopotam.us/us/${zipInput}`;
	fetch(url)
		.then(function(response){
			if(response.status!=200){
				document.getElementById("output").innerHTML=`
					<div class="card card-body alert alert-danger mt-4">
						<div class="card-text">
							<h3>Invalid zip code, Please try again</h3>
						</div>
					</div>
				`
			}else{
				return response.json();
			}			
		}).then(function(data){
			console.log(data);
			data.places.forEach(function(place){
				document.querySelector("#output").innerHTML=`
					<div class="card mt-4">
						<div class="card-body bg-primary">
						<h5 class="card-title bg-success country">
							${data.country}
						</h5>
						<h6 class="sub">Abbreviation - ${data['country abbreviation']}</h6>
						<p class="card-text">
							<ul>
								<li><strong>City: </strong>${place['place name']}</li>
								<li><strong>State: </strong>${place['state']}</li>
								<li><strong>Longitude: </strong>${place['longitude']}</li>
								<li><strong>Latitude: </strong>${place['latitude']}</li>
							</ul>
						</p>
						</div>
					</div>
				`
			})
		})
}
