const customerSuccessBalancing = (
  customerSuccessList,
  clientsList,
  unavailableCustomerSuccessIds
) => {
  // Filtra os Customer Success disponíveis com base nos IDs indisponíveis e os classifica por experiência (maior para menor)
  const availableCustomerSuccess = customerSuccessList
    .filter((cs) => !unavailableCustomerSuccessIds.includes(cs.id))
    .sort((a, b) => b.experienceLevel - a.experienceLevel);

  // Inicializa o contador de clientes atendidos por cada Customer Success disponível
  const customerCountByCS = availableCustomerSuccess.reduce((counts, cs) => {
    counts[cs.id] = 0;
    return counts;
  }, {});

  // Atribui clientes aos Customer Success com base na diferença entre a experiência do CS e o tamanho do cliente
  clientsList.forEach((client) => {
    const closestCS = availableCustomerSuccess.reduce(
      (closest, cs) => {
        const difference = Math.abs(cs.experienceLevel - client.size);

        // Encontra o CS mais adequado para o cliente atual com a menor diferença
        if (difference < closest.minDifference) {
          closest.minDifference = difference;
          closest.cs = cs;
        }
        return closest;
      },
      { minDifference: Infinity, cs: null }
    );

    // Registra quantos clientes cada CS atendeu
    if (closestCS.cs) {
      customerCountByCS[closestCS.cs.id]++;
    }
  });

  // Determina o CS que atendeu o maior número de clientes
  let maxCustomers = -1;
  let bestCSId = 0;

  for (const [csId, count] of Object.entries(customerCountByCS)) {
    if (count > maxCustomers) {
      maxCustomers = count;
      bestCSId = csId;
    } else if (count === maxCustomers && bestCSId !== 0) {
      bestCSId = 0; // Em caso de empate
    }
  }

  // Verifique se há mais de um CS com o mesmo número máximo de clientes atendidos
  const isTie =
    Object.values(customerCountByCS).filter((count) => count === maxCustomers).length > 1;

  // Se houver empate, retorne 0, caso contrário, retorne o ID do CS com mais clientes
  return isTie ? 0 : parseInt(bestCSId);
};

const customerSuccessList = [
  { id: 1, experienceLevel: 50 },
  { id: 2, experienceLevel: 100 },
  { id: 3, experienceLevel: 150 },
];

const clientsList = [
  { id: 1, size: 10 },
  { id: 2, size: 20 },
  { id: 3, size: 30 },
  { id: 4, size: 80 },
  { id: 5, size: 90 },
];

const unavailableCustomerSuccessIds = [3];

const result = customerSuccessBalancing(
  customerSuccessList,
  clientsList,
  unavailableCustomerSuccessIds
);

console.log(result); // Deve imprimir o resultado no console(1)

module.exports = customerSuccessBalancing;
