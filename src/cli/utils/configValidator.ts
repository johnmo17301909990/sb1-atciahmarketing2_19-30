import { z } from 'zod';
import { ConfigKey } from '../types/config';

// 配置模式定义
const configSchema = z.object({
  // 基础配置
  defaultPlatform: z.enum(['tmall', 'jd']).optional(),
  apiEndpoint: z.string().url().optional(),
  defaultDateRange: z.enum(['7d', '30d', '90d', '1y']).optional(),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).optional(),
  
  // 数据同步配置
  syncInterval: z.number().min(60).max(86400).optional(),
  syncRetryAttempts: z.number().min(1).max(10).optional(),
  syncRetryDelay: z.number().min(1000).max(60000).optional(),
  syncConcurrency: z.number().min(1).max(10).optional(),
  
  // 缓存配置
  cacheTimeout: z.number().min(0).max(86400).optional(),
  cacheStrategy: z.enum(['memory', 'redis', 'hybrid']).optional(),
  cachePrefix: z.string().min(1).max(50).optional(),
  cacheCompression: z.boolean().optional(),
  
  // 通知配置
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])).optional(),
  notificationThreshold: z.number().min(0).max(100).optional(),
  notificationTemplate: z.string().optional(),
  
  // 性能监控配置
  performanceMonitoring: z.boolean().optional(),
  slowQueryThreshold: z.number().min(100).max(10000).optional(),
  metricsSamplingRate: z.number().min(0).max(100).optional(),
  
  // 安全配置
  maxRequestRate: z.number().min(1).max(1000).optional(),
  ipWhitelist: z.array(z.string()).optional(),
  encryptionKey: z.string().min(32).max(64).optional(),
});

export type ValidConfig = z.infer<typeof configSchema>;

// 配置键的可选值
export const configOptions: Record<ConfigKey, string[]> = {
  // 基础配置
  defaultPlatform: ['tmall', 'jd'],
  apiEndpoint: [],
  defaultDateRange: ['7d', '30d', '90d', '1y'],
  logLevel: ['debug', 'info', 'warn', 'error'],
  
  // 数据同步配置
  syncInterval: [],
  syncRetryAttempts: [],
  syncRetryDelay: [],
  syncConcurrency: [],
  
  // 缓存配置
  cacheTimeout: [],
  cacheStrategy: ['memory', 'redis', 'hybrid'],
  cachePrefix: [],
  cacheCompression: ['true', 'false'],
  
  // 通知配置
  notificationChannels: ['email', 'slack', 'webhook'],
  notificationThreshold: [],
  notificationTemplate: [],
  
  // 性能监控配置
  performanceMonitoring: ['true', 'false'],
  slowQueryThreshold: [],
  metricsSamplingRate: [],
  
  // 安全配置
  maxRequestRate: [],
  ipWhitelist: [],
  encryptionKey: [],
};

// 配置描述
export const configDescriptions: Record<ConfigKey, string> = {
  // 基础配置
  defaultPlatform: '默认数据分析平台',
  apiEndpoint: 'API服务端点',
  defaultDateRange: '默认数据时间范围',
  logLevel: '日志级别',
  
  // 数据同步配置
  syncInterval: '数据同步间隔(秒)',
  syncRetryAttempts: '同步失败重试次数',
  syncRetryDelay: '重试延迟时间(毫秒)',
  syncConcurrency: '同步并发数',
  
  // 缓存配置
  cacheTimeout: '缓存超时时间(秒)',
  cacheStrategy: '缓存策略',
  cachePrefix: '缓存键前缀',
  cacheCompression: '是否启用缓存压缩',
  
  // 通知配置
  notificationChannels: '通知渠道列表',
  notificationThreshold: '通知阈值(%)',
  notificationTemplate: '通知模板',
  
  // 性能监控配置
  performanceMonitoring: '是否启用性能监控',
  slowQueryThreshold: '慢查询阈值(毫秒)',
  metricsSamplingRate: '指标采样率(%)',
  
  // 安全配置
  maxRequestRate: '最大请求速率(次/分钟)',
  ipWhitelist: 'IP白名单',
  encryptionKey: '数据加密密钥',
};