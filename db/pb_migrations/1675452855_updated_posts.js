migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l415h1ny9vozzv5")

  // remove
  collection.schema.removeField("zk6u8d8o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i9qyvosb",
    "name": "field",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l415h1ny9vozzv5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zk6u8d8o",
    "name": "photo",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("i9qyvosb")

  return dao.saveCollection(collection)
})
