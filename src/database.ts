import { createPool } from 'slonik';
export const pool = await createPool('postgres://packDB:9093/main');