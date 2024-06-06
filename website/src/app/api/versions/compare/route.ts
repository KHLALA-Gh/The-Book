import { latestVer } from "@/versions";

export async function GET(req: Request): Promise<Response> {
  let ver = new URL(req.url).searchParams.get("version");
  if (!ver) {
    return new Response(
      JSON.stringify({
        err: "missing version",
      }),
      { status: 400 }
    );
  }
  let resp = {
    upgrade: false,
  };
  if (ver != latestVer) {
    resp.upgrade = true;
    return new Response(JSON.stringify(resp), { status: 200 });
  }
  return new Response(JSON.stringify(resp), { status: 200 });
}
