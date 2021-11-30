window.addEventListener('load', ()=>{
	let lon;
	let lat;
	let API = 'db4a8920be1d7fd1361d2f4108c1bc9c';

    let temperaturaValor = document.getElementById('temperatura-valor'); 
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');  
    
    let descripcion = document.getElementById('descripcion');
    let ubicacion = document.getElementById('ubicacion');  
    let iconoAnimado = document.getElementById('icono-animado'); 
    let humedad = document.getElementById('humedad')
    let vientoVelocidad = document.getElementById('viento-velocidad');
    let presion = document.getElementById('presion')

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(posicion =>{
			lon = posicion.coords.longitude;
			lat = posicion.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`

            // console.log(url);
            //peticion a la api
            fetch(url)
              .then( response => { return response.json() })
              .then( data => {
               console.log(data.main.temp);
               let temp = Math.round(data.main.temp)
               temp = temp - 273
               temperaturaValor.textContent = `${temp} °C`;
               console.log(data.sys.country);
               console.log(data.name);
               let pais = (data.sys.country);
               let ciudad = (data.name);
               let sitio = pais + ", " + ciudad;
               ubicacion.textContent = `${sitio}`;
               let Humedad = (data.main.humidity);
               humedad.textContent = `Nivel de humedad: ${Humedad}` 
               iconoAnimado.src='animated/thunder.svg'
               vientoVelocidad.textContent = `Velocidad del viento: ${data.wind.speed} m/s`
               presion.textContent = `Presión: ${data.main.pressure}`
               let desc = data.weather[0].description
               temperaturaDescripcion.textContent = desc.toUpperCase()

               switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/tormenta.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/lluvia.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.png'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/sol.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/clouds.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  };
             });
		});
	};
});
