export interface ISystemRequirement {
  name: string,
  cmd: string,
  requirements: string,
  updateCmd: string,
  concatOutput?: boolean
}
