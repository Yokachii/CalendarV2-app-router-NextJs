import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {

      // const {test} = req.body

      // res.cookies.set({
      //   name: 'token',
      //   value: '23',
      //   httpOnly: true,
      //   maxAge: 60 * 60 * 24 * 7,
      // })
      
      return res.status(200).json({a:'succes',b:"b"})

    } else {
      res.status(405).end(); // (Method Not Allowed)
    }
  } catch (error) {
    // Gérez les erreurs ici
    res.status(500).json({ error: `Erreur serveur: ${error.message}` });
  }
}