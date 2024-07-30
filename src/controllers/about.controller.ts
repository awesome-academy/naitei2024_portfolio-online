import { NextFunction, Request, Response } from 'express'

export const showAbout = (req: Request, res: Response) => {
  const experience = {
    entries: [
      {
        company: 'Company 1',
        years: '2020-2022',
        title: 'Developer',
        description: 'Developed various web applications',
        'url-title': 'https://example.com'
      },
      {
        company: 'Company 2',
        years: '2018-2020',
        title: 'Intern',
        description: 'Worked on various projects',
        'url-title': 'https://example.com'
      },
      {
        company: 'Company 3',
        years: '2017-2018',
        title: 'Intern',
        description: 'Worked on various projects',
        'url-title': 'https://example.com'
      }
      // thêm các mục kinh nghiệm khác nếu có
    ]
  }
  const skills = {
    entries: [
      {
        skill: 'JavaScript',
        percent: 90
      },
      {
        skill: 'HTML',
        percent: 80
      },
      {
        skill: 'CSS',
        percent: 85
      }
      // thêm các kỹ năng khác nếu có
    ]
  }

  res.render('about/index', { experience, skills })
}
