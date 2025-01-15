export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      {<img src="/images/brain.svg" />}
      <p className="font-bold text-3xl tracking-tighter">Second Brain</p>
    </div>
  );
}
