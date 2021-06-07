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

  cardStarship.forEach((starship) => {
    $("#starship").append(`<div class="card-content-starship">
        <div class="card-starship">
          <div class="card-info">
          <div class="star-map"><img src="./assets/mapa_estrelar.jpg"></div>
            <h4> ${starship.name}</h4>
            <p class="subtitle-starship"><b>Classe:</b> ${starship.starship_class}</p>
            <p class="subtitle-starship"><b>Modelo:</b> ${starship.model}</p>
          </div>
        </div>
      </div>`);
  });
}
document.addEventListener("DOMContentLoaded", function (event) {
  let nave = document.querySelectorAll(".corcinza strong");

  let nave1 = document.createElement("img");
  nave1.src = "";

  let nave2 = document.createElement("img");
  nav2.src = "";

  let nave3 = document.createElement("img");
  nave3.src = "";

  let nave4 = document.createElement("img");
  nave4.src =
    "http://colombo--tst.custhelp.com/euf/assets/images/icon_colombo/servicos.png";

  let nave5 = document.createElement("img");
  nave5.src = "";

  let nave6 = document.createElement("img");
  nave6.src = "";

  let nave7 = document.createElement("img");
  nave7.src = "";

  let nave8 = document.createElement("img");
  nave8.src = "";

  let nave9 = document.createElement("img");
  nave9.src = "";

  let nave10 = document.createElement("img");
  nave10.src = "";

  for (let i = 0; i < cat.length; i++) {
    if (cat[i].innerText == "Entregas") {
      cat[i].appendChild(nave1);
    }

    if (cat[i].innerText == "Loja Física") {
      cat[i].appendChild(nave2);
    }

    if (cat[i].innerText == "Informações Gerais") {
      cat[i].appendChild(nave3);
    }

    if (cat[i].innerText == "Serviços Financeiros") {
      cat[i].appendChild(nave4);
    }

    if (cat[i].innerText == "Garantia") {
      cat[i].appendChild(nave5);
    }

    if (cat[i].innerText == "Trocas e Cancelamentos") {
      cat[i].appendChild(nave6);
    }

    if (cat[i].innerText == "Trocas e Cancelamentos") {
      cat[i].appendChild(nave7);
    }

    if (cat[i].innerText == "Trocas e Cancelamentos") {
      cat[i].appendChild(nave8);
    }

    if (cat[i].innerText == "Trocas e Cancelamentos") {
      cat[i].appendChild(nave9);
    }

    if (cat[i].innerText == "Trocas e Cancelamentos") {
      cat[i].appendChild(nave10);
    }
  }
});
