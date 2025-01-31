<!-- Final Project: End-to-End DevOps Deployment -->

# Project Overview 

In this project, we will focus on the hands-on implementation of the learnings throughout this program, where you will gain practical insights while setting up the entire DevOps cycle and deploying applications using acquired best practices. 

<br>

# Learning Objectives 

By the end of this project, you will: 

1. Apply DevOps practices to a real-world project in a production environment.
2. Build an effective CI/CD pipeline to automate delivery.
3. Automate provisioning, configuration and infrastructure management using Terraform and Ansible. 
4. Deploy and manage containerized applications using Kubernetes. 
5. Integrate applications with Managed Kubernetes Service and other cloud services
6. Set up monitoring and create dashboards using Grafana and Prometheus
7. Resolve issues arising during the entire cycle using best practices

<br>

# Expense Tracker Project:
This project is a full-stack expense tracking application consisting of:

1. Frontend: Built with Next.js
2. Backend: Built with Node.js.
3. Database: MongoDB.
4. Caching: Redis.

Below are instructions for running the project locally, deploying to AWS EKS with Terraform, and setting up a CI/CD pipeline using GitHub Actions.

<br>

# Running the Project Locally:

Create Dockerfiles for both frontend and backend  
Create .dockerignore file to restrict unnecessary items, refer to the codebase

# Build & Push Docker Images

Build the images
```bash
docker build -t <your-dockerhub-username>/expensy-frontend:latest ./expensy_frontend
docker build -t <your-dockerhub-username>/expensy-backend:latest ./expensy_backend
```

Push the images to Docker Hub
```bash
docker push <your-dockerhub-username>/expensy-frontend:latest 
docker push <your-dockerhub-username>/expensy-backend:latest
```

#  Create the Docker-Compose File
See the codebase

Run with Docker Compose

```bash
docker compose up --build
```

Frontend: Access at http://localhost:3000
Backend: Access at http://localhost:8706/api/expenses

# Deploying to a Managed Kubernetes Service (EKS) Using Terraform

 Prerequisites
1. AWS CLI (to interact with AWS)
2. kubectl (to manage Kubernetes)
3. eksctl (to create the EKS cluster)
4. Terraform (to manage infrastructure as code)
5. Helm (to manage Kubernetes applications)

# Create an EKS Cluster with Terraform
Use Terraform to define and create:

1. VPC, Internet Gateway, Route Table for public subnets
2. EKS Control Plane
3. Managed Node Group
The script is contained in the codebase

After applying with terraform apply, confirm the cluster:
```bash
aws eks --region ap-northeast-3 describe-cluster --name expense-tracker-cluster
```

# Update kubeconfig

```bash
aws eks --region ap-northeast-3 update-kubeconfig --name expense-tracker-cluster
```

# Create the Kubernetes Manifests

Your manifests (e.g., expense-tracker.yaml, backend-hpa.yaml) might include:
1. Namespace
2. ConfigMap & Secret
3. Deployments (frontend, backend)
4. Services (exposing microservices)
5. Horizontal Pod Autoscaler (HPA)
6. Persistent Volume Claim (PVC)

Apply them:
```bash
kubectl apply -f expense-tracker.yaml
kubectl apply -f backend-hpa.yaml
```

# Performance Testing with K6

```bash
k6 run --vus 70 --duration 30s --out json=output.json script.js
```
The result will test
70 concurrent users for 30 seconds
Inspect metrics (response time, success rate, etc.) to ensure reliability under load.
Feel free to add more users and extend the time depending on your resources.

# Continuous Integration & Delivery (CI/CD) with GitHub Actions

## Pipeline Overview

This CI/CD pipeline has two jobs: **Build and Deploy**.

**Build Job**

1. Runs on ubuntu-latest.
2. Checks out code, prepares Docker, logs into Docker Hub.
3. Builds and pushes frontend & backend images to Docker Hub.

**Deploy Job**

1. Runs on a self-hosted runner (an EC2 instance or on-prem).
2. Checks out the code again, configures AWS credentials, connects to EKS, sets up SSH to EC2.
3. Deploys to EC2: Clones project, runs commands.
4. Deploys to EKS: Applies updated Kubernetes manifests.

#  Configure GitHub Repository Secrets
In Settings → Secrets and variables → Actions, define:

AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
DOCKER_USERNAME
DOCKER_PASSWORD
EC2_HOST
EC2_KEY
EKS_CLUSTER_NAME
... (and any other required secrets)

# Configure a New Self-Hosted Runner
1. **Go to** your repo → Actions → Runners → New runner → New self-hosted runner.
2. **Install** prerequisites (Docker, kubectl, aws cli, etc.) on the machine.
3. **Register** the runner with GitHub.
4. **Push your code** to main and watch the pipeline build and deploy automatically.

# Project Results

1. **Local Docker Compose** deployment: Access app at http://localhost:3000 (frontend) & http://localhost:8706/api/expenses (backend).
2. **AWS EKS** deployment: The cluster runs your microservices behind a LoadBalancer.
3. **GitHub Actions Pipeline** automatically builds and pushes Docker images, then deploys to EC2 & EKS on every main branch push.
4. **Performance** tested with K6, demonstrating good response times and reliability under 70 concurrent users for 30 seconds.


# Congratulations!
You now have a fully operational Expense Tracker application running locally via Docker, deployed to AWS EKS using Terraform, and continuously integrated/deployed with GitHub Actions. If you have questions or issues, feel free to open an issue or submit a pull request.

