import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, cpf, paymentMethodType } = body;

    if (!paymentMethodType) {
        return NextResponse.json({ error: 'Método de pagamento não especificado.' }, { status: 400 });
    }

    if (paymentMethodType === 'boleto') {
      if (!email || !name || !cpf) {
        return NextResponse.json({ error: 'E-mail, Nome e CPF são obrigatórios para gerar o Boleto.' }, { status: 400 });
      }

      const customer = await stripe.customers.create({
        email: email,
        name: name,
        tax_id_data: [{ type: 'br_cpf', value: cpf }],
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2990, // R$ 29,90
        currency: 'brl',
        payment_method_types: ['boleto'],
        customer: customer.id,
      });
      return NextResponse.json({ clientSecret: paymentIntent.client_secret });

    } else if (paymentMethodType === 'card') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2990,
        currency: 'brl',
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    }

    return NextResponse.json({ error: 'Método de pagamento inválido.' }, { status: 400 });

  } catch (error: any) {
    console.error("ERRO NA API DO STRIPE:", error);
    const errorMessage = error.message || "Ocorreu um erro interno no servidor.";
    return new NextResponse(JSON.stringify({ error: errorMessage }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });
  }
}