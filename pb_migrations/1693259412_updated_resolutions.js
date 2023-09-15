migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g2ojac0rdadxo1b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "alg8zyab",
    "name": "deadline",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g2ojac0rdadxo1b")

  // remove
  collection.schema.removeField("alg8zyab")

  return dao.saveCollection(collection)
})
