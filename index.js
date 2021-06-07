const personagensCont = document.getElementById("personagens");
const planetasCont = document.getElementById("planetas");
const luasCont = document.getElementById("luas");
const navesCont = document.getElementById("naves");

preencheContador();
preencherTabela();
preencherDadosDoPersonagem();
preencherTabelaPlanetas();
preencherDadosDaNave();

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const response = await swapGet("vehicles/");
  const vehiclesArray = response.data.results;

  const dataArray = [];
  dataArray.push(["Veículos", "Passageiros"]);
  vehiclesArray.forEach((vehicle) => {
    dataArray.push([vehicle.name, Number(vehicle.passengers)]);
  });

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Veículos de Star Wars",
    // legend: "none",
    is3D: true,
    colors: ["#b893e8", "#007aff", "yellow", "green", "red"]
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart_3d")
  );
  chart.draw(data, options);
}

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
    <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
    <td>${film.director}</td>
    <td>${film.episode_id}</td>
    </tr>`);
  });
}

function swapGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}

async function preencherDadosDoPersonagem() {
  const response = await swapGet("people/");
  const cardPerson = response.data.results;

  cardPerson.forEach((people) => {
    $("#people").append(`<div class="card-content-people">
        <div class="card-people">
          <div class="card-info">
          <div class="star-map"><img src="./assets/mapa_estrelar.jpg"></div>
            <h4> ${people.name}</h4>
            <p class="subtitle-people"><b>Gênero:</b> ${people.gender}</p>
            <p class="subtitle-people"><b>Ano de Nascimento:</b> ${people.birth_year}</p>
          </div>
        </div>
      </div>`);
  });
}

async function preencherTabelaPlanetas() {
  const response = await swapGet("planets/");
  const table = response.data.results;
  console.log(table);
  table.forEach((planet) => {
    $("#planets").append(`<tr>
    <td>${planet.name}</td>
    <td>${planet.climate}</td>
    <td>${planet.terrain}</td>
    <td>${planet.gravity}</td>
    <td>${planet.population}</td>
    </tr>`);
  });
}

async function preencherDadosDaNave() {
  const response = await swapGet("starships/");
  const cardStarship = response.data.results;

  console.log(cardStarship);

  cardStarship.forEach((starship) => {
    $("#starship")
      .append(`<div class="card-content-starship" style="background: #fff">
        <div class="card-starship">
          <div class="card-info" style="padding: 20px">
            <h4> ${starship.name}</h4>
            <p class="subtitle-starship"><b>Classe:</b> ${starship.starship_class}</p>
            <p class="subtitle-starship"><b>Modelo:</b> ${starship.model}</p>
          </div>
        </div>
      </div>`);
  });
}
