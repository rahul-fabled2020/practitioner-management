import { Practitioner } from '../interfaces/interfaces';
import { http } from '../utils/http';
import { interpolate } from '../utils/string';

export function fetchAll() {
  return http.get('/api/practitioners');
}

export function create(payload: Practitioner) {
  return http.post('/api/practitioners', payload);
}

export function edit(id: string, payload: Practitioner) {
  return http.put(interpolate('/api/practitioners/:id', { id }), payload);
}

export function destroy(id: string) {
  return http.delete(interpolate('/api/practitioners/:id', { id }));
}
