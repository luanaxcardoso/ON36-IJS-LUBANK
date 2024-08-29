import { MigrationInterface, QueryRunner } from "typeorm";

export class Contapoupanca1724957838725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `CREATE TABLE contapoupanca (
                id SERIAL PRIMARY KEY,
                saldo DECIMAL(10, 2) NOT NULL,
                rendimentoMensal DECIMAL(10, 2) NOT NULL,
                clienteId INT NOT NULL,
                FOREIGN KEY (clienteId) REFERENCES cliente (id)
            );`
        );

        await queryRunner.query(
            `INSERT INTO contapoupanca (saldo, rendimentoMensal, clienteId) 
            VALUES 
            (1000.00, 10.00, 1),
            (2000.00, 20.00, 2),
            (3000.00, 30.00, 3);`
        );

}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE contapoupanca;`);
    }

}
