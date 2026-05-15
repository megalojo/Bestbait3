// netlify/functions/identify.js
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.ANTHROPIC_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Clé API ANTHROPIC_KEY non configurée sur Netlify" })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "JSON invalide" }) };
  }

  if (!body.base64 || !body.mediaType) {
    return { statusCode: 400, body: JSON.stringify({ error: "Paramètres manquants" }) };
  }

  // Vérifier la taille (base64 ~ 1.37x la taille réelle)
  const estimatedBytes = body.base64.length * 0.75;
  if (estimatedBytes > 4.5 * 1024 * 1024) {
    return {
      statusCode: 413,
      body: JSON.stringify({ error: "Image trop grande — max 4.5MB" })
    };
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: body.mediaType, data: body.base64 }
            },
            {
              type: "text",
              text: `Tu es un expert en ichtyologie spécialisé dans les poissons du Québec, Canada.
Examine attentivement cette photo et identifie le poisson avec précision.

Analyse : forme du corps, couleurs, nageoires, écailles, bouche, œil, queue.
Compare avec les espèces québécoises : doré jaune, brochet, achigan, truite mouchetée, truite arc-en-ciel, maskinongé, perchaude, omble de fontaine, saumon atlantique, crapet-soleil, barbotte, cisco, grand brochet, ouananiche, touladi.

Réponds UNIQUEMENT avec ce JSON valide, sans texte avant ni après :
{
  "found": true,
  "name": "nom français exact",
  "nameEn": "english name",
  "confidence": "élevée|moyenne|faible",
  "weight_estimate": "X.X kg",
  "length_estimate": "XX cm",
  "color_primary": "couleur dominante du poisson (ex: olive, argenté, brun)",
  "color_secondary": "couleur secondaire ou marquage (ex: taches oranges, bandes noires)",
  "body_shape": "allongé|trapu|plat|fusiforme",
  "description": "2 phrases précises sur ce poisson au Québec et ses caractéristiques",
  "regulation": "règlement MRNF Québec : limite journalière et taille minimale",
  "fun_fact": "fait biologique intéressant et précis"
}
Si aucun poisson n'est clairement visible : {"found":false,"name":"","confidence":"faible","description":"Aucun poisson identifiable.","color_primary":"gris","color_secondary":"blanc","body_shape":"fusiforme"}`
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return {
        statusCode: 502,
        body: JSON.stringify({ error: `API Anthropic erreur ${response.status}: ${errText.slice(0,200)}` })
      };
    }

    const data = await response.json();
    const text = data.content?.find(b => b.type === "text")?.text ?? "";
    const clean = text.replace(/```json|```/g, "").trim();

    let result;
    try {
      result = JSON.parse(clean);
    } catch {
      return { statusCode: 502, body: JSON.stringify({ error: "Réponse IA non parseable", raw: clean.slice(0,200) }) };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(result)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message ?? "Erreur serveur inconnue" })
    };
  }
}
