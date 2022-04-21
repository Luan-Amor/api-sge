import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserPerfil1650407158445 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_perfil_perfil',
                columns: [
                    {
                        name: 'userId',
                        type: 'uuid'
                    },
                    {
                        name: 'perfilId',
                        type: 'int'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_user_perfil',
                        columnNames: ['userId'],
                        referencedTableName: 'user',
                        referencedColumnNames: ['id']
                    },        
                    {
                        name: 'fk_perfil_user',
                        columnNames: ['perfilId'],
                        referencedTableName: 'perfil',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_perfil_perfil');
    }

}
