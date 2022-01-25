window.addEventListener("load", () => {
  let longitud
  let latitud

    let temperaturaValor = document.getElementById("temperatura-valor")
    let temperaturaDescripcion = document.getElementById("temperatura-descripcion")

    let ubicacion = document.getElementById("ubicacion")
    let iconoAnimado = document.getElementById("icono-animado")
    let vientoVelocidad = document.getElementById("viento-velocidad")

  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(posicion => {
        
        longitud = posicion.coords.longitude
        latitud = posicion.coords.latitude


        //Ubicacion Actual
       const ciudad  = `http://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${latitud}&lon=${longitud}&appid=6a3b130f8cc2a2577fac82539b3ca3cb`
       console.log(ciudad);


        // Unicacion Por Ciudad
        //const pais = `http://api.openweathermap.org/data/2.5/weather?q=Ecuador&lang=es&units=metric&appid=6a3b130f8cc2a2577fac82539b3ca3cb`
        

        fetch(ciudad)
          .then(res => { return res.json()})
          .then(data => {
          
            let temperatura = Math.round(data.main.temp)
            temperaturaValor.textContent = `${temperatura} °C`
            
            let descripcion = data.weather[0].description
            temperaturaDescripcion.textContent = descripcion.toUpperCase()
            
            let ciudad = data.name
            ubicacion.textContent = ciudad

            let velocidad = data.wind.speed
            vientoVelocidad.textContent = `${velocidad} m/s`
            
              console.log(data);
            // ICONOS ANIMADOS
            console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='iconos/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='iconos/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='iconos/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='iconos/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='iconos/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='iconos/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='iconos/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='iconos/cloudy-day-1.svg'
                      console.log('por defecto');
                  }

          
            // ICONOS ANIMADOS

          })
          .catch(error => {console.log(error)})
      })
  }
})