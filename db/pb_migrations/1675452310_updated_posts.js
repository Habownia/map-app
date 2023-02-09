migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z9d02c90fdvyeoc")

  collection.name = "notes"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z9d02c90fdvyeoc")

  collection.name = "posts"

  return dao.saveCollection(collection)
})
