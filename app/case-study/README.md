# Case Study Management Guide

This guide explains how to update the project case studies in your portfolio. All project data is centralized in a single file to make management easy.

##  الملف الأساسي (Core File)
The source of truth for all projects is located at:
`[app/constants/index.js](file:///Users/emranhossain/portfolio-projects/gasp-new/app/constants/index.js)`

## الهيكل (Data Structure)
Each project in the `projects` array has a `caseStudy` object. Here is a breakdown of its fields:

```javascript
{
  id: 1,
  name: "Project Name",
  slug: "project-slug", 
  description: "Short summary",
  href: "/case-study/project-slug",
  image: "/assets/projects/hero.png", 
  bgImage: "/assets/backgrounds/hero-bg.jpg", 
  frameworks: [...],
  
  caseStudy: {
    role: "Your Role",
    team: "Collaborators",
    techStack: "Tech used",
    
    // Dynamic Section Titles & Content
    problemTitle: "Identifying the Gaps...",
    problemContent: "The challenge description...",
    problemImages: ["/path/1.png", "/path/2.png"], // Multiple images supported!
    
    solutionTitle: "The Unified Workflow...",
    solutionContent: "The solution description...",
    solutionImages: ["/path/3.png"],
    
    features: [...], // Still uses the same grid
    
    resultsTitle: "Impact & Metric",
    resultsMetric: "10X", // This big text is now dynamic!
    resultsContent: "The results description...",
    resultsImages: ["/path/4.png"]
  }
}
```

## التعديل (How to Edit)
1. Open `app/constants/index.js`.
2. Locate the project you want to change.
3. Update the text strings and image arrays.
4. **Images**: You can add multiple strings to `problemImages`, `solutionImages`, or `resultsImages`. They will automatically render in a beautiful 2-column grid.

## نصائح للتصميم (Design Tips)
- **Results Metric**: Keep this short (e.g., "10X", "100%", "5k+"). It will appear as large background text as well for a premium feel.
- **Grayscale Images**: Images in the section grids have a subtle grayscale filter that reveals color on hover for a cleaner look.

---
> [!NOTE]
> The case study page automatically handles **Dark and Light modes** based on your system preference, using your homepage colors for light mode.
