import axios from "axios";
import path from "path";

// some constants
export const GITHUB_API_VERSION = "2022-11-28";
export const WIN_BIN_NAME = "The_Book.exe";
export const LINUX_BIN_NAME = "The_Book";

export class ReleaseDATA implements Partial<Release> {
  public linuxDEB?: Version;
  public linuxRPM?: Version;
  public windows?: Version;
  public SourceCode?: Version;
  constructor(data: any) {
    const release = getRelease(data);
    (Object.keys(release) as (keyof Release)[]).map(
      (platform: keyof Release) => {
        this[platform] = release[platform];
      }
    );
  }
  get name() {
    return this.windows?.name;
  }
  /**
   * Get the data in JSON format
   */
  public toJSON(): string {
    let releases: Partial<Release> = {};
    (Object.keys(this) as (keyof Release)[]).map((k) => {
      releases[k] = this[k];
    });
    return JSON.stringify(releases);
  }
  /**
   * Get release as an object
   */
  public data(): Partial<Release> {
    let releases: Partial<Release> = {};
    (Object.keys(this) as (keyof Release)[]).map((k) => {
      releases[k] = this[k];
    });
    return releases;
  }
}

/**
 * Get the releases from github repo
 * @param per_page number of releases per page (or per request)
 * @param page page number
 */
async function listReleases(
  per_page: number = 30,
  page: number = 1
): Promise<any[]> {
  const url = new URL(
    `https://api.github.com/repos/${process.env.REPO}/releases`
  );
  url.searchParams.set("per_page", `${per_page}`);
  url.searchParams.set("page", `${page}`);
  const resp = await axios.get(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": GITHUB_API_VERSION,
    },
  });
  return resp.data;
}

/**
 * Get the application releases.
 */
export async function getRepoReleases(): Promise<Partial<Release>[]> {
  const data = await listReleases();
  let releases: Partial<Release>[] = [];
  for (let i = 0; i < data.length; i++) {
    const release = new ReleaseDATA(data[i]);
    releases.push(release.data());
  }
  return releases;
}

/**
 * Get the release data from the github api response
 * @param release Github release
 */
function getRelease(release: any): Partial<Release> {
  const assets = release.assets as any[];
  const verName = release.name;
  const rel: Partial<Release> = {};
  const archiveEndPoint = new URL(
    `https://github.com/${process.env.REPO}/archive/refs/tags/${release.tag_name}.zip`
  );
  rel.SourceCode = {
    name: verName,
    downloadUrl: archiveEndPoint.toString(),
    date: release.published_at,
    assetName: `The-Book-${release.tag_name}.zip`,
  };
  for (let j = 0; j < assets.length; j++) {
    const version: Version = {
      name: verName,
      downloadUrl: assets[j].browser_download_url,
      date: assets[j].updated_at,
      assetName: assets[j].name,
    };
    if ((assets[j].name as string).endsWith("installer.exe")) {
      rel.windows = version;
    } else if ((assets[j].name as string).endsWith(".deb")) {
      rel.linuxDEB = version;
    } else if ((assets[j].name as string).endsWith(".rpm")) {
      rel.linuxRPM = version;
    }
  }

  return rel;
}

/**
 * Get the latest release from github
 */
export async function GetLatestRelease(): Promise<ReleaseDATA> {
  const data = await listReleases(1);
  const release = new ReleaseDATA(data[0]);
  return release;
}

type Bins = {
  [K in Platform]: string;
};
/*
 * Gets the latest app binaries urls from the response body of github api
 */
function getReleaseBins(data: any): Bins {
  const assets = data.assets as any[];
  const bins: Bins = {
    windows: "",
    linux: "",
  };
  for (let i = 0; i < assets.length; i++) {
    if ((assets[i].name as string) === "The_Book.exe") {
      bins.windows = assets[i].browser_download_url;
    } else if ((assets[i].name as string) === "The_Book") {
      bins.linux = assets[i].browser_download_url;
    }
  }
  return bins;
}
/**
 * Gets the latest app binary of the choosen platform.
 * @param platform platform (OS) like windows or linux.
 */
export async function getLatestReleaseBin(platform: Platform) {
  const data = await listReleases(1);
  const bins = getReleaseBins(data[0]);
  return bins[platform];
}
// TODO :  Comapare releases function

function getReleaseTag(data: any): string | undefined {
  return data.tag_name;
}

/**
 * Compare the given release with the latest release in the repo.
 * if the given release is the latest return true else return false
 * @param params release tag (1.0.0, 1.5.2,...)
 */
export async function compareRelease(tag: string) {
  const data = await listReleases(1);
  const latest_tag = getReleaseTag(data[0]);
  if (!latest_tag) {
    throw new Error("unable to get the latest tag");
  }
  if (latest_tag === tag) {
    return true;
  }
  return false;
}
