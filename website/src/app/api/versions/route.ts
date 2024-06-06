import { versions } from "@/versions";

export async function GET(): Promise<Response> {
  return new Response(JSON.stringify(versions), { status: 200 });
}
