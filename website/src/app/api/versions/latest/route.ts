import { GetLatestRelease } from "@/githubApi/releases";
import { AxiosError } from "axios";

export async function GET(req: Request): Promise<Response> {
  try {
    const data = await GetLatestRelease();
    return new Response(data.toJSON(), { status: 200 });
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return new Response(
        JSON.stringify({
          err: "unable to fetch data",
        }),
        {
          status: 500,
        }
      );
    }
    return new Response(
      JSON.stringify({
        err: "unknown error",
      }),
      { status: 500 }
    );
  }
}
