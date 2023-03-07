/* <reference path="../typings/globals/jquery/index.d.ts" /> */
import { Ui } from "./ui.module.js";
import { Detail } from "./details.module.js";

export class Game {
  constructor() {
    // this.responseDetails = responseDetails;
    this.activeCategory = document.querySelector(".nav-item .active");
    this.navLinks = Array.from(document.getElementsByClassName("nav-link"));
    this.loading = document.getElementById("loading");
    // if(!location.reload(false)){
    this.games(this.navLinks[0]);
    // }
    // if(performance.navigation.type == performance.navigation.TYPE_RELOAD){
    //     this.games(this.navLinks[0]);
    // }
    let lastactive = this.navLinks[0];
    this.activeLink(this.navLinks, lastactive);
  }
  activeLink(navLinks, lastactive) {
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", (event) => {
        if (event.target.classList.contains("active")) {
          this.games(event.target);
          lastactive = event.target;
        } else {
          event.target.classList.add("active");
          lastactive.classList.remove("active");
          this.games(event.target);
          lastactive = event.target;
        }
      });
    }
  }
  async games(activee) {
    let active = activee.innerHTML.toLocaleLowerCase();
    let api = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${active}`;
    let response = await this.fetchApi(api);
    let ui = new Ui();
    if (!response.message) {
      ui.displayGame(response);
    }
    let detail = new Detail();
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
