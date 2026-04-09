---
type: "note"
title: "Git"
description: "Introduction to Git, a distributed version control system. Learn basic commands and the timeline analogy for understanding how Git works."
date: "2024-01-01"
tags: ["Git", "version-control", "development", "VCS"]
draft: false
---

# GIT

# Introduction to Git

Welcome to the Git tutorial! This guide will introduce you to the basics of Git, a powerful version control system. We'll use the analogy of a timeline to help explain how Git works.

## What is Git?

Git is a distributed version control system used to track changes in code. It allows multiple developers to work on a project simultaneously without interfering with each other's work.

## Basic Git Commands

Here are some basic Git commands to get you started:

### Initializing a Repository

To start using Git, you need to initialize a repository in your project directory.

```bash
git init
```

### Cloning a Repository

To clone an existing repository:

```bash
git clone <repository-url>
```

There's 2 way to do so:

1. HTTPS
2. SSH keys

More:

[About remote repositories - GitHub Docs](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories)

### Checking the Status

To check the status of your files:

```bash
git status
```

### Adding Changes

To add changes to the staging area:

```bash
git add <file-name>
```

To add all changes:

```bash
git add .
```

### Committing Changes

To commit changes with a message:

```bash
git commit -m "Your commit message"
```

You might need to follow commit messages best practices

[How to Write Good Commit Messages: A Practical Git Guide](https://www.freecodecamp.org/news/writing-good-commit-messages-a-practical-guide/)

### Creating a Branch

To create a new branch:

```bash
git branch <branch-name>
```

### Switching Branches

To switch to another branch:

```bash
git checkout <branch-name>
```

### Viewing Commit History

To view the commit history:

```bash
git log
```

## Summary:

Merge vs Rebase

![](https://www.redswitches.com/wp-content/uploads/2024/04/Git-Rebase-vs-Merge-1024x687.png)

---

## Git as a Timeline

Think of Git as a timeline for your project. Each commit is like a snapshot of your project at a specific point in time. Here's how this timeline analogy works:

1. **Commits as Events**: Each commit represents a snapshot of your project. It's like marking an event on a timeline.
2. **Branches as Parallel Timelines**: Branches allow you to create parallel timelines for your project. You can work on different features or fixes in these separate branches without affecting the main timeline.
3. **Merging as Convergence of Timelines**: When you merge branches, you're combining two timelines into one. The changes from one branch are integrated into another.
4. **Reverting and Resetting as Timeline Manipulation**: Git allows you to revert to previous commits or reset to a specific point, akin to moving backward or adjusting points on a timeline.
5. **Tags as Milestones**: Tags mark significant points in the timeline, such as releases or important updates.
