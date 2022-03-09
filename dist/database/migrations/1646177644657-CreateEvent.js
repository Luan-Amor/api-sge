"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEvent1646177644657 = void 0;
const typeorm_1 = require("typeorm");
class CreateEvent1646177644657 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'event',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'ticket_price',
                    type: 'numeric',
                },
                {
                    name: 'owner_id',
                    type: 'uuid',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'fk_event_user',
                    columnNames: ['owner_id'],
                    referencedTableName: 'event',
                    referencedColumnNames: ['id']
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('event');
    }
}
exports.CreateEvent1646177644657 = CreateEvent1646177644657;
