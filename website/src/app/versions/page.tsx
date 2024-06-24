"use client";
import LatestVersion from "@/components/LatestVersion";
import OtherVersions from "@/components/OtherVersions";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [releases, setReleases] = useState<Release[]>();
  const ft = async () => {
    const resp = await axios.get("/api/versions");
    let data = resp.data as Release[];
    return data;
  };
  useEffect(() => {
    ft()
      .then((d) => {
        setReleases(d);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {releases && <LatestVersion {...releases[0]} />}{" "}
      {releases && <OtherVersions releases={releases} />}
    </>
  );
}
