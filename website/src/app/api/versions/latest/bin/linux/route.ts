import { LinuxExecutables } from "@/versions";

export async function GET(req: Request): Promise<Response> {
  return new Response(JSON.stringify(LinuxExecutables.at(-1)), {
    status: 200,
  });
}
