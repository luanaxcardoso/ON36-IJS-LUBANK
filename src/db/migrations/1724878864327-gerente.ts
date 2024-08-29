import { MigrationInterface, QueryRunner } from "typeorm";

export class Gerente1724878864327 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`
                CREATE TABLE gerente (
                    id SERIAL PRIMARY KEY,
                    nome VARCHAR(255) NOT NULL,
                    dataNascimento DATE NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    telefone VARCHAR(20) NOT NULL,
                    endereco VARCHAR(255) NOT NULL,
                    cidade VARCHAR(100) NOT NULL,
                    estado VARCHAR(50) NOT NULL,
                    cep VARCHAR(20) NOT NULL,
                    cpf VARCHAR(20) NOT NULL UNIQUE,
                    rendaSalarial DECIMAL(10, 2) NOT NULL CHECK (rendaSalarial >= 0),
                    statusAtivo BOOLEAN NOT NULL DEFAULT true
                );
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE gerente;
        `);
    }

}
