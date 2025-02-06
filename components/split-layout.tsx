"use client";

import Split from "react-split";
import { FlowDiagram } from "./flow/flow-diagram";
import Sidebar from "./chat/side-bar";
import Chat from "./chat/chat";

export function SplitLayout() {
  return (
    <Split className="flex h-[60vh]">
      <div className="flex h-full bg-grey-100">
        <Sidebar />
        <Chat />
      </div>
      <div className="h-full overflow-hidden ">
        <FlowDiagram />
      </div>
    </Split>
  );
}
