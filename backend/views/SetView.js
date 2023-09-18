const isAuthenticated = require("../isAuthenticated");

const instrumentSetsApi = (app) => {
  app.get("/instrumentSets", isAuthenticated);
  app.post("/instrumentSets", isAuthenticated);
  app.put("/instrumentSets/:id", isAuthenticated);
  app.delete("/instrumentSets/:id", isAuthenticated);
}

module.exports = instrumentSetsApi;