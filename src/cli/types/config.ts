export type ConfigKey = 
  | 'defaultPlatform'
  | 'apiEndpoint'
  | 'defaultDateRange'
  | 'logLevel'
  | 'cacheTimeout'
  // 数据同步配置
  | 'syncInterval'
  | 'syncRetryAttempts'
  | 'syncRetryDelay'
  | 'syncConcurrency'
  // 缓存配置
  | 'cacheStrategy'
  | 'cachePrefix'
  | 'cacheCompression'
  // 通知配置
  | 'notificationChannels'
  | 'notificationThreshold'
  | 'notificationTemplate'
  // 性能监控配置
  | 'performanceMonitoring'
  | 'slowQueryThreshold'
  | 'metricsSamplingRate'
  // 安全配置
  | 'maxRequestRate'
  | 'ipWhitelist'
  | 'encryptionKey';

export interface Config {
  [key: string]: string | number | boolean | string[];
}