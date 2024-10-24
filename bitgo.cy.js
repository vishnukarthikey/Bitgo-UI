module.exports = {
    checkTransactionHeader: ()=>{
        it('Visit blockstream', () => {
            cy.visit('https://blockstream.info/block/000000000000000000076c036ff5119e5a5a74df77abf64203473364509f7732')
            cy.get('h1','Block 680000').should('be.visible')
            cy.get('div','transactions').closest('h3').within(() => {
            cy.get('h3').invoke("text").then((text) => {
              expect(text.trim()).to.eq('25 of 2875 Transactions');
            })
        })
        })     
    },
    findTransactions: ()=>{
        it('Find transactions with 1 input and 2 outputs', () => { 
            cy.visit('https://blockstream.info/block/000000000000000000076c036ff5119e5a5a74df77abf64203473364509f7732')
           cy.get('h1','Block 680000').should('be.visible')
           cy.get('div','transactions').closest('h3').within(() => {
            cy.get('.vin').each(($vin) => {
                const $vout = $vin.siblings('.vout')
                const inputCount = $vin.find('input').length
                const outputCount = $vout.find('div').length
                if (inputCount === 1 && outputCount === 2) {
                  cy.log('Selected vin div:', $vin.html())
                  cy.log('Corresponding vout div:', $vout.html())
                }

           })
          })
    })
}}