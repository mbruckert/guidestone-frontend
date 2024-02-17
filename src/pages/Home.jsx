import Graph from "../components/Graph";

export default function Home() {
  const nodes = [
    { id: "1", data: { label: "Node 1" } },
    { id: "2", data: { label: "Node 2" } },
    { id: "3", data: { label: "Node 3" } },
    { id: "4", data: { label: "Node 4" } },
    { id: "5", data: { label: "Node 5" } },
    { id: "6", data: { label: "Node 6" } },
    { id: "7", data: { label: "Node 7" } },
  ];

  const edges = [
    { id: "e1-2", source: "1", target: "2", type: "straight" },
    { id: "e1-3", source: "1", target: "3", type: "straight" },
    { id: "e1-4", source: "1", target: "4", type: "straight" },
    { id: "e1-5", source: "1", target: "5", type: "straight" },
    { id: "e1-6", source: "5", target: "6", type: "straight" },
    { id: "e1-7", source: "6", target: "7", type: "straight" },
  ];

  return (
    <div>
      <h1>Home</h1>
      <div style={{ width: "1000px", height: "1000px" }}>
        <Graph nodesData={nodes} edgesData={edges} />
      </div>
    </div>
  );
}
