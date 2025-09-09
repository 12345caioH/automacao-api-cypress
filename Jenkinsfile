pipeline {
    agent any

    stages {
        stage('Setup'){
            steps {
                git branch: 'main', url: 'https://github.com/12345caioH/automacao-api-cypress.git'
            }
        }
        stage('Instalar dependências'){
            steps {
                bat 'npm install'
            }
        }
        stage('Executar testes'){
            steps {
                bat 'NO_COLOR=1 npm run cy:run'
            }
        }
    }
}

