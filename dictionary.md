### DICTIONARY

- **Customers**
Clientes dos usuários cadastrados pelos agentes de turismo;

- **Excursions**
Excursões, incluindo dados de ida e volta, pontos de embarque, datas de partida e retorno, precificação de passagens...

- **Ticket price**
Preços especiais da excursão. Toda excursão tem um valor padrão de passagem, porém podem haver preços diferenciados (ex.: para idoso, criança de colo, etc...)

- **Passengers**
Passageiros; Clientes que estão vinculados à uma determinada excursão;

- **Booked passengers**
Passageiros inclusos na excursão

- **Waiting passengers**
Passageiros na lista de espera de uma excursão

- **Canceled passengers**
Passageiros desistentes da excursão

- **Company type**
Tipo de empresa que o usuário "principal" possui caso esteja cadastrado como pessoa jurídica; [ Microempreendimento | Agência de turismo | Outro ]

- **Occupation type**
Tipo de cargo que o usuário "principal" possuí caso esteja cadastrado como pessoa física; [ Agente de turismo | Guia turístico | Outro ]

- **Company name**
Razão social

- **Company trade name**
Nome fantasia

- **Document**
RG









### Form datas  
#### Customer

| column | description |
|-------:|------------:|
|name|  |
|email| |
|cpf| |
|documentState| órgão emissor do RG |
|document| RG |
|birthDate| |
|gender|  |
|cellphone| |
|telephone| |
|address| |
|zipcode| |
|area|  |
|number|  |
|complement|  |
|state| |
|city|  |
|healthPlan| plano de saúde |
|alergy| alergias a medicamentos  |
|contactName| contato de emergencia |
|contactPhone|  |
|foodRestriction| restrição alimentar |
|howHearAbout| como ficou sabendo da agencia de turismo |
|notes| observações |
|active|  |

#### Excursion
| column | description |
|-------:|------------:|
|destination| nome da excursão|
|departurePoint| endereço de partida|
|departureDate| |
|arrivalPoint| endereço de chegada|
|regressDate||
|stopPoints| pontos de parada onde |
|transports||
|ticketPriceDefault||
|ticketPrices||
|active||

#### Passenger
| column | description |
|-------:|------------:|
|customerId|  |
|excursionId| |
|status|  |
|ticketPriceId| |
|boardingPointId| |
|spot|  |
|transportExcursionId|  |
|paymentCondition|  |
|payments|  |

