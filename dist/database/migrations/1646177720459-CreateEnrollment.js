"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEnrollment1646177720459 = void 0;
const typeorm_1 = require("typeorm");
class CreateEnrollment1646177720459 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'enrollment',
            columns: [
                {
                    name: 'user_id',
                    type: 'uuid'
                },
                {
                    name: 'event_id',
                    type: 'uuid'
                },
                {
                    name: 'enrolled',
                    type: 'varchar',
                    length: '1'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'fk_enrollment_user',
                    columnNames: ['user_id'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id']
                }, {
                    name: 'fk_enrollment_event',
                    columnNames: ['event_id'],
                    referencedTableName: 'event',
                    referencedColumnNames: ['id']
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('enrollment');
    }
}
exports.CreateEnrollment1646177720459 = CreateEnrollment1646177720459;
