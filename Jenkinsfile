pipeline {
    agent any

    stages {

        stage('Test') {
            steps {
                bat '''
                    set "PATH=C:\\Program Files (x86)\\GnuWin32\\bin;%PATH%"
                    make test
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                    set "PATH=C:\\Program Files (x86)\\GnuWin32\\bin;%PATH%"
                    make build
                '''
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