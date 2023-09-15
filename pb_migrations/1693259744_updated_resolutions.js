migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g2ojac0rdadxo1b")

  // remove
  collection.schema.removeField("cp6vagdg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wjgeaeeh",
    "name": "lastChecked",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cp6vagdg",
    "name": "lastChecked",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("wjgeaeeh")

  return dao.saveCollection(collection)
})
