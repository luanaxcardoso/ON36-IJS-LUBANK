import { MigrationInterface, QueryRunner } from "typeorm";

export class Conta1724958833269 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE conta (
                id SERIAL PRIMARY KEY,
                tipo VARCHAR(10) NOT NULL,
                saldo DECIMAL(10, 2) NOT NULL CHECK (saldo >= 0),
                chequeEspecial DECIMAL(10, 2) DEFAULT 0 CHECK (chequeEspecial >= 0),
                rendimento DECIMAL(5, 2) DEFAULT 0 CHECK (rendimento >= 0),
                clienteId INT NOT NULL,
                FOREIGN KEY (clienteId) REFERENCES cliente (id)
            );
        `);

    
        await queryRunner.query(`
            INSERT INTO conta (tipo, saldo, chequeEspecial, rendimento, clienteId)
            VALUES
            ('corrente', 1000, 5000, 2, 1),
            ('poupanca', 2000, 200, 1.5, 2),
            ('corrente', 3000, 1500, 2, 3);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE conta;`);
    }

}

