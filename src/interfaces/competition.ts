export interface Competition {
  name: string
  path: string
}

export interface CompetitionRaw extends Competition {
  type: "file" | "dir"
}
