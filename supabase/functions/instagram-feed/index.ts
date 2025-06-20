
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Instagram access token from Supabase secrets
    const INSTAGRAM_ACCESS_TOKEN = Deno.env.get('INSTAGRAM_ACCESS_TOKEN')
    
    if (!INSTAGRAM_ACCESS_TOKEN) {
      throw new Error('Instagram access token not configured')
    }

    console.log('Fetching Instagram posts...')

    // Fetch Instagram posts using the Basic Display API
    const instagramResponse = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=6`
    )

    if (!instagramResponse.ok) {
      const errorText = await instagramResponse.text()
      console.error('Instagram API error:', errorText)
      throw new Error(`Instagram API error: ${instagramResponse.status}`)
    }

    const instagramData = await instagramResponse.json()
    console.log('Instagram API response:', instagramData)

    // Transform the data to match our interface
    const posts = instagramData.data?.map((post: any) => ({
      id: post.id,
      caption: post.caption || '',
      media_type: post.media_type,
      media_url: post.media_url,
      permalink: post.permalink,
      timestamp: post.timestamp,
      like_count: post.like_count || 0,
      comments_count: post.comments_count || 0,
    })) || []

    return new Response(
      JSON.stringify({ posts }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in instagram-feed function:', error)
    
    // Return mock data for development/testing
    const mockPosts = [
      {
        id: '1',
        caption: 'New talent spotlight! Meet our latest signing - bringing fresh energy to the runway 📸✨ #NileModels #NewFaces',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
        permalink: 'https://www.instagram.com/p/mock1/',
        timestamp: new Date().toISOString(),
        like_count: 142,
        comments_count: 8,
      },
      {
        id: '2',
        caption: 'Behind the scenes from yesterday\'s fashion shoot 🎬 Our models killing it as always! #BehindTheScenes #Fashion',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
        permalink: 'https://www.instagram.com/p/mock2/',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        like_count: 89,
        comments_count: 12,
      },
      {
        id: '3',
        caption: 'Runway ready! Fashion Week preparation is in full swing 💫 #FashionWeek #Runway #Models',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
        permalink: 'https://www.instagram.com/p/mock3/',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        like_count: 203,
        comments_count: 15,
      }
    ]

    return new Response(
      JSON.stringify({ posts: mockPosts }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
