---
title: Implementing Responsive Images
layout: post
---

Site originally 3.4MB - taking 13.77 seconds on a good connection to finish loading. Not very good for those on data connections or when contending against data caps, or in any situation.

- Use image sizes and `srcset` to serve appropriately-sized images to devices
- Use `picture` to server specifically designed images to devices. Perhaps square-cropped images for narrow screens rather than rectangular images. It can be used for art direction.

## Ways to Process Images
- Can use grunt-responsive-images, but need to install image processing library such as Imagemagick. 
- Or Photoshop: was doing this by hand, but then discovered Photoshop CC's 'Extract Assets' feature which makes it a cinch to generate my alternate versions in one action.