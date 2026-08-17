pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:$PATH"
    }

    triggers {
        cron('0 8 * * *')
    }

    stages {

        stage('Check Node and NPM') {
            steps {
                sh '''
                    echo "PATH=$PATH"
                    which node
                    which npm
                    node --version
                    npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install chromium'
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
            archiveArtifacts artifacts: 'playwright-report/**',
                allowEmptyArchive: true
        }

        success {
            echo 'Playwright tests PASSED'
        }

        failure {
            echo 'Playwright tests FAILED'
        }


        always {
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        
    }
    }
}
