import { versions } from "@/versions";

export async function GET(req: Request): Promise<Response> {
  const ltVer: LatestVersionRespData = {
    linuxDEB: versions.linuxDEB.at(-1) as Version,
    windows: versions.windows.at(-1) as Version,
    linuxRPM: versions.linuxRPM.at(-1) as Version,
  };
  return new Response(JSON.stringify(ltVer), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
