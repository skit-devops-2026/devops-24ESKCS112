pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                bat 'make test'
            }
        }

        stage('Build') {
            steps {
                bat 'make build'
            }
        }
    }

    post {
        success {
            echo 'TravelX CI pipeline completed successfully!'
        }
        failure {
            echo 'TravelX CI pipeline failed!'
        }
    }
}