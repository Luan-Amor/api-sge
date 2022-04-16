import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEvent1646177644657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
                        name: 'speaker',
                        type: 'varchar',
                    },
                    {
                        name: 'ticket_price',
                        type: 'numeric',
                    },
                    {
                        name: 'spots',
                        type: 'numeric',
                    },
                    {
                        name: 'owner_id',
                        type: 'uuid',
                    },
                    {
                        name: 'start_event_date',
                        type: 'timestamp'
                    },
                    {
                        name: 'end_event_date',
                        type: 'timestamp'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_event_user',
                        columnNames: ['owner_id'],
                        referencedTableName: 'user',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('event');
    }

}
