export interface ISystemRequirement {
  name: string,
  cmd: string,
  version: string,
  updateCmd: string
  format: 'plain text' | 'json'
}
