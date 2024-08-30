import Project from '~/entity/project.entity'
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

export const mockProjects = [
  {
    id: 1,
    name: 'Project 1',
    whatYouLearn: 'What you learn from Project 1',
    keyFeatures: 'Key features of Project 1',
    linkGithub: 'github.com',
    overview: 'Overview of Project 1',
    imageUrl: 'https://example.com/image/project1.jpg',
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-02T00:00:00Z'),
    user: new User()
  },
  {
    id: 2,
    name: 'Project 2',
    whatYouLearn: 'What you learn from Project 2',
    keyFeatures: 'Key features of Project 2',
    linkGithub: 'github.com',
    overview: 'Overview of Project 2',
    imageUrl: 'https://example.com/image/project2.jpg',
    createdAt: new Date('2023-02-01T00:00:00Z'),
    updatedAt: new Date('2023-02-02T00:00:00Z'),
    user: new User()
  }
]

export const addProject = {
  name: 'Project 3',
  whatYouLearn: 'What you learn from Project 3',
  keyFeatures: 'Key features of Project 3',
  linkGithub: 'github.com',
  overview: 'Overview of Project 3',
  imageUrl: 'https://example.com/image/project3.jpg',
  createdAt: new Date('2023-03-01T00:00:00Z'),
  updatedAt: new Date('2023-03-02T00:00:00Z'),
  user: new User()
}
