import { Detail } from "./details.module.js";
export class Ui {
  constructor() {
    
    this.navLinks = Array.from(document.getElementsByClassName("nav-link"));

  }
  async displayGame(res) {
    let response = res;
    let temp = ``;
    for (let i = 0; i < response.length; i++) {
      let desc = response[i].short_description.split(" ", 8);
      temp += `
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 g-5 mb-5 mt-4  game  ">
            <a href="#"  class='gg'>
              <div class="card h-100 bg-transparent  ">
                <div class="card-img p-3 ">
                  <img
                    src=${response[i].thumbnail}
                    class="card-img-top"
                    alt="..."
                    position-relative;
                    
                    
                  />
                  <div class="overlay" id=${response[i].id}></div>
                </div>
                <div class="title-square  container">
                <div class='row '>
                <div class="col-12 d-flex justify-content-between "><h3 class="h6 small">${response[i].title}</h3><span>Free</span></div>
                </div>
                </div>
                <div class="card-body p-4">
                  <p class="w-title  small text-center opacity-50 text-white">${desc}</p>
                </div>
              </div>
              
              <div class="cardFooter pt-2 border pb-2 d-flex justify-content-around shadow">
                <div class="post ">
                  <span class="small ">${response[i].genre}</span>
                </div>
                <div class="post-date ">
                  <span class="small">${response[i].platform}</span> 
                </div>
              </div>
            </a>
          </div>`;
    }
    document.getElementById("games").innerHTML = temp;
  }
  
  displayDetails(res) {
     
   let temp = `
    <div class="col-md-4">
    <img
      src=${res.thumbnail}
      class="w-100"
      alt="image details"
    />
  </div>
  <div class="col-md-8">
    <h3>Title:${res.title} </h3>
    <p>Category: <span class="badge ">${res.genre} </span></p>
    <p>Platform: <span class="badge "> ${res.platform} </span></p>
    <p>Status: <span class="badge "> ${res.status    }</span></p>
    <p class="small">
      ${res.description}
    </p>
    <a
      class="btn btn-outline-warning "
      target="_blank"
      href=${res.game_url}
      >Show Game</a
    >
  </div>
    ` ;
   document.getElementById('detailsContent') .innerHTML = temp

  }
}
