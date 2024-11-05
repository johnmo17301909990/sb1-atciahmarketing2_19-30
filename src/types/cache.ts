export interface CacheConfig {
  prefix: string;
  ttl: number;
  compression: boolean;
  strategy: 'indexeddb' | 'localstorage';
}