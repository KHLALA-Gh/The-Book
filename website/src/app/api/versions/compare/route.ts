import { compareRelease } from "@/githubApi/releases";

export async function GET(req: Request): Promise<Response> {
  try {
    let ver = new URL(req.url).searchParams.get("version");
    if (!ver) {
      return new Response(
        JSON.stringify({
          err: "missing version",
        }),
        { status: 400 }
      );
    }
    const result = await compareRelease(ver);
    return new Response(
      JSON.stringify({
        upgrade: !result,
      }),
      { status: 200 }
    );
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({
        err: "server error",
      }),
      { status: 500 }
    );
  }
}
