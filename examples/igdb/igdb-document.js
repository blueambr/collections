/**
 * Collections Database document builder with
 * additional fields fetched from IGDB API
 */

app.api.igdb.client_id = app.config.CLIENT_ID;
app.api.igdb.client_secret = app.config.CLIENT_SECRET;

app.api.igdb.gameClass = app.library.collections.game;
app.api.igdb.extraFields.push("franchises.*", "total_rating");

const game = app.api.igdb.getGame(app.params.id);
const timeToBeat = app.library.timeToBeat(app.params.id);

if (!game) {
  app.fail();
}

const builder = app.document.builder();

builder.setImage(game.requestCover(), "cover");
builder.setString(game.name, "title");
builder.setListItems(app.listItem.suggest("Backlog", "Backlog"), "status");
builder.setDecimal(game.rating, "rating");
builder.setString(timeToBeat, "time-to-beat");
builder.setDate(game.firstReleaseDate, "release-date");
builder.setListItems(game.franchises, "franchise");

app.result(builder);
