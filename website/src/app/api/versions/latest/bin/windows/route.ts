import { getLatestReleaseBin } from "@/githubApi/releases";

export async function GET(req: Request): Promise<Response> {
  try {
    const url = await getLatestReleaseBin("windows");
    return new Response(
      JSON.stringify({
        downloadUrl: url,
      }),
      { status: 200 }
    );
  } catch (err: unknown) {
    console.log(err);
    return new Response(
      JSON.stringify({
        err: "server error :(",
      }),
      { status: 500 }
    );
  }
}
