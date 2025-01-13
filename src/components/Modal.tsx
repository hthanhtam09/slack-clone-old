"use client";

import React from "react";
import { CreateWorkspaceModal } from "./CreateWorkspaceModal";
import { CreateChannelModal } from "./CreateChannelModal";

export const Modal = () => {
  return (
    <div>
      <CreateChannelModal />
      <CreateWorkspaceModal />
    </div>
  );
};
