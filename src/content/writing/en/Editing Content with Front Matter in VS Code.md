---
type: "note"
title: "Editing Content with Front Matter in VS Code"
description: "Learn how to manage website content using front matter — a simple, structured way to control metadata without touching code."
date: "2025-07-21"
tags: ["content-management", "front-matter", "VS Code", "markdown", "tutorial"]
draft: false
---

When you create content for a website, you need a way to organize information — titles, dates, tags, and more. Just like a pen and paper helps you track details during a calculation, **front matter** helps your website understand what your content is about.

Front matter is a structured block of information at the top of your content file that tells the system how to display, organize, and share your work.

Front matter is a section of metadata at the beginning of a markdown file — much like a label on a file folder. It contains essential information such as the title, author, publication date, tags, and whether the content is ready to publish. This makes your content organized, searchable, and easy to manage without writing any code.

---

## Why Front Matter Matters

- **Structured**: Keeps content information organized and consistent
- **Searchable**: Makes it easy to find and filter content by tags, date, or author
- **SEO-Friendly**: Search engines use this metadata to understand your content
- **Safe**: Templates prevent accidental formatting errors
- **Simple**: No coding knowledge required — just fill in the fields

---

## Front Matter Structure

Every content file starts with front matter wrapped in `---` delimiters:

```yaml
---
type: "note"
title: "Your Content Title"
description: "A brief summary of what this content is about"
date: "2025-07-21"
tags: ["tag1", "tag2", "tag3"]
draft: false
---
```

This section **must always be at the very top** of your file, before any content.

---

## Front Matter Fields Explained

| Field         | Purpose                                        | Example                                       |
| ------------- | ---------------------------------------------- | --------------------------------------------- |
| `type`        | Content category (note, article, guide, etc.)  | `"note"`                                      |
| `title`       | The main title of your content                 | `"How to Use Front Matter"`                   |
| `description` | A one-line summary for previews and SEO        | `"Learn to manage content with front matter"` |
| `date`        | Publication date in YYYY-MM-DD format          | `"2025-07-21"`                                |
| `tags`        | Keywords for categorization (list in brackets) | `["tutorial", "web", "content"]`              |
| `draft`       | Is this ready to publish?                      | `true` (not published) or `false` (published) |

---

## Getting Started

### 1. Install VS Code

Download from https://code.visualstudio.com/ and open your project folder.

### 2. Install Extensions

In VS Code, press `Ctrl+Shift+X` and search for:

- **Front Matter CMS** — Visual editor for content
- **Markdown All in One** — Markdown support
- **YAML** — Syntax highlighting for front matter

### 3. Create or Edit a Content File

Open a `.md` file in your content folder and add front matter at the top.

---

## Writing Content Below Front Matter

Once front matter is complete, everything below the closing `---` is your actual content — written in markdown.

```markdown
---
type: "note"
title: "My First Article"
description: "An introduction to content management"
date: "2025-07-21"
tags: ["beginners", "content"]
draft: false
---

# My First Article

This is where your content begins. Use markdown to format your text.

**Bold text**, _italic text_, and [links](https://example.com) work here.

- Use lists
- To organize ideas
- In your content
```

---

## Common Markdown Elements

| Markdown       | Output          |
| -------------- | --------------- |
| `# Heading 1`  | Main title      |
| `## Heading 2` | Section heading |
| `**bold**`     | **bold text**   |
| `*italic*`     | _italic text_   |
| `- Item`       | Bullet point    |
| `[Link](url)`  | Clickable link  |
| `` `code` ``   | Inline code     |

---

## Best Practices

- Always keep the `---` delimiters at top and bottom of front matter
- Use quotes around text values: `"Your Title"`
- Use brackets for lists: `["tag1", "tag2"]`
- Use `YYYY-MM-DD` date format
- Set `draft: false` when content is ready to publish
- Use descriptive tags for better discoverability

---

## Using the Front Matter CMS Extension

Click the **Front Matter** icon in VS Code's left sidebar to:

- View all your content files
- Edit front matter using a visual form
- Write and preview content in a rich editor
- Manage drafts and publishing status

This makes content management as easy as filling out a form.

---

## Quick Checklist

✅ Front matter at the very top of the file  
✅ All fields have values between quotes or brackets  
✅ Date is in `YYYY-MM-DD` format  
✅ `draft` is set to `false` when ready to publish  
✅ Tags are relevant and consistent  
✅ Content is written in markdown below the closing `---`

---

## Learn More

- **Markdown Guide**: https://www.markdownguide.org/
- **VS Code Docs**: https://code.visualstudio.com/docs
- **YAML Syntax**: https://yaml.org/spec/1.2/spec.html
