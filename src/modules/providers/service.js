import createService from 'api/service';
import NAME from './NAME';

const service = createService(NAME);

export const fetchCollection = service.fetchCollection;
