const customerSuccessBalancing = require("./customerSuccessBalancing"); // Importe a função a ser testada

describe("Testa a função customerSuccessBalancing", () => {
  it("Cenário 1: Distribuição de clientes com Customer Success de experiência variada", () => {
    // arrange
    const customerSuccessList = [
      { id: 1, experienceLevel: 50 },
      { id: 2, experienceLevel: 100 },
      { id: 3, experienceLevel: 75 },
      { id: 4, experienceLevel: 30 },
    ];

    const clientsList = [
      { id: 1, size: 45 },
      { id: 2, size: 60 },
      { id: 3, size: 25 },
      { id: 4, size: 70 },
      { id: 5, size: 55 },
      { id: 6, size: 80 },
    ];

    const unavailableCustomerSuccessIds = [2, 4];

    // act
    const result = customerSuccessBalancing(
      customerSuccessList,
      clientsList,
      unavailableCustomerSuccessIds
    );

    // assert
    expect(result).toBe(1); // Verifica se o resultado esperado para o cenário 1 é 1
  });

  it("Cenário 2: Empate entre dois Customer Success", () => {
    // arrange
    const customerSuccessList = [
      { id: 1, experienceLevel: 50 },
      { id: 2, experienceLevel: 100 },
      { id: 3, experienceLevel: 150 },
    ];

    const clientsList = [
      { id: 1, size: 10 },
      { id: 2, size: 20 },
      { id: 3, size: 80 },
      { id: 4, size: 90 },
    ];

    const unavailableCustomerSuccessIds = [3];

    // act
    const result = customerSuccessBalancing(
      customerSuccessList,
      clientsList,
      unavailableCustomerSuccessIds
    );

    // assert
    expect(result).toBe(0); // Verifica se o resultado esperado para o cenário 2 é 0 devido ao empate
  });

  it("Cenário 3: Distribuição quando alguns Customer Success estão indisponíveis", () => {
    // arrange
    const customerSuccessList = [
      { id: 1, experienceLevel: 50 },
      { id: 2, experienceLevel: 100 },
      { id: 3, experienceLevel: 75 },
      { id: 4, experienceLevel: 30 },
    ];

    const clientsList = [
      { id: 1, size: 45 },
      { id: 2, size: 60 },
      { id: 3, size: 25 },
      { id: 4, size: 70 },
      { id: 5, size: 55 },
      { id: 6, size: 80 },
    ];

    const unavailableCustomerSuccessIds = [2, 4];

    // act
    const result = customerSuccessBalancing(
      customerSuccessList,
      clientsList,
      unavailableCustomerSuccessIds
    );

    // assert
    expect(result).toBe(1); // Verifica se o resultado esperado para o cenário 3 é 1(levando em consideração que o CS 2 e 4 esta indisponivel)
  });

  it("Cenário 4: Todos os Customer Success estão indisponíveis", () => {
    // arrange
    const customerSuccessList = [
      { id: 1, experienceLevel: 50 },
      { id: 2, experienceLevel: 100 },
      { id: 3, experienceLevel: 75 },
      { id: 4, experienceLevel: 30 },
    ];

    const clientsList = [
      { id: 1, size: 45 },
      { id: 2, size: 60 },
      { id: 3, size: 25 },
      { id: 4, size: 70 },
      { id: 5, size: 55 },
      { id: 6, size: 80 },
    ];

    const unavailableCustomerSuccessIds = [1, 2, 3, 4];

    // act
    const result = customerSuccessBalancing(
      customerSuccessList,
      clientsList,
      unavailableCustomerSuccessIds
    );

    // assert
    expect(result).toBe(0); // Verifica se o resultado para o cenário 4 é 0, por conta de todos os CS's estarem Indisponíveis
  });
});
