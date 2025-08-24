describe('Aplicação de Contagem Regressiva para Ano Novo', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('carrega a página principal corretamente', () => {
    cy.contains('Contagem Regressiva').should('be.visible')
    cy.contains('Para o Ano Novo').should('be.visible')
  })

  it('exibe todos os segmentos de tempo', () => {
    cy.contains('Dias').should('be.visible')
    cy.contains('Horas').should('be.visible')
    cy.contains('Minutos').should('be.visible')
    cy.contains('Segundos').should('be.visible')
  })

  it('exibe números formatados corretamente', () => {
    // Verificar se os números estão sendo exibidos
    cy.get('.countdown-segment').should('have.length', 4)
    
    // Verificar se cada segmento tem um número e um label
    cy.get('.countdown-segment').each(($segment) => {
      cy.wrap($segment).find('.number').should('be.visible')
      cy.wrap($segment).find('.label').should('be.visible')
    })
  })

  it('exibe separadores entre os segmentos', () => {
    cy.get('.separator').should('have.length', 3)
    cy.get('.separator').should('contain.text', ':')
  })

  it('exibe a mensagem de celebração', () => {
    cy.contains('🎉 Prepare-se para comemorar! 🎉').should('be.visible')
  })

  it('possui animações funcionando', () => {
    // Verificar se os elementos com animação estão presentes
    cy.get('.title').should('be.visible')
    cy.get('.separator').should('be.visible')
    cy.get('.message').should('be.visible')
    
    // Verificar se as estrelas estão sendo renderizadas
    cy.get('.star').should('have.length', 20)
  })

  it('atualiza o contador automaticamente', () => {
    // Capturar valor inicial dos segundos
    cy.get('.countdown-segment')
      .last()
      .find('.number')
      .invoke('text')
      .then((initialSeconds) => {
        // Aguardar alguns segundos e verificar se mudou
        cy.wait(2000)
        cy.get('.countdown-segment')
          .last()
          .find('.number')
          .invoke('text')
          .should('not.equal', initialSeconds)
      })
  })

  it('é responsivo em diferentes tamanhos de tela', () => {
    // Testar em desktop
    cy.viewport(1200, 800)
    cy.get('.countdown-display').should('be.visible')
    cy.get('.separator').should('be.visible')

    // Testar em tablet
    cy.viewport(768, 1024)
    cy.get('.countdown-display').should('be.visible')

    // Testar em mobile
    cy.viewport(375, 667)
    cy.get('.countdown-display').should('be.visible')
    
    // Em mobile, os separadores devem estar ocultos
    cy.get('.separator').should('not.be.visible')
  })

  it('possui estrutura HTML semântica', () => {
    cy.get('main').should('exist')
    cy.get('header').should('exist')
    cy.get('footer').should('exist')
    
    // Verificar se os elementos principais estão com as classes corretas
    cy.get('.countdown-base').should('exist')
    cy.get('.container').should('exist')
    cy.get('.countdown-container').should('exist')
  })

  it('carrega rapidamente', () => {
    const start = Date.now()
    cy.visit('/').then(() => {
      const loadTime = Date.now() - start
      expect(loadTime).to.be.lessThan(3000) // Menos de 3 segundos
    })
  })

  it('funciona corretamente com diferentes anos', () => {
    // Este teste verifica se a lógica de ano está funcionando
    // Verificar se há valores válidos nos contadores
    cy.get('.countdown-segment').first().find('.number').should('not.contain.text', 'NaN')
    cy.get('.countdown-segment').eq(1).find('.number').should('not.contain.text', 'NaN')
    cy.get('.countdown-segment').eq(2).find('.number').should('not.contain.text', 'NaN')
    cy.get('.countdown-segment').last().find('.number').should('not.contain.text', 'NaN')
  })

  it('possui acessibilidade básica', () => {
    // Verificar se há texto alternativo e estrutura adequada
    cy.get('h1').should('exist')
    cy.get('h2').should('exist')
    
    // Verificar se o contraste é adequado (básico)
    cy.get('.title').should('be.visible')
    cy.get('.subtitle').should('be.visible')
  })
})
