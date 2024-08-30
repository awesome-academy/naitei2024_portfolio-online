import Blog from '~/entity/blog.entity'
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

export const mockBlog = {
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
}

export const mockComments = [
  {
    id: 1,
    user: new User(),
    blog: new Blog(),
    content: 'Great article! I learned a lot from this.',
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-02T00:00:00Z')
  },
  {
    id: 2,
    user: new User(),
    blog: new Blog(),
    content: 'Looking forward to more articles like this.',
    createdAt: new Date('2023-02-01T00:00:00Z'),
    updatedAt: new Date('2023-02-02T00:00:00Z')
  }
]

export const addComment = {
  user: new User(),
  blog: new Blog(),
  content: 'This is a new comment.'
}
