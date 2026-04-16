"use client";

import type { FC } from "react";
import { useEffect, useId } from "react";

import { StorageFactory, StorageType } from "@lib/storage";
import { Popover, usePopover } from "@ui/popover";

import type { IScaleSuggest } from "../config/types";

export const ScaleSuggest: FC<IScaleSuggest> = ({ cookieName = "scale" }) => {
  const id = useId();
  const { open: openPopover } = usePopover(id);

  const Storage = StorageFactory(StorageType.cookies);

  useEffect(() => {
    if (!Storage.has(cookieName)) {
      openPopover();
    }
  }, []);

  return (
    <Popover extraCN={{ isPrompt: true }} id={id}>
      <div>Вы можете настроить сайт</div>
    </Popover>
  );
};

