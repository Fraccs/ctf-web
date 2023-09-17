"use client"

import { CaretRightIcon } from "@radix-ui/react-icons"
import { RepoTree } from "@/types/repoTree"
import SidebarItem from "@/components/SidebarItem"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/Sheet"

type SidebarProps = {
  repoTree: RepoTree
}

export default function Sidebar({ repoTree }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="p-4 border-r hover:bg-secondary">
        <CaretRightIcon/>
      </SheetTrigger>
      {/* Preventing screen scroll when the sheet closes */}
      <SheetContent onCloseAutoFocus={e => e.preventDefault()} side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Welcome to the repo tree!</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          {repoTree.root.sub?.map((node, i) => {
            return (
              <SidebarItem
                key={i}
                path={node.path}
                sha={node.sha}
                sub={node.sub}
              />
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
