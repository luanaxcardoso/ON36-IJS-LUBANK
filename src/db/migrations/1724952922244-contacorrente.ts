import { MigrationInterface, QueryRunner } from "typeorm";

export class Contacorrente1724952922244 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(
            `CREATE TABLE contacorrente (
                id SERIAL PRIMARY KEY,
                saldo DECIMAL(10, 2) NOT NULL,
                chequeEspecial DECIMAL(10, 2) NOT NULL,
                clienteId INT NOT NULL,
                FOREIGN KEY (clienteId) REFERENCES cliente (id)
            );`
        );

    
        await queryRunner.query(
            `INSERT INTO contacorrente (saldo, chequeEspecial, clienteId) 
            VALUES 
            (1000.00, 500.00, 1),
            (2000.00, 1000.00, 2),
            (3000.00, 1500.00, 3);`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE contacorrente;`);
    }
}
