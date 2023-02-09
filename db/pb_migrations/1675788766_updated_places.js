migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7l8qqc8mfjgzvrd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nfntlk5l",
    "name": "dataDB",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7l8qqc8mfjgzvrd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nfntlk5l",
    "name": "data",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
