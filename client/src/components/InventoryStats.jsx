export default function InventoryStats(props) {
  return (
    <div className="flex items-center gap-4 p-4 border-2 border-neutral-1/50 rounded-lg shadow-lg">
      {<props.ReactIcons className="w-10 h-10 block" />}
      <div>
        <p className="text-xl font-medium">{props.name}</p>
        <p className="text-xl font-medium text-center">{props.value}</p>
      </div>
    </div>
  );
}
