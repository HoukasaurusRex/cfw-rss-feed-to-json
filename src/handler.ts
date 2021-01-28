import feedToJson from './feed-to-json'

export const handleRequest = async (request: Request): Promise<Response> => {
  const feedURLEncoded = new URL(request.url).searchParams.get('url') || ''
  const feedURLDecoded = decodeURIComponent(feedURLEncoded)
  if (!feedURLDecoded) {
    throw new Error(`Please specify the feed URL you would like to fetch in the query params.
    e.g. https://api.houk.space/feed-to-json?url=${encodeURIComponent('https://anchor.fm/s/44a4277c/podcast/rss')}`)
  }
  const data = await feedToJson(feedURLDecoded)
  return new Response(JSON.stringify({ status: 'success', data}, undefined, 2), {
    headers: { 'content-type': 'application/json;charset=UTF-8', 'cache-control': 'max-age=3600', 'Access-Control-Allow-Origin': '*' },
    status: 200
  })
}

export const handleError = async (error: Error): Promise<Response> => 
  new Response(JSON.stringify({ status: 'error', type: error.name, messsage: error.message }, undefined, 2), {
    headers: { 'content-type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' },
    status: 400
  })