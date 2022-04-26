import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProfile1650364839215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name: 'profile',
            columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: "identity"
                    },
                    {
                        name: 'profile',
                        type: 'varchar'
                    }
                ]
            }
        )
    )
}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('profile');
    }

}
