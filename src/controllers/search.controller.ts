import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import searchService from '~/services/search.service'

export const search = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.q

  if (!query || typeof query !== 'string') {
    return res.render('search', { results: [], query: '' })
  }

  try {
    const results = await searchService.searchUser(query)
    res.render('search', { results, query })
  } catch (error) {
    next(error)
  }
})
