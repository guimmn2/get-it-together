migrate((db) => {
  const collection = new Collection({
    "id": "acox90cfg6bqa2d",
    "created": "2023-08-28 21:47:24.725Z",
    "updated": "2023-08-28 21:47:24.725Z",
    "name": "milestones",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "svnjruun",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ufnuyfjh",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kr5cz6a5",
        "name": "deadline",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "4pdbcmrt",
        "name": "completed",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "tbqhokew",
        "name": "parentGoal",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "rhe6684lhuyia49",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "ffeizhtb",
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
      }
    ],
    "indexes": [],
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
  const collection = dao.findCollectionByNameOrId("acox90cfg6bqa2d");

  return dao.deleteCollection(collection);
})
