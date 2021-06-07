const personagensCont = document.getElementById("personagens");
const planetasCont = document.getElementById("planetas");
const luasCont = document.getElementById("luas");
const navesCont = document.getElementById("naves");

preencheContador();
preencherTabela();
preencherDadosDoPersonagem();

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
    is3D: true
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
  console.log("AQUI" + cardPerson);

  cardPerson.forEach((people) => {
    $("#people").append(`<div class="card-content-people">
        <div class="card-people">
          <div class="card-info">
          <div class="star-map"><img src="./assets/mapa_estrelar.jpg"></div>
            <h4> ${people.name}</h4>
            <p class="subtitle-people">Gênero: ${people.gender}</p>
            <p class="subtitle-people">Ano de Nascimento: ${people.birth_year}</p>
          </div>
        </div>
      </div>`);
  });
}
