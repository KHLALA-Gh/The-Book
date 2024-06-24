import { getRepoReleases } from "@/githubApi/releases";

export async function GET(): Promise<Response> {
  try {
    const data = await getRepoReleases();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({
        err: "an error occurred",
      }),
      { status: 500 }
    );
  }
}
