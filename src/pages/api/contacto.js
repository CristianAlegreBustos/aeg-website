export const prerender = false;

export async function POST({ request }) {
  try {
    const data = await request.json();

    // Verificación de seguridad adicional en backend (Honeypot)
    if (data.botcheck) {
      return new Response(JSON.stringify({ error: 'Bot detectado' }), { status: 400 });
    }

    // Petición al webhook de Make utilizando la variable de entorno
    const response = await fetch(import.meta.env.MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });



    if (!response.ok) {
      throw new Error(`Error HTTP en webhook: ${response.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error procesando formulario:', error);
    return new Response(JSON.stringify({ error: 'Ha ocurrido un error interno.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
