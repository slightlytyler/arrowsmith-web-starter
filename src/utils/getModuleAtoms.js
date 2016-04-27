import { map, flatten } from 'lodash';

// Takes set of modules and the atom key i.e. hooks
// Returns an array of all the module atoms i.e. all the hooks
export default function getModuleAtoms(modules, key) {
  return flatten(map(modules, m => (
    m[key] ? Object.values(m[key]) : [])
  ));
}
