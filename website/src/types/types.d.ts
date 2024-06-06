type Version = {
  name: string;
  downloadUrl: string;
  date: string;
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
