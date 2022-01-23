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
        const pais = `http://api.openweathermap.org/data/2.5/weather?q=Ecuador&lang=es&units=metric&appid=6a3b130f8cc2a2577fac82539b3ca3cb`
        

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
            

            // ICONOS ANIMADOS
            console.log(data.weather[0].main)
            switch (data.weather[0].main) {
              case "Clear":
                  iconoAnimado.src = 'iconos/day.svg'
                  console.log("DESPEJADO");
                break;
              case "Clouds":
                    iconoAnimado.src = 'iconos/cloudy-day-1.svg'
                    console.log("NUBES");
                break; 
              case "Rain":
                    iconoAnimado.src = 'iconos/rainy-2.svg'
                    console.log("LLOVIENDO");
                break;  
            }
            // ICONOS ANIMADOS

          })
          .catch(error => {console.log(error)})
      })
  }
})