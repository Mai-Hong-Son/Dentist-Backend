describe('Tab.Home', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have container at home screen', async () => {
    await expect(element(by.id('container'))).toBeVisible();
  });

  it('should have menu, then open menu, should have setting button, navigate to setting and change language to Vietnamese', async () => {
    await expect(element(by.id('menu'))).toBeVisible();
    await element(by.id('menu')).tap();
    await expect(element(by.id('sidebar'))).toBeVisible();
    await expect(element(by.id('btnSetting'))).toBeVisible();
    await element(by.id('btnSetting')).tap();
    await expect(element(by.id('vietnamese'))).toBeVisible();
    await element(by.id('vietnamese')).tap();
  });
});
