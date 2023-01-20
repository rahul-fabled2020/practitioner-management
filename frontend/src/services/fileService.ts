import { http } from '../utils/http';

export function uploadFile(file: File) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  const formData = new FormData();

  formData.append('file', file);
  formData.append('fileName', file.name);

  return http.post('/api/files', formData, config);
}
