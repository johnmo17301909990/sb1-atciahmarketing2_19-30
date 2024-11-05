import { Config } from '../types/config';

export const configTemplates: Record<string, Config> = {
  development: {
    defaultPlatform: 'tmall',
    apiEndpoint: 'http://localhost:3000',
    defaultDateRange: '30d',
    logLevel: 'debug',
    
    // 数据同步配置
    syncInterval: 300,
    syncRetryAttempts: 3,
    syncRetryDelay: 5000,
    syncConcurrency: 2,
    
    // 缓存配置
    cacheTimeout: 3600,
    cacheStrategy: 'memory',
    cachePrefix: 'dev',
    cacheCompression: false,
    
    // 通知配置
    notificationChannels: ['email'],
    notificationThreshold: 90,
    notificationTemplate: 'default',
    
    // 性能监控配置
    performanceMonitoring: true,
    slowQueryThreshold: 1000,
    metricsSamplingRate: 100,
    
    // 安全配置
    maxRequestRate: 100,
    ipWhitelist: ['127.0.0.1'],
    encryptionKey: 'dev-key-32-characters-long-secret'
  },
  
  production: {
    defaultPlatform: 'tmall',
    apiEndpoint: 'https://api.example.com',
    defaultDateRange: '30d',
    logLevel: 'info',
    
    // 数据同步配置
    syncInterval: 600,
    syncRetryAttempts: 5,
    syncRetryDelay: 10000,
    syncConcurrency: 5,
    
    // 缓存配置
    cacheTimeout: 7200,
    cacheStrategy: 'redis',
    cachePrefix: 'prod',
    cacheCompression: true,
    
    // 通知配置
    notificationChannels: ['email', 'slack'],
    notificationThreshold: 95,
    notificationTemplate: 'production',
    
    // 性能监控配置
    performanceMonitoring: true,
    slowQueryThreshold: 500,
    metricsSamplingRate: 10,
    
    // 安全配置
    maxRequestRate: 1000,
    ipWhitelist: [],
    encryptionKey: process.env.ENCRYPTION_KEY
  },
  
  testing: {
    defaultPlatform: 'jd',
    apiEndpoint: 'http://localhost:3000',
    defaultDateRange: '7d',
    logLevel: 'debug',
    
    // 数据同步配置
    syncInterval: 60,
    syncRetryAttempts: 2,
    syncRetryDelay: 1000,
    syncConcurrency: 1,
    
    // 缓存配置
    cacheTimeout: 1800,
    cacheStrategy: 'memory',
    cachePrefix: 'test',
    cacheCompression: false,
    
    // 通知配置
    notificationChannels: ['email'],
    notificationThreshold: 80,
    notificationTemplate: 'test',
    
    // 性能监控配置
    performanceMonitoring: true,
    slowQueryThreshold: 2000,
    metricsSamplingRate: 100,
    
    // 安全配置
    maxRequestRate: 50,
    ipWhitelist: ['127.0.0.1'],
    encryptionKey: 'test-key-32-characters-long-secret'
  }
};