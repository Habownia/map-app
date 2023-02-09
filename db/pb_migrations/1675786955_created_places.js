migrate((db) => {
  const collection = new Collection({
    "id": "7l8qqc8mfjgzvrd",
    "created": "2023-02-07 16:22:35.461Z",
    "updated": "2023-02-07 16:22:35.461Z",
    "name": "places",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nfntlk5l",
        "name": "data",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7l8qqc8mfjgzvrd");

  return dao.deleteCollection(collection);
})
