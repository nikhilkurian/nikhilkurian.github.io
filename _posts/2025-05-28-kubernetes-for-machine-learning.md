---
title: "Kubernetes for ML Engineers: A Practical Introduction"
date: 2025-05-28
categories: [ml-infrastructure]
tags: [kubernetes, containerization, mlops, deployment, orchestration, gpu]
header:
  teaser: /images/500x300.png
excerpt: "A practical introduction to Kubernetes for machine learning engineers, covering core concepts, deployment strategies, and best practices for managing ML workloads."
---

# Kubernetes for ML Engineers: Understanding YAML from the Ground Up

Kubernetes can seem overwhelming at first—especially when you're handed a bunch of YAML files without knowing what they’re for. If you're an ML engineer or researcher looking to scale or productionize your code, understanding these building blocks is essential.

In this post, we’ll walk through what Kubernetes YAML files do, how they fit into ML workflows, and why you should care.

---

## Why Kubernetes for Machine Learning?

- **Consistent Environments**: Avoid “it works on my machine” by deploying the same container across systems.
- **Scalability**: Train models on multi-node clusters or serve models with auto-scaling.
- **Separation of Concerns**: Isolate experiments, services, and infra components.
- **GPU Access**: Schedule and allocate GPU workloads cleanly.

---

## Anatomy of Kubernetes: What’s in a YAML?

Kubernetes follows a declarative style: you define *what you want*, and Kubernetes figures out *how to get there*. This is done via YAML files. Let’s break them down.

---

### 1. Pod: The Basic Building Block

A **Pod** is the smallest unit in Kubernetes. It represents a running process—usually wrapping one or more containers.

Use when:  
You want to test a script inside a container  
Not recommended for scaling or production workloads

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-ml-pod
spec:
  containers:
    - name: ml-script
      image: python:3.10
      command: ["python", "-c", "print('Hello from K8s')"]
```

---

### 2. Deployment: Self-Healing & Scalable

A **Deployment** tells Kubernetes how many copies of a pod you want, how to update them, and how to roll back if needed.

Use when:  
You want to run a model inference API or scheduled jobs reliably  
You need rolling updates or replicas

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: inference-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: inference
  template:
    metadata:
      labels:
        app: inference
    spec:
      containers:
        - name: inference-server
          image: mymodel:latest
          ports:
            - containerPort: 5000
```

---

### 3. Service: Expose Your App to the World

A **Service** makes your pods accessible either internally or externally (e.g., for your frontend or load balancer).

Use when:  
You want to connect to your model’s REST API  
You need stable networking for changing pods

```yaml
apiVersion: v1
kind: Service
metadata:
  name: inference-service
spec:
  selector:
    app: inference
  ports:
    - port: 80
      targetPort: 5000
  type: LoadBalancer
```

---

## Typical ML Workflow with Kubernetes

1. **Build a Docker image** of your training or inference code.
2. **Define a Deployment** to run the image with desired replicas.
3. **Create a Service** to expose it for internal or external use.
4. **Optionally mount volumes** for saving models or logs.
5. **Use GPU scheduling** by requesting GPU resources in YAML.

```yaml
resources:
  limits:
    nvidia.com/gpu: 1
```

---

## Key Commands to Know

```bash
kubectl apply -f deployment.yaml   # Create or update resources
kubectl get pods                   # List all pods
kubectl logs <pod-name>           # View logs from your app
kubectl describe pod <pod-name>   # Debug pod failures
kubectl delete -f service.yaml    # Clean up
```

---

## Summary

| Component  | Purpose                         | Typical Use |
|------------|----------------------------------|-------------|
| Pod        | Run one-off container tasks      | Testing     |
| Deployment | Manage replicas, rollout, scale  | Inference   |
| Service    | Expose apps via stable endpoints | Serving     |

---

