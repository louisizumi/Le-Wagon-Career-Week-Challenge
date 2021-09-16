const getRadioStations = () => {
  const radioStationsList = document.querySelector(".radio__body");

  fetch(`https://teclead.de/recruiting/radios`)
    .then((response) => response.json())
    .then((data) => {
      data.radios.forEach((station) => {
        let accordion = `<div class="accordion">
                           <div class="radio__station">
                             <p>${station.name}</p>
                             <p>${station.frequency}</p>
                           </div>
                         </div>`;
        let panel = `<div class="panel">
                       <div class="panel__contents">
                         <i class="fas fa-minus-circle"></i>
                         <img src="${station.image}">
                         <i class="fas fa-plus-circle"></i>
                       </div>
                     </div>`;
        radioStationsList.insertAdjacentHTML("beforeend", accordion);
        radioStationsList.insertAdjacentHTML("beforeend", panel);
      });

      const radioStations = document.querySelectorAll(".radio__station");
      radioStations.forEach((station) => {
        station.addEventListener("click", (e) => {
          const footer = document.querySelector(".radio__footer");
          let panel = e.target.parentElement.nextSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            footer.innerHTML = "";
          } else {
            closePanels();
            panel.style.maxHeight = panel.scrollHeight + "px";
            footer.innerHTML = `<div>
                                  <p class="now-playing">CURRENTLY PLAYING</p>
                                  <p class="station-name">${e.target.firstElementChild.innerText}</span></p>
                                </div>`;
          }
        });
      });
    });
};

const addEventListeners = () => {
  const backButton = document.getElementById("back");
  const offButton = document.getElementById("off");
  backButton.addEventListener("click", (e) => {
    closePanels();
  });
  offButton.addEventListener("click", (e) => {
    closePanels();
  });
};

window.onload = () => {
  getRadioStations();
  addEventListeners();
};

const closePanels = () => {
  const panels = document.querySelectorAll(".panel");
  const footer = document.querySelector(".radio__footer");
  panels.forEach((openPanel) => {
    openPanel.style.maxHeight = null;
  });
  footer.innerHTML = "";
};
