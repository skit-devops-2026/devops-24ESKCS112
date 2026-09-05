pipeline {
    agent any

    stages {

        stage('Test') {
            steps {
                bat '"C:\\Program Files (x86)\\GnuWin32\\bin\\make.exe" test'
            }
        }

        stage('Build') {
            steps {
                bat '"C:\\Program Files (x86)\\GnuWin32\\bin\\make.exe" build'
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