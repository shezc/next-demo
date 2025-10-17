import { NextResponse } from 'next/server';

// 模拟博客文章数据（与主API保持一致）
const blogPosts = [
  {
    id: 1,
    title: "Welcome to My Blog",
    content: `This is my first blog post. I'm excited to share my thoughts and experiences with you. In this post, I'll be discussing the importance of web development and how it has evolved over the years.

Web development has come a long way since the early days of the internet. From simple HTML pages to complex single-page applications, the field has continuously evolved to meet the changing needs of users and businesses.

## The Evolution of Web Development

In the early 2000s, web development was primarily focused on creating static websites using HTML, CSS, and basic JavaScript. Developers had to work with limited tools and frameworks, making it challenging to create dynamic and interactive web experiences.

### Modern Frameworks and Tools

Today, we have access to powerful frameworks like React, Vue.js, and Angular that have revolutionized how we build web applications. These frameworks provide:

- **Component-based architecture** for better code organization
- **Virtual DOM** for improved performance
- **Rich ecosystem** of libraries and tools
- **Strong community support** and documentation

## The Future of Web Development

As we look ahead, several trends are shaping the future of web development:

1. **Serverless Architecture** - Moving away from traditional server management
2. **Progressive Web Apps** - Bridging the gap between web and native apps
3. **Artificial Intelligence** - AI-powered development tools and user experiences
4. **WebAssembly** - High-performance web applications

## Conclusion

Web development continues to be an exciting and rapidly evolving field. As developers, we must stay updated with the latest trends and technologies to build better web experiences for our users.

Thank you for reading, and I look forward to sharing more insights in future posts!`,
    author: "John Doe",
    date: "2024-01-15",
    category: "Web Development",
    readTime: "5 min read",
    tags: ["Web Development", "Technology", "Future"],
    excerpt: "This is my first blog post. I'm excited to share my thoughts and experiences with you. In this post, I'll be discussing the importance of web development and how it has evolved over the years."
  },
  {
    id: 2,
    title: "Getting Started with Next.js",
    content: `Next.js is a powerful React framework that makes building web applications easier and more efficient. In this comprehensive guide, I'll walk you through the basics of Next.js, including routing, server-side rendering, and deployment strategies.

## What is Next.js?

Next.js is a React framework that provides additional features on top of React, including:

- **File-based routing** - Automatic routing based on file structure
- **Server-side rendering (SSR)** - Better SEO and performance
- **Static site generation (SSG)** - Pre-rendered pages for optimal performance
- **API routes** - Backend functionality within your React app
- **Built-in CSS support** - CSS Modules, Sass, and styled-jsx
- **Image optimization** - Automatic image optimization and lazy loading

## Setting Up Your First Next.js Project

Getting started with Next.js is incredibly simple:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

This creates a new Next.js project with all the necessary dependencies and configuration.

## Key Features and Benefits

### 1. File-based Routing
Next.js automatically creates routes based on your file structure in the \`pages\` or \`app\` directory.

### 2. Server-side Rendering
Next.js enables server-side rendering by default, which means your pages are rendered on the server before being sent to the client.

### 3. Static Site Generation
You can pre-render pages at build time using Static Site Generation (SSG) for even better performance.

### 4. API Routes
Create API endpoints as serverless functions within your Next.js application.

## Best Practices

When working with Next.js, consider these best practices:

- Use the \`Image\` component for optimized images
- Implement proper SEO with metadata
- Use TypeScript for better type safety
- Optimize your bundle size
- Implement proper error handling

## Conclusion

Next.js is an excellent choice for building modern web applications. Its powerful features and excellent developer experience make it a popular choice among React developers.

Start building your next project with Next.js today!`,
    author: "Jane Smith",
    date: "2024-01-12",
    category: "Tutorial",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Tutorial", "Web Development"],
    excerpt: "Next.js is a powerful React framework that makes building web applications easier and more efficient. In this comprehensive guide, I'll walk you through the basics of Next.js."
  },
  {
    id: 3,
    title: "The Future of Web Development",
    content: `As technology continues to evolve, so does web development. From AI-powered tools to new frameworks and libraries, the landscape is constantly changing. Let's explore what the future holds for web developers and how we can stay ahead of the curve.

## Emerging Technologies

### Artificial Intelligence and Machine Learning
AI is becoming increasingly integrated into web development:

- **Code generation** - AI tools that can write code based on natural language descriptions
- **Automated testing** - AI-powered testing tools that can identify bugs and suggest fixes
- **Personalization** - Machine learning algorithms for creating personalized user experiences
- **Voice interfaces** - Integration of voice recognition and natural language processing

### WebAssembly (WASM)
WebAssembly is revolutionizing web performance:

- **Near-native performance** - Run high-performance applications in the browser
- **Language diversity** - Use languages like Rust, C++, and Go for web development
- **Gaming and multimedia** - Complex games and multimedia applications in the browser
- **Scientific computing** - Run computationally intensive tasks in the browser

### Progressive Web Apps (PWAs)
PWAs are bridging the gap between web and native applications:

- **Offline functionality** - Work without internet connection
- **Push notifications** - Engage users even when the app is closed
- **App-like experience** - Native app features in web applications
- **Installation** - Users can install PWAs on their devices

## Development Tools and Workflows

### Low-Code and No-Code Platforms
These platforms are democratizing web development:

- **Visual development** - Drag-and-drop interfaces for building applications
- **Rapid prototyping** - Quickly create and test ideas
- **Accessibility** - Making web development accessible to non-developers
- **Integration** - Easy integration with existing systems and APIs

### Cloud-Native Development
The shift towards cloud-native development:

- **Serverless functions** - Event-driven, scalable backend services
- **Microservices** - Breaking applications into smaller, manageable services
- **Containerization** - Docker and Kubernetes for deployment
- **Edge computing** - Processing closer to users for better performance

## Skills for the Future

To stay relevant in the evolving web development landscape, consider developing these skills:

### Technical Skills
- **AI/ML integration** - Understanding how to incorporate AI into web applications
- **Performance optimization** - Core Web Vitals and performance metrics
- **Security** - Web security best practices and threat mitigation
- **Accessibility** - Building inclusive web experiences

### Soft Skills
- **Adaptability** - Embracing new technologies and methodologies
- **Continuous learning** - Staying updated with industry trends
- **Problem-solving** - Creative approaches to complex challenges
- **Collaboration** - Working effectively in diverse teams

## Conclusion

The future of web development is exciting and full of opportunities. By staying curious, continuously learning, and adapting to new technologies, we can build amazing web experiences that serve users better than ever before.

The key is to embrace change while maintaining a solid foundation in core web technologies. Happy coding!`,
    author: "Mike Johnson",
    date: "2024-01-10",
    category: "Technology",
    readTime: "6 min read",
    tags: ["Future", "Technology", "AI", "Web Development"],
    excerpt: "As technology continues to evolve, so does web development. From AI-powered tools to new frameworks and libraries, the landscape is constantly changing."
  }
];

// GET /api/blog/[id] - 获取单个博客文章
export async function GET(request, { params }) {
  try {
    const postId = parseInt(params.id);
    
    if (isNaN(postId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    const post = blogPosts.find(p => p.id === postId);
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
