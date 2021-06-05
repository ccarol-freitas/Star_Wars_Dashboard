const personagensCont = document.getElementById("personagens");
const planetasCont = document.getElementById("planetas");
const luasCont = document.getElementById("luas");
const navesCont = document.getElementById("naves");

preencheContador();
preencherTabela();

function preencheContador() {
  Promise.all([
    swapGet("people/"),
    swapGet("planets/"),
    swapGet("vehicles/"),
    swapGet("starships/")
  ]).then(function (results) {
    console.log(results);
    personagensCont.innerHTML = results[0].data.count;
    planetasCont.innerHTML = results[1].data.count;
    luasCont.innerHTML = results[2].data.count;
    navesCont.innerHTML = results[3].data.count;
  });
}

async function preencherTabela() {
  const response = await swapGet("films/");
  const table = response.data.results;
  console.log(table);
  table.forEach((film) => {
    $("#movies").append(`<tr>
    <td>${film.title}</td>
    <td>${film.release_date}</td>
    <td>${film.director}</td>
    <td>${film.episode_id}</td>
    </tr>`);
  });
}

function swapGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}
