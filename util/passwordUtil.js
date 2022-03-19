import bcrypt from 'bcrypt';

// 盐值
const SALT = 10;

/**
 * 加密密码（异步）
 * @param {string} pwd 要加密的密码
 * @returns {string} 加密后的密码
 */
export const encryptPasswrod = async (pwd) => {
  return await bcrypt.hash(pwd, SALT);
};

/**
 * 密码验证（异步）
 * @param {string} pwd 密码
 * @param {string} encryptedPwd 加密后的密码
 * @returns {boolean} 验证成功返回 true
 */
export const checkPasswrod = async (pwd, encryptedPwd) => {
  return await bcrypt.compare(pwd, encryptedPwd);
};


/**
 * 加密密码（同步）
 * @param {string} pwd 要加密的密码
 * @returns {string} 加密后的密码
 */
export const encryptPasswrodSync = (pwd) => {
  return bcrypt.hashSync(pwd, SALT);
};

/**
 * 密码验证（同步）
 * @param {string} pwd 密码
 * @param {string} encryptedPwd 加密后的密码
 * @returns {boolean} 验证成功返回 true
 */
export const checkPasswrodSync = (pwd, encryptedPwd) => {
  return bcrypt.compareSync(pwd, encryptedPwd);
};
