---
title: "Docker for Machine Learning: A Beginner-Friendly Guide"
date: 2025-05-22
categories: [ml-infrastructure]
tags: [docker, containerization, mlops, deployment, gpu, nvidia]
header:
  teaser: /images/500x300.png
excerpt: "Learn how to use Docker for machine learning workflows, from basic containerization to GPU-accelerated deep learning training."
---

# Docker for Machine Learning: A Beginner-Friendly Guide

As ML practitioners, we often find ourselves struggling with messy dependencies, incompatible environments, and inconsistent results across systems. Docker offers an elegant solution—containerization—that packages your code and environment into a consistent, portable unit.

In this post, we’ll walk through the basics of Docker in the ML context, with easy-to-follow examples.

---

## What is Docker and Why Should You Care?

Docker is a tool that lets you package your code along with everything it needs to run (libraries, Python version, system dependencies) into a self-contained unit called a container.

Why it matters for ML:

- Reproducibility: Run the same code with the same results, regardless of the machine.
- Deployment: Move your training or inference pipelines easily to servers or cloud.
- Experiment Isolation: Try different versions of code or packages without conflict.

---

## Step-by-Step: Running a Simple ML Script in Docker

### 1. Create Your ML Script

```python
# ml_script.py
import numpy as np
from sklearn.linear_model import LinearRegression

X = np.array([[1], [2], [3]])
y = np.array([2, 4, 6])

model = LinearRegression().fit(X, y)
print("Coefficient:", model.coef_)
```

### 2. Write a Dockerfile

```Dockerfile
FROM python:3.10
WORKDIR /app
COPY ml_script.py ./
RUN pip install numpy scikit-learn
CMD ["python", "ml_script.py"]
```

### 3. Build the Image

```bash
docker build -t ml-demo .
```

### 4. Run the Container

```bash
docker run --rm ml-demo
```

---

## Running Deep Learning Workloads with NVIDIA Docker

When training deep learning models on GPUs, standard Docker containers are not sufficient. You need access to the GPU drivers and CUDA libraries. NVIDIA Docker allows containers to directly utilize the host GPU.

Make sure the NVIDIA Container Toolkit is installed. You can verify GPU access with:

```bash
nvidia-smi
```

### Dockerfile for GPU-based Deep Learning

```Dockerfile
FROM pytorch/pytorch:2.2.0-cuda11.8-cudnn8-runtime
WORKDIR /workspace
COPY train.py .
```

### Sample Training Script (train.py)

```python
import torch
x = torch.randn(3, 3).cuda()
print("Tensor on GPU:", x)
```

### Build and Run

```bash
docker build -t dl-gpu-demo .
docker run --rm --gpus all dl-gpu-demo
```

---

## Managing Data and Models with Volumes

```bash
docker run -v $(pwd)/output:/app/output ml-demo
```

---

## Speed Up Your Workflow with Docker Aliases and Functions

Once you start working with Docker regularly, you’ll notice many commands are repetitive and verbose. To simplify daily usage, it's helpful to define custom aliases and functions.

### Common Commands

- `docker ps`: Lists running containers.
- `docker ps -a`: Lists all containers (including stopped ones).
- `docker images`: Shows all locally stored Docker images.
- `docker exec`: Runs a command inside a running container.
- `docker run`: Starts a new container from an image.

### Recommended Aliases

```bash
alias dps='docker ps'
alias dpa='docker ps -a'
alias dimg='docker images'
```

### Function: Run Container with Mounts and GPU Access

```bash
rdock() {
  docker run -it \
    --workdir="/home/$USER" \
    -v "$HOME/.bash_aliases:$HOME/.bash_aliases" \
    -v "$HOME/.bashrc:$HOME/.bashrc" \
    -v "$HOME/your_project_folder:/workspace/" \
    -v "/etc/group:/etc/group:ro" \
    -v "/etc/passwd:/etc/passwd:ro" \
    --gpus all \
    -u $UID:$GID \
    --name $1 \
    --ipc=host \
    --network host $2
}
```

### Function: Enter Running Container as Root

```bash
rootdock() {
  docker exec -u root -t -i $1 /bin/bash
}
```

Reload your aliases after editing:

```bash
source ~/.bash_aliases
```

---

## Safety Tips

- Avoid running containers as root in production.
- Use `.dockerignore` to exclude files like `__pycache__`, datasets, etc.
- Regularly prune unused images with `docker system prune`

---

## What’s Next

- Docker Compose for ML pipelines
- Serving ML models with Flask or FastAPI
- GPU acceleration in multi-container setups
- Kubernetes for scalable training

If you are an ML researcher or engineer tired of environment issues and deployment pain, Docker is worth learning.
