import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEventVideo1649800861099 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'event_video',
                columns: [
                    {
                        name: 'video_id',
                        type: 'uuid'
                    },
                    {
                        name: 'event_id',
                        type: 'uuid'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_video_event',
                        columnNames: ['video_id'],
                        referencedTableName: 'video',
                        referencedColumnNames: ['id']
                    },                    {
                        name: 'fk_event_video',
                        columnNames: ['event_id'],
                        referencedTableName: 'event',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('event_video');
    }

}
