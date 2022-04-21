import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePerfil1650364839215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name: 'perfil',
            columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'perfil',
                        type: 'varchar'
                    }
                ]
            }
        )
    )
}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('perfil');
    }

}
