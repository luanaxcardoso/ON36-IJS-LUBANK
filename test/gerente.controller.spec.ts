import { Test, TestingModule } from "@nestjs/testing";
import { GerenteController } from "../src/controllers/gerente.controller";
import { GerenteService } from "../src/services/gerente.service";

describe('GerenteController', () => {
    let controller: GerenteController;
    let service: GerenteService;

    beforeEach(async () => {
        const mockGerenteService = {
            criarGerente: jest.fn(),
            buscarGerente: jest.fn(),
            buscarGerentes: jest.fn(),
            atualizarGerente: jest.fn(),
            deletarGerente: jest.fn(),
            adicionarClienteAoGerente: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [GerenteController],
            providers: [
                {
                    provide: GerenteService,
                    useValue: mockGerenteService,
                },
            ],
        }).compile();

        controller = module.get<GerenteController>(GerenteController);
        service = module.get<GerenteService>(GerenteService);
    });

    it('chama o método criarGerente', () => {
        const gerente = {
            id: 1,
            nome: 'Bernadete Alves',
            clientes: [],
            dataNascimento: '',
            email: '',
            telefone: '',
            endereco: '',
            cidade: '',
            estado: '',
            cpf: '',
            statusAtivo: false,
            contas: [],
            adicionarCliente: jest.fn(),
        };
        controller.criarGerente(gerente);
        expect(service.criarGerente).toHaveBeenCalledWith(gerente);
    });
    

    it('chama o método buscarGerente', () => {
        const id = 1;
        controller.buscarGerente(id);
        expect(service.buscarGerente).toHaveBeenCalledWith(id);
    });

    it('chama o método buscarGerentes', () => {
        controller.buscarGerentes();
        expect(service.buscarGerentes).toHaveBeenCalled();
    });

    it('chama o método atualizarGerente', () => {
        const id = 1;
        const gerenteAtualizado = {
            nome: 'Bernadete Alves',
            clientes: [],
            dataNascimento: '',
            email: '',
            telefone: '',
            endereco: '',
            cidade: '',
            estado: '',
            cpf: '',
            statusAtivo: false,
            contas: [],
            adicionarCliente: jest.fn(),
        };
        controller.atualizarGerente(id, gerenteAtualizado);
        expect(service.atualizarGerente).toHaveBeenCalledWith(id, gerenteAtualizado);
    });

    
    it('chama o método adicionarClienteAoGerente', () => {
        const gerenteId = 1;
        const cliente = {
            id: 1,
            nome: 'Luana Cardoso',
            dataNascimento: '',
            email: '',
            telefone: '',
            endereco: '',
            cidade: '',
            estado: '',
            cpf: '',
            rendaSalarial: 0,
            statusAtivo: false,
            conta: [],
        };
        controller.associarClienteAoGerente(gerenteId, cliente);
        expect(service.adicionarClienteAoGerente).toHaveBeenCalledWith(gerenteId, cliente);
    });

    it('chama o método deletarGerente', () => {
        const id = 1;
        controller.deletarGerente(id);
        expect(service.deletarGerente).toHaveBeenCalledWith(id);
    });
});
