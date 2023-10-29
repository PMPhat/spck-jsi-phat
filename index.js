import { loadFormLogin, checkAccount } from "./control.js";
const DAY = 3;
const nowObject = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
};
const afterObject = (day) => {
  const now = new Date(nowObject());
  const newDateObject = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + DAY
  );
  const newDay = String(newDateObject.getDate()).padStart(2, "0");
  const newMonth = String(newDateObject.getMonth() + 1).padStart(2, "0");
  const newYear = newDateObject.getFullYear();
  return `${newYear}-${newMonth}-${newDay}`;
};
console.log(nowObject());
console.log(afterObject());

// const dayNow = () => {
//   return new Date().getDate();
// };
// const dayAfter = () => {
//   const now = new Date(nowObject());
//   const newDateObject = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate() + DAY
//   );
//   const newDay = newDateObject.getDate();
//   return newDay;
// };

export const getApi = async (city) => {
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${city}&checkin=${nowObject()}&checkout=${afterObject()}&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "13a048fa60msh6379c5259907578p1e9aaajsn97db41d63ad6",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    console.log(result.results[0].name);
    if (result) {
      const data = result.results;
      let html = `
      <div class="content-list"> 
     `;
      for (let i = 0; i < data.length; i++) {
        let city = data[i].city;
        let img = data[i].images[0];
        let name = data[i].name;
        let price = data[i].price.total;
        html += `<div class="content-item">
          <img
            src=${img}
            alt=""
          />
          <div class="content-body">
            <div class="content-topInfo">
              <p class="content-topInfoName">
                ${name}
              </p>
              <p class="content-topInfoStar">
                <i class="fa-solid fa-star"></i>4,84
              </p>
            </div>
            <div class="content-middleInfo">
              <p class="content-middleInfoCity">City: ${city}</p>
              <p class="content-middleInfoDate">Dec 31- Jan 5</p>
            </div>
            <div class="content-bottom">
              <p class="content-bottomPrice">$${price} night</p>
            </div>
          </div>
        </div>
        `;
      }
      html += `</div>`;
      console.log(html);
      document.querySelector("#content").innerHTML += html;
    }
  } catch (error) {
    console.error(error);
  }
};
export const loadCarousel = () => {
  const content = document.querySelector("#content");
  content.innerHTML = `    <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner" id="phatCarousel">
          <div class="carousel-item active h-100">
            <img
              src="https://a0.muscache.com/im/pictures/miso/Hosting-52539316/original/942e2903-4f17-4753-8f91-09dcc0617e64.jpeg?im_w=720"
              class="d-block w-100 h-100"
              alt="First Slide"
            />
          </div>
          <div class="carousel-item h-100">
            <img
              src="https://a0.muscache.com/im/pictures/a1d94df4-0001-47ef-a45e-21db63919e79.jpg?im_w=720"
              class="d-block w-100 h-100"
              alt="Second Slide"
            />
          </div>
          <div class="carousel-item h-100">
            <img
              src="https://a0.muscache.com/im/pictures/12015095/160e3020_original.jpg?im_w=720"
              class="d-block w-100 h-100"
              alt="Third Slide"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
`;
};
const logo = document.querySelector(".logo").addEventListener("click", () => {
  loadCarousel();
  getApi("Paris");
});

loadCarousel();
getApi("Paris");

checkAccount();

const btnClickSearch = document.querySelector("#btnClickSearch");
btnClickSearch.addEventListener("click", () => {
  let value = document.querySelector(".btnSearch").value;
  document.querySelector("#content").innerHTML = ``;
  getApi(value);
});
