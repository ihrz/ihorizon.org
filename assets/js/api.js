document.addEventListener("DOMContentLoaded", function () {
  fetch("https://gateway.ihorizon.org/api/ihorizon/v1/bot")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const serversCount = document.getElementById("serversCount");
      const membersCount = document.getElementById("membersCount");
      const categoriesCount = document.getElementById("categoriesCount");
      const commandsCount = document.getElementById("commandsCount");

      if (serversCount) serversCount.innerHTML = `<b>${data.info.servers}</b>`;
      if (membersCount) membersCount.innerHTML = `<b>${Math.round(data.info.members / 1000)}k</b>`;
      if (categoriesCount) categoriesCount.innerHTML = `<b>${data.content.category}</b>`;
      if (commandsCount) commandsCount.innerHTML = `<b>${data.content.commands}</b>`;
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données:", error);
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.textContent = 'Impossible de charger les statistiques. Veuillez réessayer plus tard.';
      document.body.appendChild(errorMessage);
    });
});
