---
title: CircleCI Node Images with Browsers
link: https://circleci.com/docs/2.0/docker-image-tags.json
published: true
publishedDate: 2020-07-27
---

Building a Node project with Circle and want access to browser binaries? The default `circleci/node` image doesn't come with them installed, which threw a spanner in the works when attempting to run some tests. Circle maintain an exhaustive list of images one can use: any Node version appended with `-browsers` will come installed with Chrome, Firefox, OpenJDK v11, and Geckodriver.
