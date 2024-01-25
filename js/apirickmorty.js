// URL de la API
const apiUrl = 'https://rickandmortyapi.com/api/character';
var datosFiltrados = [];

const obtenerTodosLosDatos = async (url) => {
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetch(url);

    const datos_resp = await response.json();
    console.log('Datos recibidos:', datos_resp);
    let items_filt = datos_resp.results.filter((item) => item.status === 'Alive');
    datosFiltrados.push(...items_filt);

    // Actualiza la URL para la siguiente página
    url = datos_resp.info.next;

    // Si no hay más páginas, termina el bucle
    if (!url) hasNextPage = false;
  }
};

obtenerTodosLosDatos(apiUrl).then(() => {
  console.log('Datos filtrados:', datosFiltrados);
  datosFiltrados.forEach(function (item) {
    console.log(
      'El nombre del personaje con id ' + item.id + ' es: ' + item.name + ' y su especie es: ' + item.species + ' euros'
    );
    const pintarTodosLosDatos = document.createRange().createContextualFragment(
      /**
       * * Estructura HTML
       */
      `
      <div class="card shadow-sm mb-3 rounded-4">
          <div class="row g-0">
              <div class="col-md-4">
                  <img src="${item.image}"
                      class="img-fluid custom-rounded" alt="image">
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <h5 class="card-title mb-0">${item.name}</h5>
                      <p class="status"><span class="status__icon"></span>${item.status} - ${item.species}</p>
                      <p class="card-text fw-bolder mb-0">Last known location:</p>
                      <p class="card-text location">${item.location.name}</p>
                      <p class="card-text fw-bolder mb-0">First seen in:</p>
                      <small class="text-body-secondary">${item.origin.name}</small></p>
                  </div>
              </div>
          </div>
      </div>
      `
    );

    const cardContainer = document.querySelector('#cards-container');
    cardContainer.append(pintarTodosLosDatos);
  });
});
