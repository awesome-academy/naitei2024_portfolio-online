import User from '~/entity/user.entity'
import { Role } from '~/enum/role'

export const mockUser = {
  id: 1,
  userName: 'user1',
  email: 'user1@example.com',
  emailVerified: true,
  fullName: 'User 1',
  password: 'hashedpassword123',
  role: Role.USER,
  title: 'Software Developer',
  description: 'Passionate software developer with a focus on web technologies.',
  imageUrl: 'https://example.com/image/user1.jpg',
  occupation: 'Software Developer',
  hobbies: 'Coding, Hiking, Photography',
  quote: 'Code is like humor. When you have to explain it, it’s bad.',
  isPublic: true,
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-02T00:00:00Z'),
  isActive: true
}

export const mockBlogs = [
  {
    id: 1,
    user: new User(),
    title: 'The Future of Web Development',
    description: 'An in-depth look at the trends shaping the future of web development.',
    content:
      'As technology evolves, so does the landscape of web development. From serverless architectures to progressive web apps, the future is bright and full of potential...',
    imageUrl: 'https://example.com/image/future-web-dev.jpg',
    additionalImages: [
      'https://example.com/image/future-web-dev-1.jpg',
      'https://example.com/image/future-web-dev-2.jpg'
    ],
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-02T00:00:00Z'),
    comments: []
  },
  {
    id: 2,
    user: new User(),
    title: 'Understanding Serverless Architecture',
    description: "A beginner's guide to understanding and leveraging serverless architecture for your projects.",
    content:
      'Serverless architectures allow developers to build and run applications and services without having to manage infrastructure. This article explores the basics of serverless architecture and how you can benefit from it...',
    imageUrl: 'https://example.com/image/serverless-architecture.jpg',
    additionalImages: [
      'https://example.com/image/serverless-architecture-1.jpg',
      'https://example.com/image/serverless-architecture-2.jpg'
    ],
    createdAt: new Date('2023-02-01T00:00:00Z'),
    updatedAt: new Date('2023-02-02T00:00:00Z'),
    comments: []
  }
]

export const addBlog = {
  user: new User(),
  title: 'The Benefits of TypeScript',
  description: 'A comprehensive guide to the benefits of using TypeScript in your projects.',
  content:
    'TypeScript is a superset of JavaScript that adds static typing to the language. This article explores the advantages of using TypeScript and how it can help you write safer and more maintainable code...',
  additionalImages: [],
  createdAt: new Date('2023-03-01T00:00:00Z'),
  updatedAt: new Date('2023-03-02T00:00:00Z'),
  comments: []
}
