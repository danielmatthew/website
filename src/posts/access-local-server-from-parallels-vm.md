---
layout: layouts/post.njk
title: Access local server from Parallels VM
published: true
date: 2021-05-09T18:28:53.885Z
tags: []
---
I was struggling to access a development server on my host machine from a Windows 10 virtual machine (VM). Despite sharing a network, turns out the trick is not to use the host IP address, but  that of the bridged network the VM has created. For Parallels, that address tends to be `10.211.55.2`