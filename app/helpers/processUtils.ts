import genericPool from 'generic-pool'

// 创建一个工厂函数，用于创建新的资源
function createResource() {
  return new Promise((resolve, reject) => {
    const resource = {
      /* ... 创建资源的逻辑 ... */
    }
    resolve(resource)
  })
}

// 创建一个用于销毁资源的函数
function destroyResource(resource) {
  return new Promise<void>((resolve, reject) => {
    // ... 销毁资源的逻辑 ...
    resolve()
  })
}

// 验证资源是否仍然有效的函数
function validateResource(resource) {
  // ... 验证资源的逻辑，返回 Promise<boolean> ...
  return Promise.resolve(true)
}

// 创建资源池的配置
const poolConfig = {
  create: createResource,
  destroy: destroyResource,
  validate: validateResource,
  max: 10, // 池中的最大资源数
  min: 2, // 池中的最小资源数
  idleTimeoutMillis: 30000, // 资源在被销毁之前的空闲时间
  acquireTimeoutMillis: 10000, // 获取资源的最长等待时间
}

// 创建资源池
const pool = genericPool.createPool(poolConfig)

// 从资源池中获取资源
pool
  .acquire()
  .then(resource => {
    // 使用资源...
    console.log('Resource acquired:', resource)

    // 当你完成资源使用后，确保将其释放回池中
    pool.release(resource)
  })
  .catch(err => {
    console.error('Error acquiring resource:', err)
  })
