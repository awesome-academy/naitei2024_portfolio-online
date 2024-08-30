import { Role } from '~/enum/role'

export const mockUsers = [
  {
    id: 1,
    userName: 'JohnDoe',
    email: 'john.doe@example.com',
    emailVerified: true,
    fullName: 'John Doe',
    password: 'hashedpassword123',
    role: Role.USER,
    title: 'Software Developer',
    description: 'Passionate software developer with a focus on web technologies.',
    imageUrl: 'https://example.com/image/johndoe.jpg',
    occupation: 'Software Developer',
    hobbies: 'Coding, Hiking, Photography',
    quote: 'Code is like humor. When you have to explain it, it’s bad.',
    isPublic: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-02T00:00:00Z'),
    isActive: true
  },
  {
    id: 2,
    userName: 'JaneDoe',
    email: 'jane.doe@example.com',
    emailVerified: true,
    fullName: 'Jane Doe',
    password: 'hashedpassword456',
    role: Role.ADMIN,
    title: 'Project Manager',
    description: 'Experienced project manager with a knack for effective team management.',
    imageUrl: 'https://example.com/image/janedoe.jpg',
    occupation: 'Project Manager',
    hobbies: 'Reading, Traveling, Cooking',
    quote: 'Leadership is the art of getting someone else to do something you want done because he wants to do it.',
    isPublic: true,
    createdAt: new Date('2023-02-01T00:00:00Z'),
    updatedAt: new Date('2023-02-02T00:00:00Z'),
    isActive: true
  }
]

export const addUser = {
  userName: 'JackDoe',
  email: 'jack.doe@example.com',
  emailVerified: false,
  fullName: 'Jack Doe',
  password: 'hashedpassword789',
  role: Role.USER,
  title: 'Software Engineer',
  description: 'Innovative software engineer with a passion for creating efficient solutions.',
  imageUrl: 'https://example.com/image/jackdoe.jpg',
  occupation: 'Software Engineer',
  hobbies: 'Gaming, Traveling, Music',
  quote: 'The only way to do great work is to love what you do.',
  isPublic: true,
  createdAt: new Date('2023-03-01T00:00:00Z'),
  updatedAt: new Date('2023-03-02T00:00:00Z'),
  isActive: true
}
