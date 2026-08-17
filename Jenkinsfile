pipeline {
    agent any

     environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:$PATH"
    }
    
    triggers {
        cron('0 8 * * *')
    }

    stages {


        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }

        success {
            echo 'Playwright tests PASSED'
        }

        failure {
            echo 'Playwright tests FAILED'
        }
    }
}
