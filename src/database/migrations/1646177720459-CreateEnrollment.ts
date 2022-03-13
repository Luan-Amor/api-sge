import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEnrollment1646177720459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
                        name: 'paid',
                        type: 'boolean',
                        default: false
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
                    },                    {
                        name: 'fk_enrollment_event',
                        columnNames: ['event_id'],
                        referencedTableName: 'event',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('enrollment');
    }
}
