import Parser from 'rss-parser'
import { feedData, feedItem } from './types'

const parser: Parser<feedData, feedItem> = new Parser()

const feedToJson = async (url: string): Promise<feedData & Parser.Output<feedItem>> => {
  const fetchRes = await fetch(url)
  const rssFeed = await fetchRes.text()
  return parser.parseString(rssFeed)
}

export default feedToJson
