import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserProfile1650407158445 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_profile_profile',
                columns: [
                    {
                        name: 'userId',
                        type: 'uuid'
                    },
                    {
                        name: 'profileId',
                        type: 'int'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_user_profile',
                        columnNames: ['userId'],
                        referencedTableName: 'user',
                        referencedColumnNames: ['id']
                    },        
                    {
                        name: 'fk_profile_user',
                        columnNames: ['profileId'],
                        referencedTableName: 'profile',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_profile_profile');
    }

}
