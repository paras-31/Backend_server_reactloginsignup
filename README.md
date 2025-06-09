# 📘 Fullstack Login/Signup App (React + Node.js + NGINX + EC2 + CI/CD)

# It Also Include Frontend Repo - https://github.com/paras-31/Frontend_React_login_signup

project: Fullstack Login/Signup App

description: >
  A fullstack login/signup application using React (frontend) and Node.js + Express (backend),
  deployed on an AWS EC2 instance with NGINX as a reverse proxy. It uses GitHub Actions
  for zero-downtime continuous deployment.

tech_stack:
  frontend: React.js
  backend: Node.js (Express)
  web_server: NGINX
  hosting: AWS EC2 (Amazon Linux 2)
  ci_cd: GitHub Actions
  process_manager: PM2

project_structure:
  - frontend/: React source code (compiled into /var/www/frontend/)
  - server.js: Express backend entry file
  - nginx/default.conf: NGINX configuration file
  - .github/workflows/deploy.yml: GitHub Actions pipeline

setup_ec2:
  steps:
    - description: Update system
      command: sudo yum update -y

    - description: Install Git
      command: sudo yum install git -y

    - description: Install Node.js (LTS)
      commands:
        - curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
        - sudo yum install -y nodejs

    - description: Install PM2 globally
      command: sudo npm install -g pm2

    - description: Install and start NGINX
      commands:
        - sudo amazon-linux-extras enable nginx1
        - sudo yum install nginx -y
        - sudo systemctl start nginx
        - sudo systemctl enable nginx

    - description: Create directory for frontend build
      commands:
        - sudo mkdir -p /var/www/frontend
        - sudo chown ec2-user:ec2-user /var/www/frontend

clone_and_run_app:
  steps:
    - description: Clone the repository
      command: git clone https://github.com/<your-username>/<repo-name>.git

    - description: Change into repo directory
      command: cd <repo-name>

    - description: Install backend dependencies
      command: npm install

    - description: Start backend with PM2
      command: pm2 start server.js

    - description: Build frontend
      commands:
        - cd frontend
        - npm install
        - npm run build

    - description: Copy frontend build to NGINX directory
      command: cp -r dist/* /var/www/frontend/

    - description: Apply NGINX configuration
      commands:
        - sudo cp ../nginx/default.conf /etc/nginx/conf.d/default.conf
        - sudo nginx -t
        - sudo systemctl reload nginx

ci_cd_pipeline:
  description: >
    Automatically deploy the latest code to the EC2 instance upon every push
    to the main branch, using GitHub Actions and SSH/SCP.

  secrets_required:
    - EC2_HOST: "Public IP of EC2"
    - EC2_USER: "ec2-user"
    - EC2_SSH_KEY: "Private SSH key contents (PEM)"

  deploy_workflow: |
    name: 🚀 Auto Deploy to EC2

    on:
      push:
        branches: [main]

    jobs:
      deploy:
        runs-on: ubuntu-latest

        steps:
        - name: ⬇️ Checkout code
          uses: actions/checkout@v3

        - name: ⚙️ Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: 18

        - name: 🛠️ Build frontend
          run: |
            cd frontend
            npm install
            npm run build

        - name: 📦 SCP frontend and NGINX config to EC2
          uses: appleboy/scp-action@v0.1.4
          with:
            host: ${{ secrets.EC2_HOST }}
            username: ${{ secrets.EC2_USER }}
            key: ${{ secrets.EC2_SSH_KEY }}
            source: "frontend/dist/*,nginx/default.conf"
            target: "/home/ec2-user/deploy"

        - name: 🔄 SSH into EC2 and deploy
          uses: appleboy/ssh-action@v1.0.3
          with:
            host: ${{ secrets.EC2_HOST }}
            username: ${{ secrets.EC2_USER }}
            key: ${{ secrets.EC2_SSH_KEY }}
            script: |
              sudo cp /home/ec2-user/deploy/default.conf /etc/nginx/conf.d/default.conf
              sudo cp -r /home/ec2-user/deploy/dist/* /var/www/frontend/
              sudo nginx -t && sudo systemctl reload nginx
              cd /home/ec2-user/<repo-name>
              pm2 restart server || pm2 start server.js

result:
  summary: >
    ✅ On every push to main:
      - React frontend is built
      - NGINX config and frontend are deployed to EC2
      - NGINX is reloaded without downtime
      - Backend is started or restarted with PM2

contact:
  email: your-email@example.com
