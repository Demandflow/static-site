# Frequently Asked Questions

## General Questions

### What is a static website?
A static website is a site that delivers the same content to every user, exactly as it's stored. Unlike dynamic websites, static sites don't require server-side processing or databases.

### Why choose a static website?
Static websites are:
- Faster to load
- More secure
- Cheaper to host
- Easier to maintain
- More reliable

### Can I update my static website content?
Yes! While the website is "static" when served to users, you can update the content by:
1. Editing the markdown files
2. Running the build command
3. Deploying the updated files

### Do I need special software to edit the content?
No, you only need:
- A text editor for editing markdown files
- Node.js for running the build process
- Basic knowledge of markdown syntax

## Technical Questions

### How do I add a new page?
Simply create a new markdown file in the `src/content` directory and run the build command.

### How do I add a new blog post?
Create a new markdown file in the `src/content/blog` directory and add a link to it in the blog index page.

### Can I customize the design?
Yes! You can modify the CSS in `src/static/css/style.css` and the HTML template in `src/templates/base.html`. 