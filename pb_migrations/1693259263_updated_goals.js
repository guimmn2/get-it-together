migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rhe6684lhuyia49")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "njhnevmd",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rhe6684lhuyia49")

  // remove
  collection.schema.removeField("njhnevmd")

  return dao.saveCollection(collection)
})
