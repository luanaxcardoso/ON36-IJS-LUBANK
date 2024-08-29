import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Conta1724886446979 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'conta',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'tipo',
                        type: 'enum',
                        enum: ['CORRENTE', 'POUPANCA'], 
                    },
                    {
                        name: 'saldo',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'clienteId',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['clienteId'],
                        referencedTableName: 'cliente',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('conta');
    }
}
