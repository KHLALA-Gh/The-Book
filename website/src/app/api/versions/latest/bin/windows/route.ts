import { WindowsExecutables } from "@/versions";

export async function GET(req: Request): Promise<Response> {
  return new Response(JSON.stringify(WindowsExecutables.at(-1)), {
    status: 200,
  });
}
