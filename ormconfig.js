module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "dialectOptions": {
        "ssl": {
            "require": true,
            "rejectUnauthorized": false
        }
    },
    "entities": [
        process.env.TYPEORM_ENTITIES
    ],
    "migrations": [
        process.env.TYPEORM_MIGRATIONS
    ],
    "cli": {
        "migrationsDir": [
            process.env.TYPEORM_MIGRATIONS_DIR
        ],
        "entitiesDir": process.env.TYPEORM_ENTITIES_DIR
    }
}