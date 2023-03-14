import { priceFormat } from "./priceFormat"


describe("Testando a função de formatação de preço", () => {

    it('Deve retornar o valor formatado para a moeda brasileira', () => {
        const result = priceFormat(100)

        expect(result).toBe('R$100,00')

    })

    it('Deve retornar o valor formatado para a moeda brasileira com números grandes', () => {
        const result = priceFormat(1923223.77)

        expect(result).toBe('R$1.923.223,77')

    })
})