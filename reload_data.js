let selectedDataSource;

tableau.extensions.initializeAsync().then(() => {
  console.log("Extensión inicializada");
  loadAvailableDataSources();
});

function reloadData() {
  if (selectedDataSource) {
    selectedDataSource.refreshAsync(tableau.DataSourceRefreshType.Full).then(() => {
      console.log("Base de datos recargada: " + selectedDataSource.name);
    });
  } else {
    console.log("No se ha seleccionado ninguna base de datos.");
  }
}

function startCountdown() {
  let countdownElement = document.getElementById("countdown");
  let timeLeft = parseInt(countdownElement.textContent);

  if (timeLeft > 0) {
    countdownElement.textContent = timeLeft - 1;
    setTimeout(startCountdown, 1000);
  } else {
    reloadData();
    let timeInput = document.getElementById("timeInput");
    countdownElement.textContent = timeInput.value; // Restablece el contador al tiempo seleccionado
  }
}

function loadAvailableDataSources() {
  let dataSourceSelect = document.getElementById("dataSourceSelect");

  tableau.extensions.dashboardContent.dashboard.worksheets.forEach((worksheet) => {
    worksheet.getDataSourcesAsync().then((dataSources) => {
      dataSources.forEach((dataSource) => {
        let option = document.createElement("option");
        option.value = dataSource.id;
        option.textContent = dataSource.name;
        dataSourceSelect.appendChild(option);
      });
    });
  });
}

function selectDataSource() {
  let dataSourceSelect = document.getElementById("dataSourceSelect");
  let selectedDataSourceId = dataSourceSelect.value;

  tableau.extensions.dashboardContent.dashboard.worksheets.forEach((worksheet) => {
    worksheet.getDataSourcesAsync().then((dataSources) => {
      selectedDataSource = dataSources.find((dataSource) => dataSource.id === selectedDataSourceId);
      console.log("Base de datos seleccionada: " + selectedDataSource.name);
    });
  });
}
