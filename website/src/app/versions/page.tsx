"use client";
import LatestVersion from "@/components/LatestVersion";
import OtherVersions from "@/components/OtherVersions";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [latestVersions, setLatestVersions] = useState<LatestVersionRespData>();
  const ft = async () => {
    const resp = await axios.get("/api/versions/latest");
    let data = resp.data as LatestVersionRespData;
    return data;
  };
  useEffect(() => {
    ft()
      .then((d) => {
        setLatestVersions(d);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {latestVersions && <LatestVersion {...latestVersions} />}{" "}
      <OtherVersions />
    </>
  );
}
