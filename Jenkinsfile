/*pipeline {
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
                bat 'set NO_COLOR=1 && npm run cy:run'
            }
        }
    }
}*/

pipeline {
    agent any

    stages {
        stage('Instalar dependências') {
            steps {
                bat 'npm install'
            }
        }
        stage('Iniciar servidor API') {
            steps {
                bat 'start /B npm run start:server'
                sleep time: 5, unit: 'SECONDS' // aguarda o servidor subir
            }
        }
        stage('Executar testes') {
            steps {
                bat 'set NO_COLOR=1 && npm run cy:run'
            }
        }
        stage('Popular banco') {
            steps {
               bat 'node scripts/seed.js'
            }
        }
    }
}


