import { expect } from 'chai';
import { encryptPasswrod, checkPasswrod, encryptPasswrodSync, checkPasswrodSync } from '../../util/passwordUtil';

describe('密码工具测试', async () => {
  it('#异步密码加密、验证测试(结果应为true)', async () => {
    let password = '123456';
    let encryptedPasswrod = await encryptPasswrod(password);
    let result = await checkPasswrod(password, encryptedPasswrod);
    expect(result, '异步密码加密，验证失败').to.be.equal(true);
  });

  it('#异步密码加密、验证测试(结果应为false)', async () => {
    let password = '123456';
    let errPwd = '666666';
    let encryptedPasswrod = await encryptPasswrod(password);
    let result = await checkPasswrod(errPwd, encryptedPasswrod);
    expect(result, '异步密码加密，验证失败').to.be.equal(false);
  });

  it('#同步密码加密、验证测试(结果应为true)', () => {
    let password = '123456';
    let encryptedPasswrod = encryptPasswrodSync(password);
    let result = checkPasswrodSync(password, encryptedPasswrod);
    expect(result, '同步密码加密，验证失败').to.be.equal(true);
  });
  
  it('#同步密码加密、验证测试(结果应为false)', () => {
    let password = '123456';
    let errPwd = '666666';
    let encryptedPasswrod = encryptPasswrodSync(password);
    let result = checkPasswrodSync(errPwd, encryptedPasswrod);
    expect(result, '同步密码加密，验证失败').to.be.equal(false);
  });
});
