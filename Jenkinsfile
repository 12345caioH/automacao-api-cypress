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
    }
}


