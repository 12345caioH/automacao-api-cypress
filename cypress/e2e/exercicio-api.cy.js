/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

  let token
  beforeEach(() => {
     cy.token('fulano@qa.com', 'teste').then(tkn => {
            token = tkn
        })
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response =>{
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should(response => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    let usuario = `Usuario EBAC ${Math.floor(Math.random() * 1000)}`
    let email = `caio${Math.floor(Math.random() * 1000)}@teste.com`
    cy.cadastrarUsuario(token, usuario, email, 'teste', 'true')
    .should((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    });
  });

  it('Deve validar um usuário com email inválido - POST', () => {
    cy.cadastrarUsuario(token, 'Caio Henrique', 'caio7@ebac.com.br', 'teste', 'true')
    .should((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.message).equal('Este email já está sendo usado')
    });  
  });

  it('Deve editar um usuário previamente cadastrado - PUT', () => {
    let usuario = 'Usuario EBAC Editado' + Math.floor(Math.random() * 1000)
    let email = `caio${Math.floor(Math.random() * 1000)}@teste.com`
    cy.cadastrarUsuario(token, 'Usuario EBAC 570', 'caio530@teste.com', 'teste', 'true')
    .then(response => {
      let id = response.body._id
      cy.request({
      method: 'PUT',
      url: `usuarios/${id}`,
      headers: {authorization: token},
      body: {
              "nome": usuario,
              "email": email,
              "password": "teste",
              "administrador": "true"
            }
            }).should((response) => {
                expect(response.status).to.equal(201)
                expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            });
      }) 
  








  });

  it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
      cy.cadastrarUsuario(token, 'Usuario EBAC Editado2', 'caio6311@teste.com', 'teste', 'true')
        .then(response => {
          let id = response.body._id
          cy.request({
            method: 'DELETE',
            url: `usuarios/${id}`,
            headers: {authorization: token}
          }).should((response) => {
              expect(response.status).to.equal(200)
              expect(response.body.message).to.equal('Registro excluído com sucesso')
          });
        });
    });
});
