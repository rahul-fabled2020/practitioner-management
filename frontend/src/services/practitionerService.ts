import { http } from '../utils/http';

export function getPractitioners() {
  return http.get('/api/practitioners');
}
