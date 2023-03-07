import { Ui } from "./ui.module.js";

export class Detail {
  constructor() {
    this.loading = document.getElementById("loading");
    this.games = Array.from(document.querySelectorAll(".overlay"));
    this.sectionGames = document.getElementById('game')
    this.sectionDetails = document.getElementById('details')

    for (let i = 0; i < this.games.length; i++) {
      this.games[i].addEventListener("click", (event) => {
        this.detailsGame(event.target.getAttribute("id"));
        $("#game").fadeOut(200, function () {
          $("#details").fadeIn(200);
        });
      

        let closeBtn = document.querySelector(".closeBtn");
        this.closeDetails(closeBtn);
      });
    }
  }
  closeDetails(btn) {
    btn.addEventListener("click", (event) => {
      $("#details").fadeOut(200, function () {
        $("#game").fadeIn(200);
      });
    });
  }
  async detailsGame(id) {
    let api = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    let response = await this.fetchApi(api);
    let ui=new Ui();
    if (!response.message) {
      ui.displayDetails(response);
    }
   
  }

  async fetchApi(api) {
    this.loading.classList.add("d-flex");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "eb72f4fb0cmsh70f2182dd2a2fa1p1b8c27jsn2ae85b7212e3",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    let response = await fetch(api, options);
    let result = await response.json();
    if (!response.ok) {
      this.loading.classList.add("d-flex");
    } else {
      this.loading.classList.remove("d-flex");
    }

    return result;
  }
}
