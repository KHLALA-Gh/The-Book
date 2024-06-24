export default function Version({
  name,
  downloadUrl,
  date,
  assetName,
}: Version) {
  return (
    <>
      <div className="grid grid-cols-3 gap-7 mt-2">
        <div>
          <a href={downloadUrl}>{assetName}</a>
        </div>
        <h1>{name}</h1>
        <h1>{new Date(date).toLocaleDateString()}</h1>
      </div>
    </>
  );
}
