
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // This is a mock response for now - will be replaced with actual AgentKit integration
    const mockResponse = {
      balance: "1.245 ETH",
      usdValue: "$3,245.67",
      recentTransactions: [
        { type: "send", amount: "0.1 ETH", timestamp: new Date().toISOString() }
      ]
    }

    return new Response(JSON.stringify(mockResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
