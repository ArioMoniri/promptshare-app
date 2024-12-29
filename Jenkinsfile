pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'bundle install'
            }
        }
        stage('Test') {
            steps {
                sh 'bundle exec rails db:create RAILS_ENV=test'
                sh 'bundle exec rails db:schema:load RAILS_ENV=test'
                sh 'bundle exec rspec'
            }
        }
    }

    post {
        always {
            junit 'tmp/rspec_results.xml'
        }
    }
}

