import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const jsonDirectory = path.join(process.cwd(), 'src/data/merchantData')
  const fileContents = await fs.readFile(jsonDirectory + `/${id}.json`, 'utf8')
  // over-stringified string needs double parsing
  res.status(200).json(JSON.parse(fileContents))
}