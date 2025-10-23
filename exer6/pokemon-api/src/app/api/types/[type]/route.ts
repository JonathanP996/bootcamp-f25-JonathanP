import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    // TODO: Implement Pokemon by type endpoint
    return NextResponse.json({ message: `Type: ${params.type}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
