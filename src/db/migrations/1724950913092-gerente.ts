import { MigrationInterface, QueryRunner } from "typeorm";

export class Gerente1724950913092 implements MigrationInterface {

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

        await queryRunner.query(`
            INSERT INTO gerente (nome, dataNascimento, email, telefone, endereco, cidade, estado, cep, cpf, rendaSalarial, statusAtivo) 
            VALUES 
            ('Marilia Cardoso', '1982-05-15', 'marilia@gmail.com', '12987654321', 'Rua das Flores, 120', 'São Paulo', 'SP', '01301200', '12345678900', 3500.00, true),
            ('Valéria Alves', '1990-11-23', 'valeria@gmail.com', '21987654321', 'Avenida Brasil, 230', 'Rio de Janeiro', 'RJ', '22020800', '23456789011', 4050.00, true),
            ('Rodrigo Pereira', '1985-03-10', 'rodrigo@gmail.com', '12987654321', 'Praça Camões, 300', 'São Paulo', 'SP', '30230400', '34567890122', 2550.00, true);
            
        `);
    
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE gerente;
    `);
}

}
