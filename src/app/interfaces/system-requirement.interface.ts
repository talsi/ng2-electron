export interface ISystemRequirement {
  name: string,
  cmd: string,
  version: string,
  range: 'less than' | 'less than or equal to' | 'equal to' | 'greater than' | 'greater than or equal to';
  updateCmd: string
  format: 'plain text' | 'json'
}
