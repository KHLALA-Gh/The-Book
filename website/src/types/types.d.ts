type Version = {
  name: string;
  downloadUrl: string;
  date: string;
  assetName: string;
};

type LatestVersionRespData = {
  linuxRPM: Version;
  linuxDEB: Version;
  windows: Version;
};

type Versions = {
  linuxRPM: Version[];
  linuxDEB: Version[];
  windows: Version[];
  SourceCode: Version[];
};

type Release = {
  linuxRPM: Version;
  linuxDEB: Version;
  windows: Version;
  SourceCode: Version;
};

type Platform = "windows" | "linux";
