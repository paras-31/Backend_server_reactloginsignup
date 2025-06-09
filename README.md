# 📘 Fullstack Login/Signup App (React + Node.js + NGINX + EC2 + CI/CD)

description: >
  This project is a fullstack Login/Signup application built using React for frontend,
  Express.js for backend, served via NGINX on an AWS EC2 instance.
  CI/CD deployment is automated via GitHub Actions for zero-downtime delivery.

tech_stack:
  - Frontend: React.js
  - Backend: Node.js (Express)
  - Web Server: NGINX
  - Hosting: AWS EC2 (Amazon Linux 2)
  - CI/CD: GitHub Actions
  - Process Manager: PM2

project_structure:
  frontend/: React source code (built and deployed to /var/www/frontend/)
  server.js: Express server
  nginx/default.conf: NGINX config file for reverse proxy
  .github/workflows/deploy.yml: GitHub Actions deployment workflow

---

# 🚀 How to Run This App on EC2

## ✅ 1. Install Dependencies on EC2 (Amazon Linux 2)

```bash
# Update system
sudo yum update -y

# Install Git
sudo yum install git -y

# Install Node.js (LTS version)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install PM2 globally to run backend in background
sudo npm install -g pm2

# Install and enable NGINX
sudo amazon-linux-extras enable nginx1
sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Create a directory to serve frontend files
sudo mkdir -p /var/www/frontend
sudo chown ec2-user:ec2-user /var/www/frontend
