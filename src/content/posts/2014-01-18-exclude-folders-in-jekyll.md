---
title: Exclude folders in Jekyll
published: true
---
After experimenting with Grunt, I noticed that the deploy was taking rather a long time - it turned out that Jekyll was bundling my 'node_modules' directory (all 32MB of it!) into its compiled site folder. However, I can avoid this in future by adding: `exclude: node_modules` to my `_config.yml` file.
