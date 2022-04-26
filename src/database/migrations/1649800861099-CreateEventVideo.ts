import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEventVideo1649800861099 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'event_videos_video',
                columns: [
                    {
                        name: 'videoId',
                        type: 'int'
                    },
                    {
                        name: 'eventId',
                        type: 'int'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_video_event',
                        columnNames: ['videoId'],
                        referencedTableName: 'video',
                        referencedColumnNames: ['id']
                    },                    {
                        name: 'fk_event_video',
                        columnNames: ['eventId'],
                        referencedTableName: 'event',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('event_videos_video');
    }

}
